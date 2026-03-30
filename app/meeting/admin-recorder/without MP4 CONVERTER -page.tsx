'use client';

import { useState, useRef, useEffect } from 'react';

export default function AdminRecorder() {
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'recording' | 'paused' | 'stopped'>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [error, setError] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start recording
  const startRecording = async () => {
    setError('');
    recordedChunksRef.current = [];
    setRecordingBlob(null);
    
    try {
      // Step 1: Get screen capture FIRST
      console.log('Requesting screen capture...');
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: 'always'
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 48000
        }
      });
      
      screenStreamRef.current = screenStream;
      setIsSharing(true);
      
      // Listen for when user stops sharing via browser
      screenStream.getVideoTracks()[0].onended = () => {
        console.log('Screen sharing stopped by user');
        if (recordingStatus === 'recording' || recordingStatus === 'paused') {
          stopRecording();
        }
        setIsSharing(false);
      };
      
      // Step 2: Get microphone
      console.log('Requesting microphone...');
      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 48000
        }
      });
      micStreamRef.current = micStream;
      
      // Step 3: Combine streams
      const videoTrack = screenStream.getVideoTracks()[0];
      const audioTracks = micStream.getAudioTracks();
      
      const combinedStream = new MediaStream();
      combinedStream.addTrack(videoTrack);
      audioTracks.forEach(track => combinedStream.addTrack(track));
      
      // Also add screen audio if available
      const screenAudioTracks = screenStream.getAudioTracks();
      screenAudioTracks.forEach(track => combinedStream.addTrack(track));
      
      // Step 4: Create MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp8') 
        ? 'video/webm;codecs=vp8'
        : 'video/webm';
      
      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: mimeType
      });
      
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        setRecordingBlob(blob);
      };
      
      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        setError('Recording error occurred');
      };
      
      // Start recording
      mediaRecorder.start(1000);
      setRecordingStatus('recording');
      
      // Start timer
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (err: any) {
      console.error('Start recording error:', err);
      
      if (err.name === 'NotAllowedError') {
        setError('Permission denied. Please allow screen and microphone access.');
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found. Please connect a microphone.');
      } else if (err.name === 'AbortError') {
        setError('Screen selection cancelled.');
      } else {
        setError(`Could not start recording: ${err.message || 'Unknown error'}`);
      }
      
      // Clean up if error
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
        screenStreamRef.current = null;
      }
      setIsSharing(false);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recordingStatus === 'recording') {
      mediaRecorderRef.current.pause();
      setRecordingStatus('paused');
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && recordingStatus === 'paused') {
      mediaRecorderRef.current.resume();
      setRecordingStatus('recording');
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && (recordingStatus === 'recording' || recordingStatus === 'paused')) {
      mediaRecorderRef.current.stop();
      setRecordingStatus('stopped');
      
      if (timerRef.current) clearInterval(timerRef.current);
      
      // Stop all tracks
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
        screenStreamRef.current = null;
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
        micStreamRef.current = null;
      }
      
      setIsSharing(false);
    }
  };

  const downloadRecording = () => {
    if (recordingBlob) {
      const url = URL.createObjectURL(recordingBlob);
      const a = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      a.href = url;
      a.download = `class-recording-${timestamp}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const resetRecording = () => {
    recordedChunksRef.current = [];
    setRecordingBlob(null);
    setRecordingTime(0);
    setRecordingStatus('idle');
    setError('');
    setIsSharing(false);
  };

  // Stop sharing function
  const stopSharing = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
      screenStreamRef.current = null;
      setIsSharing(false);
      if (recordingStatus === 'recording' || recordingStatus === 'paused') {
        stopRecording();
      }
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🎥 Class Recorder</h1>
          <p className="text-gray-300 text-sm">
            {recordingStatus === 'recording' && 'Recording in progress'}
            {recordingStatus === 'paused' && 'Recording paused'}
            {recordingStatus === 'stopped' && 'Recording completed'}
            {recordingStatus === 'idle' && 'Ready to record your class'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className={`px-6 py-4 ${
            recordingStatus === 'recording' ? 'bg-red-50 border-l-4 border-red-500' :
            recordingStatus === 'paused' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
            recordingStatus === 'stopped' ? 'bg-green-50 border-l-4 border-green-500' :
            'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  recordingStatus === 'recording' ? 'bg-red-500 animate-pulse' :
                  recordingStatus === 'paused' ? 'bg-yellow-500' :
                  recordingStatus === 'stopped' ? 'bg-green-500' :
                  'bg-gray-400'
                }`}></div>
                <span className="font-semibold text-gray-700">
                  {recordingStatus === 'recording' && '🔴 RECORDING'}
                  {recordingStatus === 'paused' && '⏸ PAUSED'}
                  {recordingStatus === 'stopped' && '✅ SAVED'}
                  {recordingStatus === 'idle' && '⚪ READY'}
                </span>
              </div>
              <div className="text-2xl font-mono font-bold text-gray-700">
                {formatTime(recordingTime)}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {recordingStatus === 'idle' && (
              <button
                onClick={startRecording}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                ▶ Start Recording
              </button>
            )}

            {(recordingStatus === 'recording' || recordingStatus === 'paused') && (
              <div className="flex gap-3">
                {recordingStatus === 'recording' ? (
                  <button
                    onClick={pauseRecording}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3"
                  >
                    ⏸ Pause
                  </button>
                ) : (
                  <button
                    onClick={resumeRecording}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3"
                  >
                    ▶ Resume
                  </button>
                )}
                <button
                  onClick={stopRecording}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3"
                >
                  ⏹ Stop
                </button>
              </div>
            )}

            {recordingStatus === 'stopped' && recordingBlob && (
              <div className="space-y-3">
                <button
                  onClick={downloadRecording}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3"
                >
                  💾 Download Recording
                </button>
                <button
                  onClick={resetRecording}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl"
                >
                  Record New Class
                </button>
              </div>
            )}

            {isSharing && recordingStatus === 'recording' && (
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-sm text-blue-700">
                  🔴 Screen is being shared and recorded
                </p>
                <button
                  onClick={stopSharing}
                  className="mt-2 text-xs bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                >
                  Stop Sharing
                </button>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm text-center">{error}</p>
                <button
                  onClick={() => setError('')}
                  className="text-xs text-red-500 text-center w-full mt-2 hover:text-red-700"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>

          <div className="bg-blue-50 px-6 py-4 border-t border-blue-200">
            <p className="text-sm font-semibold text-blue-800 mb-2">📌 HOW TO RECORD:</p>
            <ol className="text-xs text-blue-700 space-y-2 list-decimal list-inside">
              <li>Click "Start Recording"</li>
              <li>Select "Entire Screen" or "Window"</li>
              <li>Choose the window with your meeting/teaching content</li>
              <li>Click "Share" - recording begins automatically</li>
              <li>Minimize this window while teaching</li>
              <li>Click Pause during breaks, Resume to continue</li>
              <li>Click Stop when class ends, then Download</li>
            </ol>
            <div className="mt-3 p-2 bg-yellow-50 rounded border border-yellow-200">
              <p className="text-xs text-yellow-800">
                💡 Tip: The final video will ONLY show what you shared - not this control panel!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}