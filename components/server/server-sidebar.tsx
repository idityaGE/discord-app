import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

import prisma from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

import { Hash, Mic, Video, ShieldCheck, ShieldAlert } from "lucide-react";

import ServerHeader from "./server-header";
import ServerSearch from "./server-search";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSidebarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
}

const ServerSidebar = async ({
  serverId
}: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect('/');
  }
  const server = await prisma.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc'
        }
      },
      members: {
        include: {
          profile: true
        },
        orderBy: {
          role: 'asc'
        }
      }
    }
  })

  if (!server) {
    return redirect('/');
  }

  const textChannels = server?.channels.filter(channel => channel.type === ChannelType.TEXT);
  const audioChannels = server?.channels.filter(channel => channel.type === ChannelType.AUDIO);
  const videoChannels = server?.channels.filter(channel => channel.type === ChannelType.VIDEO);
  const members = server?.members.filter(member => member.profileId !== profile.id);
  const role = server?.members.find(member => member.profileId === profile.id)?.role;


  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch data={[
            {
              label: "Text Channels",
              type: "channel",
              data: textChannels?.map(channel => ({
                icon: iconMap[channel.type],
                name: channel.name,
                id: channel.id
              }))
            },
            {
              label: "Voice Channels",
              type: "channel",
              data: audioChannels?.map(channel => ({
                icon: iconMap[channel.type],
                name: channel.name,
                id: channel.id
              }))
            },
            {
              label: "Video Channels",
              type: "channel",
              data: videoChannels?.map(channel => ({
                icon: iconMap[channel.type],
                name: channel.name,
                id: channel.id
              }))
            },
            {
              label: "Members",
              type: "member",
              data: members?.map(member => ({
                icon: roleIconMap[member.role],
                name: member.profile.name,
                id: member.id
              }))
            }
          ]} />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rou my-2" />
        {!!textChannels?.length && (  // !! is a double negation to convert the value to a boolean 
          <div
            className="mb-2"
          >
            <ServerSection
              label="Text Channels"
              role={role}
              sectionType="channel"
              channelType={ChannelType.TEXT}
            />
            <div className="space-y-[2px]">
              {textChannels.map(channel => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div
            className="mb-2"
          >
            <ServerSection
              label="Voice Channels"
              role={role}
              sectionType="channel"
              channelType={ChannelType.AUDIO}
            />
            <div className="space-y-[2px]">
              {audioChannels.map(channel => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div
            className="mb-2"
          >
            <ServerSection
              label="Video Channels"
              role={role}
              sectionType="channel"
              channelType={ChannelType.VIDEO}
            />
            <div className="space-y-[2px]">
              {videoChannels.map(channel => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div
            className="mb-2"
          >
            <ServerSection
              label="Members"
              role={role}
              sectionType="member"
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map(member => (
                <ServerMember
                  key={member.id}
                  member={member}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default ServerSidebar;