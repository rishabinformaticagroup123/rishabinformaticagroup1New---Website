'use client';

// ─────────────────────────────────────────────────────────────
//  MEETING PAGE - WITH RECORDING ONLY (NO MP4 CONVERSION)
//  - Start / Pause / Resume / Stop recording
//  - Saves as WebM format only
//  - Asks for folder permission when clicking Start Recording
//  - Use external converter.html to convert WebM to MP4 later
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Video, ArrowLeft, Loader2, Maximize2, Minimize2, AlertCircle } from "lucide-react";
import { JaaSMeeting } from '@jitsi/react-sdk';

// ════════════════════════════════════════════════════════════
//  ADMIN RECORDER — ONLY RECORDING (NO MP4 CONVERSION)
//  Saves as WebM with automatic folder selection
// ════════════════════════════════════════════════════════════
function AdminRecorder() {
  const [uiState, setUiState] = useState<"idle"|"recording"|"paused"|"saved">("idle");
  const [timer, setTimer] = useState("00:00:00");
  const [pauseCount, setPauseCount] = useState(0);
  const [pauseLogs, setPauseLogs] = useState<{ num: number; at: string }[]>([]);
  const [quality, setQuality] = useState("2500000");
  const [dayNum, setDayNum] = useState("COMBO Sessions");
  const [batchLabel, setBatchLabel] = useState("IICS_Batch14");
  const [recAlert, setRecAlert] = useState<{ msg: string; type: string } | null>(null);
  const [minimized, setMinimized] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [lastSavedSize, setLastSavedSize] = useState<string | null>(null);
  const [lastSavedDuration, setLastSavedDuration] = useState<string | null>(null);
  
  // Folder selection states
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [folderName, setFolderName] = useState("");
  const [isRequestingFolder, setIsRequestingFolder] = useState(false);

  const mrRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalSecsRef = useRef(0);
  const pauseCountRef = useRef(0);

  // Load saved folder name from localStorage on mount
  useEffect(() => {
    const savedFolderName = localStorage.getItem('rishab_folder_name');
    if (savedFolderName) {
      setFolderName(savedFolderName);
      // Note: We can't restore the actual folder handle, just the name
    }
  }, []);

  // ── Voice Announcement Function ─────────────────────────────
  const speak = useCallback((message: string, type: 'start' | 'stop' | 'pause' | 'resume' = 'start') => {
    if (!voiceEnabled) return;
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(message);
      
      switch (type) {
        case 'start':
          utterance.rate = 0.9;
          utterance.pitch = 1.1;
          break;
        case 'stop':
          utterance.rate = 0.9;
          utterance.pitch = 0.9;
          break;
        case 'pause':
          utterance.rate = 0.85;
          utterance.pitch = 1.0;
          break;
        case 'resume':
          utterance.rate = 0.9;
          utterance.pitch = 1.0;
          break;
      }
      
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => v.name.includes('Google UK English Female') || v.name.includes('Samantha'));
      if (femaleVoice) utterance.voice = femaleVoice;
      
      window.speechSynthesis.speak(utterance);
      showRecAlert(message, 'info');
    }
  }, [voiceEnabled]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      window.speechSynthesis.cancel();
    };
  }, []);

  const showRecAlert = useCallback((msg: string, type = "info") => {
    setRecAlert({ msg, type });
    setTimeout(() => setRecAlert(null), 6000);
  }, []);

  const fmtTime = (s: number) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
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

  const resetForNewRecording = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setUiState("idle");
    setTimer("00:00:00");
    setPauseCount(0);
    setPauseLogs([]);
    setLastSavedSize(null);
    setLastSavedDuration(null);
    
    chunksRef.current = [];
    totalSecsRef.current = 0;
    pauseCountRef.current = 0;
    
    window.speechSynthesis.cancel();
  };

  // ── Request Folder Permission ─────────────────────────────
  const requestFolderPermission = async (): Promise<boolean> => {
    try {
      const dirHandle = await (window as any).showDirectoryPicker();
      setSelectedFolder(dirHandle);
      setFolderName(dirHandle.name);
      localStorage.setItem('rishab_folder_name', dirHandle.name);
      showRecAlert(`📁 Folder selected: ${dirHandle.name}`, "success");
      showRecAlert(`✅ Recordings will save here automatically!`, "success");
      return true;
    } catch (err) {
      if ((err as any).name !== 'AbortError') {
        showRecAlert("Folder selection failed", "error");
      }
      return false;
    }
  };

  // ── Start Recording (asks for folder permission FIRST) ────
  const startRec = async () => {
    // If no folder selected, ask for permission first
    if (!selectedFolder) {
      setIsRequestingFolder(true);
      const folderSelected = await requestFolderPermission();
      setIsRequestingFolder(false);
      
      if (!folderSelected) {
        // User cancelled folder selection
        showRecAlert("Folder selection required to start recording", "warn");
        return;
      }
    }
    
    // Now proceed with actual recording
    resetForNewRecording();
    
    try {
      speak("Recording started. This session is being recorded.", 'start');
      
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: "monitor" },
        audio: true,
      });

      let micStream: MediaStream | null = null;
      try {
        micStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            noiseSuppression: true,
            echoCancellation: true,
            autoGainControl: true,
            sampleRate: 48000,
          },
          video: false,
        });
      } catch { showRecAlert("Mic not available — screen audio only", "warn"); }

      const ctx = new AudioContext({ sampleRate: 48000 });
      const dest = ctx.createMediaStreamDestination();

      if (screenStream.getAudioTracks().length > 0) {
        const tabGain = ctx.createGain();
        tabGain.gain.value = 0.8;
        ctx.createMediaStreamSource(screenStream).connect(tabGain);
        tabGain.connect(dest);
      }
      if (micStream) {
        const micGain = ctx.createGain();
        micGain.gain.value = 1.0;
        ctx.createMediaStreamSource(micStream).connect(micGain);
        micGain.connect(dest);
      }

      const combined = new MediaStream([
        ...screenStream.getVideoTracks(),
        ...dest.stream.getAudioTracks(),
      ]);

      streamRef.current = combined;
      chunksRef.current = [];
      totalSecsRef.current = 0;
      pauseCountRef.current = 0;
      setPauseCount(0);
      setPauseLogs([]);
      setTimer("00:00:00");

      const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
        ? "video/webm;codecs=vp9,opus" : "video/webm";

      const mr = new MediaRecorder(combined, {
        mimeType: mime,
        videoBitsPerSecond: parseInt(quality),
      });
      mrRef.current = mr;
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.start(500);
      startTimer();
      setUiState("recording");
      showRecAlert("Recording started — students cannot see this panel!", "info");

      screenStream.getVideoTracks()[0].onended = () => {
        if (mrRef.current && mrRef.current.state !== "inactive") stopAndSave();
      };
    } catch (err: any) {
      if (err.name === "NotAllowedError")
        showRecAlert("Permission denied. Please allow screen sharing.", "warn");
      else showRecAlert("Error: " + err.message, "warn");
    }
  };

  // ── Pause Recording ───────────────────────────────────────
  const pauseRec = () => {
    if (mrRef.current && mrRef.current.state === "recording") {
      speak("Recording paused. Will resume shortly.", 'pause');
      mrRef.current.pause();
      stopTimer();
      pauseCountRef.current++;
      const at = fmtTime(totalSecsRef.current);
      setPauseCount(pauseCountRef.current);
      setPauseLogs(prev => [...prev, { num: pauseCountRef.current, at }]);
      setUiState("paused");
      showRecAlert("Paused — same video file. Resume when ready.", "warn");
    }
  };

  // ── Resume Recording ──────────────────────────────────────
  const resumeRec = () => {
    if (mrRef.current && mrRef.current.state === "paused") {
      speak("Recording resumed. Continuing session recording.", 'resume');
      mrRef.current.resume();
      startTimer();
      setUiState("recording");
      showRecAlert("Resumed — continuing in same video file.", "info");
    }
  };

  // ── Stop and Save as WebM (saves to selected folder) ──────
  const stopAndSave = async () => {
    if (mrRef.current && mrRef.current.state !== "inactive") {
      speak("Recording stopped. Saving your recording.", 'stop');
      mrRef.current.stop();
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      stopTimer();
      
      setTimeout(async () => {
        if (chunksRef.current.length > 0) {
          const webmBlob = new Blob(chunksRef.current, { type: "video/webm" });
          const duration = fmtTime(totalSecsRef.current);
          const sizeMB = (webmBlob.size / 1024 / 1024).toFixed(1);
          
          const date = new Date().toISOString().slice(0, 10);
          const timestamp = new Date().toTimeString().slice(0, 8).replace(/:/g, '-');
          const fileName = `${batchLabel}_${dayNum}_${date}_${timestamp}.webm`;
          
          // Save to selected folder (should always have one now)
          if (selectedFolder) {
            try {
              const fileHandle = await selectedFolder.getFileHandle(fileName, { create: true });
              const writable = await fileHandle.createWritable();
              await writable.write(webmBlob);
              await writable.close();
              
              setLastSavedSize(sizeMB);
              setLastSavedDuration(duration);
              setUiState("saved");
              
              showRecAlert(`✅ Saved to: ${folderName}\\${fileName}`, "success");
              showRecAlert(`Duration: ${duration} | Size: ~${sizeMB} MB`, "info");
            } catch (err) {
              showRecAlert("Error saving to folder", "error");
              // Fallback to download
              const url = URL.createObjectURL(webmBlob);
              const a = document.createElement('a');
              a.href = url;
              a.download = fileName;
              a.click();
              setTimeout(() => URL.revokeObjectURL(url), 1000);
            }
          } else {
            // Should not happen, but fallback
            const url = URL.createObjectURL(webmBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            
            setLastSavedSize(sizeMB);
            setLastSavedDuration(duration);
            setUiState("saved");
            showRecAlert(`✅ Recording saved! Duration: ${duration} | Size: ~${sizeMB} MB`, "success");
          }
          
          showRecAlert(`📁 Use converter.html to convert to MP4 later`, "info");
        } else {
          showRecAlert("No recording data to save", "warn");
          resetForNewRecording();
        }
      }, 100);
    }
  };

  const dotColor: Record<string, string> = {
    idle: "#64748b", recording: "#E24B4A", paused: "#EF9F27", saved: "#639922",
  };

  const statusText: Record<string, string> = {
    idle: "Ready to record",
    recording: "Recording in progress",
    paused: "Paused — same video file",
    saved: "Recording saved ✓",
  };

  return (
    <div style={{
      position: "fixed",
      bottom: 70,
      right: 16,
      zIndex: 9999,
      width: minimized ? 200 : 400,
      background: "#0f172a",
      border: "1px solid #334155",
      borderRadius: 12,
      fontFamily: "system-ui, sans-serif",
      boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
      transition: "width 0.2s",
      overflow: "hidden",
    }}>
      <div
        onClick={() => setMinimized(m => !m)}
        style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid #334155", cursor: "pointer" }}
      >
        <div style={{
          width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
          background: dotColor[uiState],
          animation: (uiState === "recording") ? "blink 1s infinite" : "none",
        }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#f1f5f9", flex: 1 }}>
          {minimized ? (uiState === "recording" ? `⏺ REC ${timer}` : "🔴 Admin Recorder") : "🔴 Admin Recorder"}
        </span>
        <span style={{ fontSize: 11, color: "#64748b" }}>{minimized ? "▲" : "▼"}</span>
      </div>

      {!minimized && (
        <div style={{ padding: 14 }}>
          {/* Voice Toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, padding: "6px 8px", background: "#1e293b", borderRadius: 6 }}>
            <span style={{ fontSize: 11, color: "#f1f5f9" }}>🔊 Voice Announcements</span>
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              style={{
                width: 44, height: 22, borderRadius: 22, background: voiceEnabled ? "#639922" : "#64748b",
                border: "none", cursor: "pointer", position: "relative", transition: "0.2s"
              }}
            >
              <div style={{
                width: 18, height: 18, borderRadius: "50%", background: "#fff",
                position: "absolute", top: 2, left: voiceEnabled ? 24 : 2, transition: "0.2s"
              }} />
            </button>
          </div>

          {recAlert && (
            <div style={{ padding: "8px 12px", borderRadius: 6, fontSize: 12, marginBottom: 10, background: "#E6F1FB", color: "#0C447C", border: "1px solid #B5D4F4" }}>
              {recAlert.msg}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: dotColor[uiState], animation: (uiState === "recording") ? "blink 1s infinite" : "none" }} />
            <span style={{ fontSize: 12, color: "#f1f5f9", flex: 1 }}>{statusText[uiState]}</span>
            <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "monospace", color: "#f1f5f9" }}>{timer}</span>
          </div>

          {/* Settings - only when idle or saved */}
          {(uiState === "idle" || uiState === "saved") && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 12 }}>
                <div>
                  <p style={{ fontSize: 10, color: "#64748b", marginBottom: 3 }}>Batch</p>
                  <input value={batchLabel} onChange={e => setBatchLabel(e.target.value)} style={{ width: "100%", padding: "5px 8px", borderRadius: 6, background: "#1e293b", color: "#f1f5f9", border: "1px solid #334155", fontSize: 11 }} />
                </div>
                <div>
                  <p style={{ fontSize: 10, color: "#64748b", marginBottom: 3 }}>Day</p>
                  <input value={dayNum} onChange={e => setDayNum(e.target.value)} style={{ width: "100%", padding: "5px 8px", borderRadius: 6, background: "#1e293b", color: "#f1f5f9", border: "1px solid #334155", fontSize: 11 }} />
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <select value={quality} onChange={e => setQuality(e.target.value)} style={{ width: "100%", padding: "5px 8px", borderRadius: 6, background: "#1e293b", color: "#f1f5f9", border: "1px solid #334155", fontSize: 11 }}>
                    <option value="2500000">High Quality (2.5 Mbps)</option>
                    <option value="1000000">Medium Quality (1 Mbps)</option>
                    <option value="500000">Low Quality (500 Kbps)</option>
                  </select>
                </div>
              </div>
              
              {/* Folder info display (no button needed anymore) */}
              {folderName && (
                <div style={{ marginBottom: 12, padding: "6px", background: "#1e293b", borderRadius: 6, textAlign: "center" }}>
                  <p style={{ fontSize: 10, color: "#94a3b8" }}>
                    💾 Saving to: <strong>{folderName}</strong>
                  </p>
                </div>
              )}
              {!folderName && (
                <div style={{ marginBottom: 12, padding: "6px", background: "#451a03", borderRadius: 6, textAlign: "center" }}>
                  <p style={{ fontSize: 10, color: "#fbbf24" }}>
                    ⚠️ Click "Start Recording" to select save folder
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Controls */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {uiState === "idle" && (
              <button 
                onClick={startRec} 
                disabled={isRequestingFolder}
                style={{ padding: "6px 14px", background: "#E24B4A", border: "none", borderRadius: 6, color: "#fff", fontSize: 11, fontWeight: 600, cursor: isRequestingFolder ? "not-allowed" : "pointer", opacity: isRequestingFolder ? 0.6 : 1 }}
              >
                {isRequestingFolder ? "⏳ Selecting Folder..." : "▶ Start Recording"}
              </button>
            )}
            {uiState === "recording" && (
              <>
                <button onClick={pauseRec} style={{ padding: "6px 14px", background: "#EF9F27", border: "none", borderRadius: 6, color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                  ⏸ Pause
                </button>
                <button onClick={stopAndSave} style={{ padding: "6px 14px", background: "#334155", border: "none", borderRadius: 6, color: "#94a3b8", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                  ⏹ Stop & Save
                </button>
              </>
            )}
            {uiState === "paused" && (
              <>
                <button onClick={resumeRec} style={{ padding: "6px 14px", background: "#639922", border: "none", borderRadius: 6, color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                  ▶ Resume
                </button>
                <button onClick={stopAndSave} style={{ padding: "6px 14px", background: "#334155", border: "none", borderRadius: 6, color: "#94a3b8", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                  ⏹ Stop & Save
                </button>
              </>
            )}
            {uiState === "saved" && (
              <>
                <button onClick={resetForNewRecording} style={{ padding: "6px 14px", background: "#E24B4A", border: "none", borderRadius: 6, color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                  ▶ New Recording
                </button>
              </>
            )}
          </div>

          {/* Pause log */}
          {pauseLogs.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              {pauseLogs.map(p => (
                <div key={p.num} style={{ fontSize: 10, color: "#64748b", padding: "2px 0", borderBottom: "1px solid #1e293b" }}>
                  ⏸ Pause {p.num} at {p.at} — same video file
                </div>
              ))}
            </div>
          )}

          {/* Info about conversion */}
          {uiState === "saved" && lastSavedSize && (
            <div style={{ textAlign: "center", paddingTop: 8, borderTop: "1px solid #334155", fontSize: 10, color: "#64748b" }}>
              <p>✅ Recording saved as WebM</p>
              <p>Duration: {lastSavedDuration} | Size: ~{lastSavedSize} MB</p>
              <p style={{ marginTop: 6, color: "#60a5fa" }}>💡 Use converter.html to convert to MP4</p>
            </div>
          )}
        </div>
      )}

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  MAIN MEETING PAGE
// ════════════════════════════════════════════════════════════
export default function MeetingRoom() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const roomId = params.roomId as string;
  const isHost = searchParams.get('host') === 'true';
  const userName = searchParams.get('name') || (isHost ? 'Instructor' : 'Student');

  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const meetingContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/generate-jitsi-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ roomName: roomId, userName, isModerator: isHost }),
        });
        if (!response.ok) throw new Error('Failed to generate meeting token');
        const data = await response.json();
        setJwtToken(data.token);
      } catch (err) {
        console.error('Token error:', err);
        setError(err instanceof Error ? err.message : 'Failed to start meeting');
      } finally {
        setLoading(false);
      }
    };
    if (roomId && userName) fetchToken();
  }, [roomId, userName, isHost]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      meetingContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleApiReady = (api: any) => {
    console.log('Jitsi API ready');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white flex items-center justify-center p-4">
        <Card className="bg-gray-800/50 border-red-500 max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Meeting Error</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <Button onClick={() => router.push('/')} className="w-full">Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const instructorConfig = {
    startWithAudioMuted: false,
    startWithVideoMuted: false,
    prejoinPageEnabled: false,
    disableBranding: true,
    hideLogo: true,
    participantsPane: {
      hideModeratorSettingsTab: false,
      hideMoreActionsButton: false,
      hideMuteAllButton: false,
    },
    enableModeratorTools: true,
    disableGrantModerator: false,
    toolbarButtons: [
      'microphone', 'camera', 'desktop', 'fullscreen',
      'hangup', 'profile', 'chat', 'recording',
      'settings', 'raisehand', 'videoquality',
      'filmstrip', 'tileview', 'participants-pane',
      'security', 'invite', 'stats',
    ],
    audioLevels: { enabled: true },
    enableTalkWhileMuted: false,
    height: '100%', width: '100%',
  };

  const studentConfig = {
    startWithAudioMuted: false,
    startWithVideoMuted: false,
    prejoinPageEnabled: false,
    disableBranding: true,
    hideLogo: true,
    participantsPane: {
      hideModeratorSettingsTab: true,
      hideMoreActionsButton: true,
      hideMuteAllButton: true,
    },
    disableGrantModerator: true,
    toolbarButtons: [
      'microphone', 'camera', 'fullscreen', 'hangup',
      'chat', 'raisehand', 'settings', 'tileview',
    ],
    audioLevels: { enabled: true },
    height: '100%', width: '100%',
  };

  const studentInterfaceConfig = {
    SHOW_JITSI_WATERMARK: false,
    SHOW_WATERMARK_FOR_GUESTS: false,
    DEFAULT_BACKGROUND: '#1a1a1a',
    SHOW_MODERATOR_TOOLS: false,
    TOOLBAR_BUTTONS: ['microphone', 'camera', 'fullscreen', 'hangup', 'chat', 'raisehand', 'settings', 'tileview'],
    VIDEO_LAYOUT_FIT: 'cover',
    DEFAULT_REMOTE_DISPLAY_NAME: 'Student',
  };

  const instructorInterfaceConfig = {
    SHOW_JITSI_WATERMARK: false,
    SHOW_WATERMARK_FOR_GUESTS: false,
    DEFAULT_BACKGROUND: '#1a1a1a',
    SHOW_MODERATOR_TOOLS: true,
    TOOLBAR_BUTTONS: [
      'microphone', 'camera', 'desktop', 'fullscreen',
      'hangup', 'profile', 'chat', 'recording',
      'settings', 'raisehand', 'videoquality',
      'filmstrip', 'tileview', 'participants-pane',
      'security', 'invite', 'stats',
    ],
    VIDEO_LAYOUT_FIT: 'cover',
    DEFAULT_REMOTE_DISPLAY_NAME: 'Student',
  };

  const activeConfig = isHost ? instructorConfig : studentConfig;
  const activeInterfaceConfig = isHost ? instructorInterfaceConfig : studentInterfaceConfig;

  return (
    <div className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      {showControls && (
        <header className="bg-gray-800/90 backdrop-blur-sm px-4 py-2 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:bg-gray-700 text-white">
                <ArrowLeft className="h-4 w-4 mr-1" /> Exit
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-white font-medium">Room: {roomId}</span>
              {isHost && (
                <span className="px-2 py-0.5 bg-blue-600 rounded-full text-xs flex items-center gap-1">
                  <Shield className="h-3 w-3" /> Instructor
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowControls(false)} variant="ghost" size="sm" className="text-white hover:bg-gray-700" title="Hide controls">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </header>
      )}

      <div
        ref={meetingContainerRef}
        className="flex-1 relative bg-black min-h-0 w-full"
        style={{ height: showControls ? 'calc(100vh - 57px)' : '100vh' }}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-white text-lg">Starting your meeting...</p>
              <p className="text-gray-400 text-sm mt-2">This will just take a moment</p>
            </div>
          </div>
        ) : jwtToken ? (
          <JaaSMeeting
            appId={process.env.NEXT_PUBLIC_JITSI_APP_ID!}
            roomName={roomId}
            jwt={jwtToken}
            getIFrameRef={(node) => {
              node.style.height = '100%';
              node.style.width = '100%';
              node.style.border = 'none';
              node.style.position = 'absolute';
              node.style.top = '0';
              node.style.left = '0';
              node.style.right = '0';
              node.style.bottom = '0';
            }}
            configOverwrite={activeConfig}
            interfaceConfigOverwrite={activeInterfaceConfig}
            onApiReady={handleApiReady}
          />
        ) : null}
      </div>

      {!showControls && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700 shadow-lg z-50">
          <Button onClick={() => setShowControls(true)} variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            <Minimize2 className="h-4 w-4 mr-2" /> Show Controls
          </Button>
          <Button onClick={toggleFullscreen} variant="ghost" size="sm" className="text-white hover:bg-gray-700 ml-2">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      )}

      {isHost && <AdminRecorder />}
    </div>
  );
}