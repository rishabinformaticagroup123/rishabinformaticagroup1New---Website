import { NextRequest } from 'next/server';
import { Server } from 'socket.io';

// Store active rooms and their participants
const rooms = new Map();

export async function GET(req: NextRequest) {
  // This will be handled by the Socket.IO server
  return new Response('Socket.IO Server', { status: 200 });
}

// Socket.IO server setup (will be used in meeting pages)
export function initializeSocket(io: any) {
  io.on('connection', (socket: any) => {
    console.log('User connected:', socket.id);

    // Join a room
    socket.on('join-room', (roomId: string, userId: string) => {
      socket.join(roomId);
      
      // Initialize room if it doesn't exist
      if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
      }
      
      const room = rooms.get(roomId);
      room.add(userId);
      
      // Notify others in the room
      socket.to(roomId).emit('user-connected', userId);
      
      console.log(`User ${userId} joined room ${roomId}`);
      console.log(`Room ${roomId} has ${room.size} participants`);
    });

    // WebRTC signaling
    socket.on('offer', (data: any) => {
      socket.to(data.target).emit('offer', {
        offer: data.offer,
        caller: data.caller
      });
    });

    socket.on('answer', (data: any) => {
      socket.to(data.target).emit('answer', {
        answer: data.answer,
        answerer: data.answerer
      });
    });

    socket.on('ice-candidate', (data: any) => {
      socket.to(data.target).emit('ice-candidate', {
        candidate: data.candidate,
        sender: data.sender
      });
    });

    // Mute/unmute controls
    socket.on('mute-user', (data: any) => {
      socket.to(data.targetUserId).emit('force-mute');
    });

    socket.on('unmute-user', (data: any) => {
      socket.to(data.targetUserId).emit('force-unmute');
    });

    // Screen sharing status
    socket.on('screen-share-started', (roomId: string) => {
      socket.to(roomId).emit('screen-share-started');
    });

    socket.on('screen-share-stopped', (roomId: string) => {
      socket.to(roomId).emit('screen-share-stopped');
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      
      // Remove user from all rooms
      rooms.forEach((participants, roomId) => {
        if (participants.has(socket.id)) {
          participants.delete(socket.id);
          socket.to(roomId).emit('user-disconnected', socket.id);
          
          // Clean up empty rooms
          if (participants.size === 0) {
            rooms.delete(roomId);
          }
        }
      });
    });
  });
}