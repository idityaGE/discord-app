import { Server, Member, Profile } from "@prisma/client";

import { Server as NetServer, Socket } from 'net'
import { NextApiResponse } from 'next'
import { Message } from "postcss";
import { Server as SocketIOServer } from 'socket.io'

export type ServerWithMembersWithProfile = Server & {
  members: Array<Member & { profile: Profile }>;
}

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    }
  }
}

export type MessageWithMemberWithProfile = Message & {
  member: Member & { profile: Profile };
};