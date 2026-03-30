"use client";

// ─────────────────────────────────────────────────────────────
//  PASTE THIS FILE AT:
//  /app/meeting/admin-recorder/page.jsx
//
//  INSTALL DEPENDENCY FIRST:
//  npm install @ffmpeg/ffmpeg @ffmpeg/util
//
//  ALSO ADD THIS TO next.config.js:
//  headers: async () => [{
//    source: "/meeting/admin-recorder",
//    headers: [
//      { key: "Cross-Origin-Opener-Policy",   value: "same-origin" },
//      { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
//    ],
//  }]
//
//  PROTECT THIS ROUTE with your admin auth — students
//  must never access /meeting/admin-recorder
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, useCallback } from "react";

export default function AdminRecorderPage() {
  const [uiState, setUiState]       = useState("idle"); // idle | recording | paused | converting | done
  const [timer, setTimer]           = useState("00:00:00");
  const [pauseCount, setPauseCount] = useState(0);
  const [pauseLogs, setPauseLogs]   = useState([]);
  const [srcMode, setSrcMode]       = useState("screen");
  const [quality, setQuality]       = useState("2500000");
  const [batchName, setBatchName]   = useState("IICS_Batch14");
  const [dayNum, setDayNum]         = useState("Day01");
  const [alert, setAlert]           = useState(null);
  const [dlMeta, setDlMeta]         = useState(null);
  const [convertProgress, setConvertProgress] = useState(0);
  const [ffmpegReady, setFfmpegReady]         = useState(false);

  const mrRef           = useRef(null);
  const chunksRef       = useRef([]);
  const streamRef       = useRef(null);
  const timerRef        = useRef(null);
  const totalSecsRef    = useRef(0);
  const pauseCountRef   = useRef(0);
  const webmBlobRef     = useRef(null);
  const mp4BlobRef      = useRef(null);
  const ffmpegRef       = useRef(null);

  // ── Load FFmpeg.wasm on mount ─────────────────────────────
  useEffect(() => {
    let cancelled = false;
    async function loadFFmpeg() {
      try {
        const { FFmpeg }    = await import("@ffmpeg/ffmpeg");
        const { toBlobURL } = await import("@ffmpeg/util");
        const ff = new FFmpeg();
        ff.on("progress", ({ progress }) => {
          setConvertProgress(Math.round(progress * 100));
        });
        const base = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
        await ff.load({
          coreURL: await toBlobURL(`${base}/ffmpeg-core.js`,   "text/javascript"),
          wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
        });
        if (!cancelled) { ffmpegRef.current = ff; setFfmpegReady(true); }
      } catch (e) {
        console.warn("FFmpeg load failed:", e);
      }
    }
    loadFFmpeg();
    return () => { cancelled = true; };
  }, []);

  // ── Helpers ───────────────────────────────────────────────
  const showAlert = useCallback((msg, type = "info") => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 6000);
  }, []);

  const fmtTime = (s) => {
    const h   = String(Math.floor(s / 3600)).padStart(2, "0");
    const m   = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      totalSecsRef.current++;
      setTimer(fmtTime(totalSecsRef.current));
    }, 1000);
  };

  const stopTimer = () => { clearInterval(timerRef.current); timerRef.current = null; };

  // ── Start ─────────────────────────────────────────────────
  const startRec = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: srcMode === "tab" ? "browser" : "monitor" },
        audio: true,
      });

      let micStream = null;
      try { micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false }); }
      catch { showAlert("Mic not available — screen audio only", "warn"); }

      const ctx  = new AudioContext();
      const dest = ctx.createMediaStreamDestination();
      if (screenStream.getAudioTracks().length > 0)
        ctx.createMediaStreamSource(screenStream).connect(dest);
      if (micStream)
        ctx.createMediaStreamSource(micStream).connect(dest);

      const combined = new MediaStream([
        ...screenStream.getVideoTracks(),
        ...dest.stream.getAudioTracks(),
      ]);

      streamRef.current     = combined;
      chunksRef.current     = [];
      totalSecsRef.current  = 0;
      pauseCountRef.current = 0;
      setPauseCount(0); setPauseLogs([]);
      webmBlobRef.current = null; mp4BlobRef.current = null;
      setDlMeta(null); setConvertProgress(0); setTimer("00:00:00");

      const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
        ? "video/webm;codecs=vp9,opus" : "video/webm";

      const mr = new MediaRecorder(combined, {
        mimeType: mime,
        videoBitsPerSecond: parseInt(quality),
      });
      mrRef.current = mr;
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => handleStop();
      mr.start(500);
      startTimer();
      setUiState("recording");
      showAlert("Recording started — students cannot see this panel.", "info");
      screenStream.getVideoTracks()[0].onended = () => {
        if (mrRef.current && mrRef.current.state !== "inactive") stopRec();
      };
    } catch (err) {
      if (err.name === "NotAllowedError")
        showAlert("Screen share permission denied. Please allow when prompted.", "warn");
      else showAlert("Error: " + err.message, "warn");
    }
  };

  // ── Pause ─────────────────────────────────────────────────
  const pauseRec = () => {
    if (mrRef.current && mrRef.current.state === "recording") {
      mrRef.current.pause();
      stopTimer();
      pauseCountRef.current++;
      const at = fmtTime(totalSecsRef.current);
      setPauseCount(pauseCountRef.current);
      setPauseLogs((prev) => [...prev, { num: pauseCountRef.current, at }]);
      setUiState("paused");
      showAlert("Paused — same video file. Click Resume to continue.", "warn");
    }
  };

  // ── Resume ────────────────────────────────────────────────
  const resumeRec = () => {
    if (mrRef.current && mrRef.current.state === "paused") {
      mrRef.current.resume();
      startTimer();
      setUiState("recording");
      showAlert("Resumed — continuing in same video file.", "info");
    }
  };

  // ── Stop ──────────────────────────────────────────────────
  const stopRec = () => {
    if (mrRef.current && mrRef.current.state !== "inactive") {
      mrRef.current.stop();
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      stopTimer();
    }
  };

  // ── After stop: convert WebM → MP4 via FFmpeg.wasm ───────
  const handleStop = async () => {
    const webmBlob = new Blob(chunksRef.current, { type: "video/webm" });
    webmBlobRef.current = webmBlob;

    if (!ffmpegRef.current) {
      const sizeMB = (webmBlob.size / 1024 / 1024).toFixed(1);
      setDlMeta({ duration: fmtTime(totalSecsRef.current), size: sizeMB, pauses: pauseCountRef.current, format: "webm" });
      setUiState("done");
      showAlert("FFmpeg not loaded — will download as WebM. Try refreshing.", "warn");
      return;
    }

    setUiState("converting");
    setConvertProgress(0);
    showAlert("Converting to MP4 — do NOT close this tab.", "info");

    try {
      const { fetchFile } = await import("@ffmpeg/util");
      const ff = ffmpegRef.current;
      await ff.writeFile("input.webm", await fetchFile(webmBlob));
      await ff.exec([
        "-i", "input.webm",
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "23",
        "-c:a", "aac",
        "-b:a", "128k",
        "-movflags", "+faststart",
        "output.mp4",
      ]);
      const data = await ff.readFile("output.mp4");
      const mp4Blob = new Blob([data.buffer], { type: "video/mp4" });
      mp4BlobRef.current = mp4Blob;
      const sizeMB = (mp4Blob.size / 1024 / 1024).toFixed(1);
      setDlMeta({ duration: fmtTime(totalSecsRef.current), size: sizeMB, pauses: pauseCountRef.current, format: "mp4" });
      setUiState("done");
      showAlert("MP4 ready! Click Download to save to your laptop.", "success");
    } catch (err) {
      console.error("Conversion error:", err);
      const sizeMB = (webmBlobRef.current.size / 1024 / 1024).toFixed(1);
      setDlMeta({ duration: fmtTime(totalSecsRef.current), size: sizeMB, pauses: pauseCountRef.current, format: "webm" });
      setUiState("done");
      showAlert("MP4 conversion failed — downloading as WebM instead.", "warn");
    }
  };

  // ── Download ──────────────────────────────────────────────
  const downloadFile = () => {
    const blob = mp4BlobRef.current || webmBlobRef.current;
    if (!blob) return;
    const ext  = mp4BlobRef.current ? "mp4" : "webm";
    const date = new Date().toISOString().slice(0, 10);
    const name = `${batchName}_${dayNum}_${date}.${ext}`;
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  };

  const resetAll = () => {
    setUiState("idle"); setTimer("00:00:00");
    setPauseLogs([]); setPauseCount(0);
    setDlMeta(null); setConvertProgress(0);
    webmBlobRef.current = null; mp4BlobRef.current = null;
  };

  useEffect(() => {
    return () => {
      stopTimer();
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // ── UI ────────────────────────────────────────────────────
  const alertColors = {
    info:    { bg: "#E6F1FB", color: "#0C447C", border: "#B5D4F4" },
    warn:    { bg: "#FAEEDA", color: "#633806", border: "#FAC775" },
    success: { bg: "#EAF3DE", color: "#27500A", border: "#C0DD97" },
  };

  const dotColor = {
    recording:  "#E24B4A",
    paused:     "#EF9F27",
    converting: "#378ADD",
    done:       "#639922",
    idle:       "#64748b",
  }[uiState];

  const statusText = {
    idle:       "Ready to record",
    recording:  "Recording in progress",
    paused:     "Paused — same video file",
    converting: `Converting to MP4... ${convertProgress}%`,
    done:       "Recording complete ✓",
  }[uiState];

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", padding: "2rem 1rem", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "#1e293b", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🔴</div>
          <div>
            <h1 style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 600, margin: 0 }}>Admin Recording Panel</h1>
            <p style={{ color: "#64748b", fontSize: 12, margin: 0 }}>
              {ffmpegReady ? "✅ MP4 converter ready" : "⏳ Loading MP4 converter..."} &nbsp;·&nbsp; Hidden from students
            </p>
          </div>
        </div>

        {/* ── Alert ── */}
        {alert && (
          <div style={{ padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16, background: alertColors[alert.type].bg, color: alertColors[alert.type].color, border: `1px solid ${alertColors[alert.type].border}` }}>
            {alert.msg}
          </div>
        )}

        {/* ── Settings (idle / done only) ── */}
        {(uiState === "idle" || uiState === "done") && (
          <div style={card}>
            <p style={label}>Recording settings</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              <div>
                <p style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Batch Name</p>
                <input value={batchName} onChange={(e) => setBatchName(e.target.value)} placeholder="IICS_Batch14" style={input} />
              </div>
              <div>
                <p style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Day / Session</p>
                <input value={dayNum} onChange={(e) => setDayNum(e.target.value)} placeholder="Day01" style={input} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              <SrcCard active={srcMode === "screen"} onClick={() => setSrcMode("screen")} title="Screen + Mic" sub="Full meeting + your voice" />
              <SrcCard active={srcMode === "tab"}    onClick={() => setSrcMode("tab")}    title="Tab + Mic"    sub="Browser tab only" />
            </div>
            <select value={quality} onChange={(e) => setQuality(e.target.value)} style={{ ...input, width: "100%" }}>
              <option value="2500000">Quality: High (2.5 Mbps)</option>
              <option value="1000000">Quality: Medium (1 Mbps)</option>
              <option value="500000">Quality: Low (500 Kbps)</option>
            </select>
            <p style={{ fontSize: 11, color: "#475569", marginTop: 8 }}>
              Will save as: <span style={{ color: "#94a3b8" }}>{batchName}_{dayNum}_YYYY-MM-DD.mp4</span>
            </p>
          </div>
        )}

        {/* ── Main recorder card ── */}
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", flexShrink: 0, background: dotColor, animation: (uiState === "recording" || uiState === "converting") ? "blink 1s infinite" : "none" }} />
            <span style={{ fontSize: 14, fontWeight: 500, color: "#f1f5f9" }}>{statusText}</span>
            <span style={{ marginLeft: "auto", fontSize: 22, fontWeight: 600, fontFamily: "monospace", color: "#f1f5f9" }}>{timer}</span>
          </div>

          {uiState === "converting" && (
            <div style={{ background: "#0f172a", borderRadius: 4, height: 6, marginBottom: 16, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "#378ADD", width: `${convertProgress}%`, transition: "width 0.4s" }} />
            </div>
          )}

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {uiState === "idle"       && <Btn color="red"   onClick={startRec}>▶ Start Recording</Btn>}
            {uiState === "recording"  && <><Btn color="amber" onClick={pauseRec}>⏸ Pause</Btn><Btn color="gray" onClick={stopRec}>⏹ Stop & Convert to MP4</Btn></>}
            {uiState === "paused"     && <><Btn color="green" onClick={resumeRec}>▶ Resume Recording</Btn><Btn color="gray" onClick={stopRec}>⏹ Stop & Convert to MP4</Btn></>}
            {uiState === "converting" && <Btn color="gray" onClick={() => {}}>⏳ Converting... please wait</Btn>}
            {uiState === "done"       && <Btn color="red"   onClick={resetAll}>▶ Start New Recording</Btn>}
          </div>

          {(uiState === "recording" || uiState === "paused") && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
              <Pill>{timer} recorded</Pill>
              <Pill>{pauseCount} pause{pauseCount !== 1 ? "s" : ""}</Pill>
              <Pill>1 MP4 file</Pill>
            </div>
          )}

          {pauseLogs.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <p style={{ fontSize: 11, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Pause log (all in same video)</p>
              {pauseLogs.map((p) => (
                <div key={p.num} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#94a3b8", padding: "4px 0", borderBottom: "1px solid #334155" }}>
                  <span style={{ background: "#854F0B", color: "#FAEEDA", borderRadius: 4, padding: "1px 8px", fontSize: 11 }}>Pause {p.num}</span>
                  at {p.at} — video continues in same file on resume
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Download card ── */}
        {uiState === "done" && dlMeta && (
          <div style={{ ...card, textAlign: "center" }}>
            <p style={label}>Download recording</p>
            <button
              onClick={downloadFile}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 32px", background: "#185FA5", border: "none", borderRadius: 8, color: "#E6F1FB", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#0C447C")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#185FA5")}
            >
              ⬇ Download {dlMeta.format.toUpperCase()}
            </button>
            <p style={{ fontSize: 12, color: "#64748b", marginTop: 10 }}>
              {batchName}_{dayNum} &nbsp;·&nbsp; {dlMeta.duration} &nbsp;·&nbsp; ~{dlMeta.size} MB &nbsp;·&nbsp; {dlMeta.pauses} pause(s) &nbsp;·&nbsp; 1 file
            </p>
          </div>
        )}

      </div>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  );
}

// ── Shared style objects ──────────────────────────────────────
const card  = { background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: 20, marginBottom: 16 };
const label = { fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 };
const input = { width: "100%", padding: "8px 10px", borderRadius: 8, background: "#0f172a", color: "#f1f5f9", border: "1px solid #334155", fontSize: 13 };

function Btn({ color, onClick, children }) {
  const map = {
    red:   { bg: "#E24B4A", h: "#A32D2D", c: "#fff",     b: "#A32D2D" },
    amber: { bg: "#EF9F27", h: "#BA7517", c: "#fff",     b: "#BA7517" },
    green: { bg: "#639922", h: "#3B6D11", c: "#fff",     b: "#3B6D11" },
    gray:  { bg: "#1e293b", h: "#334155", c: "#94a3b8",  b: "#334155" },
  };
  const s = map[color] || map.gray;
  return (
    <button onClick={onClick}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", background: s.bg, border: `1px solid ${s.b}`, borderRadius: 8, color: s.c, fontSize: 13, fontWeight: 500, cursor: "pointer" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = s.h)}
      onMouseLeave={(e) => (e.currentTarget.style.background = s.bg)}
    >{children}</button>
  );
}

function Pill({ children }) {
  return <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, border: "1px solid #334155", color: "#64748b" }}>{children}</span>;
}

function SrcCard({ active, onClick, title, sub }) {
  return (
    <div onClick={onClick} style={{ padding: "10px 12px", border: `1px solid ${active ? "#378ADD" : "#334155"}`, borderRadius: 8, cursor: "pointer", background: active ? "#0C447C22" : "#0f172a" }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: "#f1f5f9" }}>{title}</div>
      <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{sub}</div>
    </div>
  );
}
