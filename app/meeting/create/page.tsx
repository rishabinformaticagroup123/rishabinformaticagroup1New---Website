'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, Users, Clock, Copy, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateMeeting() {
  const [meetingName, setMeetingName] = useState('');
  const [createdRoom, setCreatedRoom] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const generateRoomId = () => {
    // More professional room IDs
    const prefix = 'INFA';
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${randomId}`;
  };

  const createMeeting = async () => {
    if (!meetingName.trim()) return;
    
    setIsCreating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const roomId = generateRoomId();
      setCreatedRoom(roomId);
    } catch (error) {
      console.error('Failed to create meeting:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const copyToClipboard = async () => {
    if (createdRoom) {
      try {
        await navigator.clipboard.writeText(`${window.location.origin}/meeting/${createdRoom}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = `${window.location.origin}/meeting/${createdRoom}`;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

const startMeeting = () => {
  if (createdRoom) {
    // Add host=true AND name=Instructor
    router.push(`/meeting/${createdRoom}?host=true&name=Instructor`);
  }
};

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-2xl">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Video className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Create New Meeting</CardTitle>
          <CardDescription>
            Start a new training session with your students
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!createdRoom ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="meetingName">Meeting Name</Label>
                <Input
                  id="meetingName"
                  placeholder="e.g., Informatica IICS Training - Batch 15"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && createMeeting()}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Up to 25 participants</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Crystal clear audio & screen sharing</span>
                </div>
              </div>

              <Button 
                onClick={createMeeting} 
                disabled={!meetingName.trim() || isCreating}
                className="w-full"
                size="lg"
              >
                {isCreating ? "Creating..." : "Create Meeting"}
              </Button>
            </>
          ) : (
            <div className="space-y-6 text-center">
              <div className="rounded-lg bg-green-50 border border-green-200 p-6">
                <div className="text-green-600 font-semibold mb-2">Meeting Created Successfully!</div>
                <div className="text-2xl font-bold text-gray-900 mb-4">{createdRoom}</div>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Button 
                    variant="outline" 
                    onClick={copyToClipboard} 
                    size="sm"
                    className={copied ? "bg-green-50 border-green-200" : ""}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? "Copied!" : "Copy Link"}
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Share this meeting ID with your students
                </p>
              </div>

              <div className="space-y-3">
                <Button onClick={startMeeting} className="w-full" size="lg">
                  <Video className="h-5 w-5 mr-2" />
                  Start Meeting Now
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCreatedRoom('');
                    setMeetingName('');
                  }}
                  className="w-full"
                >
                  Create Another Meeting
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}