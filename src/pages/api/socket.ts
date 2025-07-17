import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "@/types/next"
import { prisma } from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

let ioInstance: IOServer | null = null;

export function emitNotificationToUser(userId: string, notification: any) {
  if (ioInstance) {
    ioInstance.to(userId).emit("new-notification", notification);
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    const httpServer: HTTPServer = res.socket.server as any;
    const io = new IOServer(httpServer, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    res.socket.server.io = io;
    ioInstance = io;

    io.on("connection", (socket) => {
      socket.on("send-message", async (data) => {
        // data: { conversationId, senderId, content }
        const message = await prisma.message.create({
          data: {
            conversationId: data.conversationId,
            senderId: data.senderId,
            content: data.content,
          },
        });
        io.to(data.conversationId).emit("new-message", message);
      });
      socket.on("join-conversation", (conversationId) => {
        socket.join(conversationId);
      });
      // Real-time notifications: join user room
      socket.on("join-user", (userId) => {
        socket.join(userId);
      });
    });
  }
  res.end();
} 