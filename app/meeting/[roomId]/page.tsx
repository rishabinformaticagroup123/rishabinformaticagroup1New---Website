'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Video, ArrowLeft, Loader2, Maximize2, Minimize2, AlertCircle } from "lucide-react";
import { JaaSMeeting } from '@jitsi/react-sdk';

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

  // Fetch JWT token
  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/generate-jitsi-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roomName: roomId,
            userName,
            isModerator: isHost
          })
        });

        if (!response.ok) {
          throw new Error('Failed to generate meeting token');
        }

        const data = await response.json();
        setJwtToken(data.token);
      } catch (err) {
        console.error('Token error:', err);
        setError(err instanceof Error ? err.message : 'Failed to start meeting');
      } finally {
        setLoading(false);
      }
    };

    if (roomId && userName) {
      fetchToken();
    }
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
            <Button onClick={() => router.push('/')} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // =============================================
  // ROLE-BASED CONFIGURATION - THE KEY PART!
  // =============================================
  
  // Instructor config - FULL CONTROLS
  const instructorConfig = {
    startWithAudioMuted: false,
    startWithVideoMuted: false,
    prejoinPageEnabled: false,
    disableBranding: true,
    hideLogo: true,
    
    // Show ALL moderator controls
    participantsPane: {
      hideModeratorSettingsTab: false,
      hideMoreActionsButton: false,
      hideMuteAllButton: false
    },
    
    enableModeratorTools: true,
    disableGrantModerator: false,
    
    // Full toolbar with ALL options
    toolbarButtons: [
      'microphone', 'camera', 'desktop', 'fullscreen',
      'hangup', 'profile', 'chat', 'recording',
      'settings', 'raisehand', 'videoquality', 
      'filmstrip', 'tileview', 'participants-pane',
      'security', 'invite', 'stats'
    ],
    
    audioLevels: { enabled: true },
    enableTalkWhileMuted: false,
    height: '100%',
    width: '100%',
  };

  // Student config - BASIC CONTROLS ONLY
  const studentConfig = {
    startWithAudioMuted: false,
    startWithVideoMuted: false,
    prejoinPageEnabled: false,
    disableBranding: true,
    hideLogo: true,
    
    // HIDE ALL moderator controls from students
    participantsPane: {
      hideModeratorSettingsTab: true,   // Hide from students
      hideMoreActionsButton: true,       // Hide from students
      hideMuteAllButton: true            // Hide from students
    },
    
    // Students cannot grant moderator powers
    disableGrantModerator: true,
    
    // Student toolbar - ONLY basic controls
    toolbarButtons: [
      'microphone', 'camera',              // Basic media
      'fullscreen', 'hangup',              // Exit/fullscreen
      'chat', 'raisehand',                  // Communication
      'settings', 'tileview'                 // Personal settings
      // NO participants-pane, NO security, NO recording, NO moderation!
    ],
    
    audioLevels: { enabled: true },
    height: '100%',
    width: '100%',
  };

  // Student interface config - hides moderator tools
  const studentInterfaceConfig = {
    SHOW_JITSI_WATERMARK: false,
    SHOW_WATERMARK_FOR_GUESTS: false,
    DEFAULT_BACKGROUND: '#1a1a1a',
    
    // Hide moderator tools from students
    SHOW_MODERATOR_TOOLS: false,
    
    // Student toolbar buttons
    TOOLBAR_BUTTONS: [
      'microphone', 'camera',
      'fullscreen', 'hangup',
      'chat', 'raisehand',
      'settings', 'tileview'
    ],
    
    VIDEO_LAYOUT_FIT: 'cover',
    DEFAULT_REMOTE_DISPLAY_NAME: 'Student',
  };

  // Instructor interface config - shows everything
  const instructorInterfaceConfig = {
    SHOW_JITSI_WATERMARK: false,
    SHOW_WATERMARK_FOR_GUESTS: false,
    DEFAULT_BACKGROUND: '#1a1a1a',
    
    // Show moderator tools
    SHOW_MODERATOR_TOOLS: true,
    
    TOOLBAR_BUTTONS: [
      'microphone', 'camera', 'desktop', 'fullscreen',
      'hangup', 'profile', 'chat', 'recording',
      'settings', 'raisehand', 'videoquality', 
      'filmstrip', 'tileview', 'participants-pane',
      'security', 'invite', 'stats'
    ],
    
    VIDEO_LAYOUT_FIT: 'cover',
    DEFAULT_REMOTE_DISPLAY_NAME: 'Student',
  };

  // Choose config based on user role
  const activeConfig = isHost ? instructorConfig : studentConfig;
  const activeInterfaceConfig = isHost ? instructorInterfaceConfig : studentInterfaceConfig;

  return (
    <div className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      {/* Header */}
      {showControls && (
        <header className="bg-gray-800/90 backdrop-blur-sm px-4 py-2 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:bg-gray-700 text-white">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Exit
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
            <Button
              onClick={() => setShowControls(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700"
              title="Hide controls"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </header>
      )}

      {/* Meeting Container */}
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
            appId={process.env.NEXT_PUBLIC_JITSI_APP_ID}
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
            configOverwrite={activeConfig}           // Role-based config
            interfaceConfigOverwrite={activeInterfaceConfig} // Role-based UI
            onApiReady={handleApiReady}
          />
        ) : null}
      </div>

      {/* Bottom Controls */}
      {!showControls && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700 shadow-lg z-50">
          <Button
            onClick={() => setShowControls(true)}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
          >
            <Minimize2 className="h-4 w-4 mr-2" />
            Show Controls
          </Button>
          <Button
            onClick={toggleFullscreen}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700 ml-2"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}