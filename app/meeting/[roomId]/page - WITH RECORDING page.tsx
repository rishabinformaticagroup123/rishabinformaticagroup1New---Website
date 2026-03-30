"use client";

// ─────────────────────────────────────────────────────────────
//  FILE: /app/meeting/[roomId]/page.tsx
//
//  HOW IT WORKS:
//  - Students visit: /meeting/INFA-BATCH13?name=StudentName
//  - Host visits:    /meeting/INFA-BATCH13?host=true&name=Hari%20Sir
//  - Host sees JAAS meeting + hidden recorder panel at bottom
//  - Students see JAAS meeting only — no recorder visible
//
//  next.config.js — add these headers for FFmpeg WASM to work:
//  async headers() {
//    return [{
//      source: "/meeting/:path*",
//      headers: [
//        { key: "Cross-Origin-Opener-Policy",   value: "same-origin" },
//        { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
//      ],
//    }];
//  }
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window { JitsiMeetExternalAPI: any; }
}

// ════════════════════════════════════════════════════════════
//  ADMIN RECORDER COMPONENT
// ════════════════════════════════════════════════════════════
function AdminRecorder() {
  const [uiState, setUiState]           = useState<"idle"|"recording"|"paused"|"converting"|"done">("idle");
  const [timer, setTimer]               = useState("00:00:00");
  const [pauseCount, setPauseCount]     = useState(0);
  const [pauseLogs, setPauseLogs]       = useState<{ num: number; at: string }[]>([]);
  const [quality, setQuality]           = useState("2500000");
  const [dayNum, setDayNum]             = useState("Day01");
  const [batchLabel, setBatchLabel]     = useState("IICS_Batch14");
  const [recAlert, setRecAlert]         = useState<{ msg: string; type: string } | null>(null);
  const [dlMeta, setDlMeta]             = useState<{ duration: string; size: string; pauses: number; format: string } | null>(null);
  const [convertProgress, setConvertProgress] = useState(0);
  const [ffmpegReady, setFfmpegReady]   = useState(false);
  const [minimized, setMinimized]       = useState(false);

  const mrRef         = useRef<MediaRecorder | null>(null);
  const chunksRef     = useRef<Blob[]>([]);
  const streamRef     = useRef<MediaStream | null>(null);
  const timerRef      = useRef<NodeJS.Timeout | null>(null);
  const totalSecsRef  = useRef(0);
  const pauseCountRef = useRef(0);
  const webmBlobRef   = useRef<Blob | null>(null);
  const mp4BlobRef    = useRef<Blob | null>(null);
  const ffmpegRef     = useRef<any>(null);

  // ── Load FFmpeg.wasm ──────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    async function loadFF() {
      try {
        const { FFmpeg }    = await import("@ffmpeg/ffmpeg");
        const { toBlobURL } = await import("@ffmpeg/util");
        const ff = new FFmpeg();
        ff.on("progress", ({ progress }: { progress: number }) => {
          setConvertProgress(Math.round(progress * 100));
        });
        const base = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
        await ff.load({
          coreURL: await toBlobURL(`${base}/ffmpeg-core.js`,   "text/javascript"),
          wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
        });
        if (!cancelled) { ffmpegRef.current = ff; setFfmpegReady(true); }
      } catch (e) { console.warn("FFmpeg load failed:", e); }
    }
    loadFF();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    };
  }, []);

  const showRecAlert = useCallback((msg: string, type = "info") => {
    setRecAlert({ msg, type });
    setTimeout(() => setRecAlert(null), 6000);
  }, []);

  const fmtTime = (s: number) => {
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

  const stopTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  // ── Start Recording ───────────────────────────────────────
  const startRec = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: "monitor" },
        audio: true,
      });

      let micStream: MediaStream | null = null;
      try { micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false }); }
      catch { showRecAlert("Mic not available — screen audio only", "warn"); }

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
      showRecAlert("Recording started — students cannot see this panel.", "info");

      screenStream.getVideoTracks()[0].onended = () => {
        if (mrRef.current && mrRef.current.state !== "inactive") stopRec();
      };
    } catch (err: any) {
      if (err.name === "NotAllowedError")
        showRecAlert("Screen share permission denied. Please allow when prompted.", "warn");
      else showRecAlert("Error: " + err.message, "warn");
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
      setPauseLogs(prev => [...prev, { num: pauseCountRef.current, at }]);
      setUiState("paused");
      showRecAlert("Paused — same video file. Click Resume to continue.", "warn");
    }
  };

  // ── Resume ────────────────────────────────────────────────
  const resumeRec = () => {
    if (mrRef.current && mrRef.current.state === "paused") {
      mrRef.current.resume();
      startTimer();
      setUiState("recording");
      showRecAlert("Resumed — continuing in same video file.", "info");
    }
  };

  // ── Stop ──────────────────────────────────────────────────
  const stopRec = () => {
    if (mrRef.current && mrRef.current.state !== "inactive") {
      mrRef.current.stop();
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      stopTimer();
    }
  };

  // ── Convert WebM → MP4 ────────────────────────────────────
  const handleStop = async () => {
    const webmBlob = new Blob(chunksRef.current, { type: "video/webm" });
    webmBlobRef.current = webmBlob;

    if (!ffmpegRef.current) {
      const sizeMB = (webmBlob.size / 1024 / 1024).toFixed(1);
      setDlMeta({ duration: fmtTime(totalSecsRef.current), size: sizeMB, pauses: pauseCountRef.current, format: "webm" });
      setUiState("done");
      showRecAlert("FFmpeg not loaded — downloading as WebM. Try refreshing.", "warn");
      return;
    }

    setUiState("converting");
    setConvertProgress(0);
    showRecAlert("Converting to MP4 — do NOT close this tab.", "info");

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
      showRecAlert("MP4 ready! Click Download to save to your laptop.", "success");
    } catch (err) {
      console.error("Conversion error:", err);
      const sizeMB = (webmBlobRef.current!.size / 1024 / 1024).toFixed(1);
      setDlMeta({ duration: fmtTime(totalSecsRef.current), size: sizeMB, pauses: pauseCountRef.current, format: "webm" });
      setUiState("done");
      showRecAlert("MP4 conversion failed — downloading as WebM instead.", "warn");
    }
  };

  // ── Download ──────────────────────────────────────────────
  const downloadFile = () => {
    const blob = mp4BlobRef.current || webmBlobRef.current;
    if (!blob) return;
    const ext  = mp4BlobRef.current ? "mp4" : "webm";
    const date = new Date().toISOString().slice(0, 10);
    const name = `${batchLabel}_${dayNum}_${date}.${ext}`;
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

  // ── Alert colors ──────────────────────────────────────────
  const alertColors: Record<string, { bg: string; color: string; border: string }> = {
    info:    { bg: "#E6F1FB", color: "#0C447C", border: "#B5D4F4" },
    warn:    { bg: "#FAEEDA", color: "#633806", border: "#FAC775" },
    success: { bg: "#EAF3DE", color: "#27500A", border: "#C0DD97" },
  };

  const dotColor: Record<string, string> = {
    idle: "#64748b", recording: "#E24B4A", paused: "#EF9F27", converting: "#378ADD", done: "#639922",
  };

  const statusText: Record<string, string> = {
    idle:       "Ready to record",
    recording:  "Recording in progress",
    paused:     "Paused — same video file",
    converting: `Converting to MP4... ${convertProgress}%`,
    done:       "Recording complete ✓",
  };

  // ── Render ────────────────────────────────────────────────
  return (
    <div style={{
      position: "fixed", bottom: 16, right: 16, zIndex: 9999,
      width: minimized ? 220 : 420,
      background: "#0f172a", border: "1px solid #334155",
      borderRadius: 12, fontFamily: "system-ui, sans-serif",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      transition: "width 0.2s",
      overflow: "hidden",
    }}>
      {/* Header bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid #334155", cursor: "pointer" }}
        onClick={() => setMinimized(m => !m)}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
          background: dotColor[uiState],
          animation: (uiState === "recording" || uiState === "converting") ? "blink 1s infinite" : "none",
        }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#f1f5f9", flex: 1 }}>
          {minimized ? (uiState === "recording" ? `⏺ ${timer}` : statusText[uiState]) : "🔴 Admin Recorder"}
        </span>
        <span style={{ fontSize: 11, color: "#64748b" }}>{minimized ? "▲" : "▼"}</span>
      </div>

      {!minimized && (
        <div style={{ padding: 14 }}>
          {/* FFmpeg status */}
          <p style={{ fontSize: 10, color: ffmpegReady ? "#639922" : "#EF9F27", marginBottom: 10 }}>
            {ffmpegReady ? "✅ MP4 converter ready" : "⏳ Loading MP4 converter..."}
          </p>

          {/* Alert */}
          {recAlert && (
            <div style={{ padding: "8px 12px", borderRadius: 6, fontSize: 12, marginBottom: 10, background: alertColors[recAlert.type].bg, color: alertColors[recAlert.type].color, border: `1px solid ${alertColors[recAlert.type].border}` }}>
              {recAlert.msg}
            </div>
          )}

          {/* Status row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: dotColor[uiState], animation: (uiState === "recording" || uiState === "converting") ? "blink 1s infinite" : "none" }} />
            <span style={{ fontSize: 12, color: "#f1f5f9", flex: 1 }}>{statusText[uiState]}</span>
            <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "monospace", color: "#f1f5f9" }}>{timer}</span>
          </div>

          {/* Progress bar */}
          {uiState === "converting" && (
            <div style={{ background: "#1e293b", borderRadius: 4, height: 5, marginBottom: 12, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "#378ADD", width: `${convertProgress}%`, transition: "width 0.4s" }} />
            </div>
          )}

          {/* Settings — idle / done only */}
          {(uiState === "idle" || uiState === "done") && (
            <div style={{ marginBottom: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              <div>
                <p style={{ fontSize: 10, color: "#64748b", marginBottom: 3 }}>Batch</p>
                <input value={batchLabel} onChange={e => setBatchLabel(e.target.value)}
                  style={{ width: "100%", padding: "5px 8px", borderRadius: 6, background: "#1e293b", color: "#f1f5f9", border: "1px solid #334155", fontSize: 11 }} />
              </div>
              <div>
                <p style={{ fontSize: 10, color: "#64748b", marginBottom: 3 }}>Day</p>
                <input value={dayNum} onChange={e => setDayNum(e.target.value)}
                  style={{ width: "100%", padding: "5px 8px", borderRadius: 6, background: "#1e293b", color: "#f1f5f9", border: "1px solid #334155", fontSize: 11 }} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <select value={quality} onChange={e => setQuality(e.target.value)}
                  style={{ width: "100%", padding: "5px 8px", borderRadius: 6, background: "#1e293b", color: "#f1f5f9", border: "1px solid #334155", fontSize: 11 }}>
                  <option value="2500000">High Quality (2.5 Mbps)</option>
                  <option value="1000000">Medium Quality (1 Mbps)</option>
                  <option value="500000">Low Quality (500 Kbps)</option>
                </select>
              </div>
            </div>
          )}

          {/* Controls */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {uiState === "idle" && (
              <RBtn color="red" onClick={startRec}>▶ Start Recording</RBtn>
            )}
            {uiState === "recording" && (<>
              <RBtn color="amber" onClick={pauseRec}>⏸ Pause</RBtn>
              <RBtn color="gray"  onClick={stopRec}>⏹ Stop & Save</RBtn>
            </>)}
            {uiState === "paused" && (<>
              <RBtn color="green" onClick={resumeRec}>▶ Resume</RBtn>
              <RBtn color="gray"  onClick={stopRec}>⏹ Stop & Save</RBtn>
            </>)}
            {uiState === "converting" && (
              <RBtn color="gray" onClick={() => {}}>⏳ Converting...</RBtn>
            )}
            {uiState === "done" && (
              <RBtn color="red" onClick={resetAll}>▶ New Recording</RBtn>
            )}
          </div>

          {/* Pause log */}
          {pauseLogs.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              {pauseLogs.map(p => (
                <div key={p.num} style={{ fontSize: 10, color: "#64748b", padding: "2px 0", borderBottom: "1px solid #1e293b" }}>
                  ⏸ Pause {p.num} at {p.at}
                </div>
              ))}
            </div>
          )}

          {/* Download */}
          {uiState === "done" && dlMeta && (
            <div style={{ textAlign: "center", paddingTop: 8, borderTop: "1px solid #334155" }}>
              <button onClick={downloadFile}
                style={{ width: "100%", padding: "8px", background: "#185FA5", border: "none", borderRadius: 6, color: "#E6F1FB", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                ⬇ Download {dlMeta.format.toUpperCase()}
              </button>
              <p style={{ fontSize: 10, color: "#64748b", marginTop: 6 }}>
                {batchLabel}_{dayNum} · {dlMeta.duration} · ~{dlMeta.size} MB · {dlMeta.pauses} pause(s)
              </p>
            </div>
          )}
        </div>
      )}

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  );
}

function RBtn({ color, onClick, children }: { color: string; onClick: () => void; children: React.ReactNode }) {
  const map: Record<string, { bg: string; c: string }> = {
    red:   { bg: "#E24B4A", c: "#fff" },
    amber: { bg: "#EF9F27", c: "#fff" },
    green: { bg: "#639922", c: "#fff" },
    gray:  { bg: "#334155", c: "#94a3b8" },
  };
  const s = map[color] || map.gray;
  return (
    <button onClick={onClick}
      style={{ padding: "6px 12px", background: s.bg, border: "none", borderRadius: 6, color: s.c, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
      {children}
    </button>
  );
}

// ════════════════════════════════════════════════════════════
//  MAIN MEETING PAGE
// ════════════════════════════════════════════════════════════
function MeetingRoomContent() {
  const params       = useParams();
  const searchParams = useSearchParams();

  const roomId      = (params?.roomId as string)?.toUpperCase() || "";
  const displayName = searchParams?.get("name") || "Guest";
  const isHost      = searchParams?.get("host") === "true";

  const [status, setStatus]   = useState<"loading"|"ready"|"error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const jitsiRef              = useRef<any>(null);
  const containerRef          = useRef<HTMLDivElement>(null);
  const apiLoadedRef          = useRef(false);

  const appId = process.env.NEXT_PUBLIC_JITSI_APP_ID || "";

  const initJitsi = useCallback(async () => {
    if (!window.JitsiMeetExternalAPI) return;
    if (jitsiRef.current) return;

    try {
      const res = await fetch("/api/generate-jitsi-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, displayName, isHost }),
      });

      if (!res.ok) throw new Error("Failed to get meeting token");
      const { token } = await res.json();

      const domain  = "8x8.vc";
      const options = {
        roomName:  `${appId}/${roomId}`,
        width:     "100%",
        height:    "100%",
        parentNode: containerRef.current,
        jwt:        token,
        configOverwrite: {
          startWithAudioMuted:  !isHost,
          startWithVideoMuted:  !isHost,
          disableDeepLinking:   true,
          enableNoisyMicDetection: false,
          prejoinPageEnabled:   false,
          disableRecordAudioNotification: true,
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK:         false,
          SHOW_WATERMARK_FOR_GUESTS:    false,
          SHOW_BRAND_WATERMARK:         false,
          SHOW_POWERED_BY:              false,
          DISPLAY_WELCOME_PAGE_CONTENT: false,
          TOOLBAR_BUTTONS: isHost
            ? ["microphone","camera","closedcaptions","desktop","fullscreen","fodeviceselection","hangup","profile","chat","settings","raisehand","videoquality","filmstrip","shortcuts","tileview","select-background","mute-everyone"]
            : ["microphone","camera","desktop","fullscreen","hangup","chat","raisehand","tileview"],
        },
        userInfo: {
          displayName,
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);
      jitsiRef.current = api;

      api.addEventListener("videoConferenceJoined", () => setStatus("ready"));
      api.addEventListener("readyToClose", () => {
        api.dispose();
        jitsiRef.current = null;
        window.location.href = "/meeting/meeting-page";
      });

    } catch (err: any) {
      console.error("Jitsi init error:", err);
      setErrorMsg(err.message || "Failed to start meeting");
      setStatus("error");
    }
  }, [roomId, displayName, isHost, appId]);

  // Load Jitsi External API script
  useEffect(() => {
    if (apiLoadedRef.current) { initJitsi(); return; }
    const script = document.createElement("script");
    script.src = `https://8x8.vc/${appId}/external_api.js`;
    script.async = true;
    script.onload = () => { apiLoadedRef.current = true; initJitsi(); };
    script.onerror = () => { setErrorMsg("Failed to load meeting library"); setStatus("error"); };
    document.head.appendChild(script);
    return () => { if (jitsiRef.current) { jitsiRef.current.dispose(); jitsiRef.current = null; } };
  }, [initJitsi]);

  if (status === "error") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f172a" }}>
        <div style={{ textAlign: "center", color: "#f1f5f9", padding: 32 }}>
          <p style={{ fontSize: 48, marginBottom: 16 }}>⚠️</p>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Failed to join meeting</h2>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>{errorMsg}</p>
          <a href="/meeting/meeting-page" style={{ padding: "10px 24px", background: "#185FA5", color: "#fff", borderRadius: 8, textDecoration: "none", fontSize: 14 }}>
            Back to Meeting Page
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000", position: "relative" }}>

      {/* Loading overlay */}
      {status === "loading" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#0f172a", zIndex: 10 }}>
          <div style={{ textAlign: "center", color: "#f1f5f9" }}>
            <div style={{ width: 48, height: 48, border: "3px solid #334155", borderTopColor: "#378ADD", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
            <p style={{ fontSize: 15 }}>Joining {roomId}...</p>
            <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Setting up your meeting</p>
          </div>
        </div>
      )}

      {/* Jitsi container */}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {/* Admin recorder — only visible to host */}
      {isHost && <AdminRecorder />}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </div>
  );
}

export default function MeetingRoomPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f172a" }}>
        <div style={{ textAlign: "center", color: "#f1f5f9" }}>
          <div style={{ width: 48, height: 48, border: "3px solid #334155", borderTopColor: "#378ADD", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <p>Loading meeting...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <MeetingRoomContent />
    </Suspense>
  );
}
