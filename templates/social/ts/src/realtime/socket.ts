import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';

let io: Server;

export const initializeSocket = (server: HTTPServer) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`✅ User connected: ${socket.id}`);

        // Join user to their personal room
        socket.on('join', (userId: string) => {
            socket.join(userId);
            console.log(`User ${userId} joined their room`);
        });

        // Handle chat messages
        socket.on('send_message', (data) => {
            io.to(data.recipientId).emit('receive_message', data);
        });

        // Handle typing indicators
        socket.on('typing', (data) => {
            socket.to(data.recipientId).emit('user_typing', data);
        });

        socket.on('disconnect', () => {
            console.log(`❌ User disconnected: ${socket.id}`);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};
