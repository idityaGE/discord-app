import ChatHeader from "@/components/chat/chat-header"
import { currentProfile } from "@/lib/currect-profile"
import prisma from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

interface ChannelIdPageProps {
  params: {
    channelId: string
    serverId: string
  }
}

const ChannelIdPage = async ({
  params
}: ChannelIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const channel = await prisma.channel.findUnique({
    where: {
      id: params.channelId
    }
  })

  const member = await prisma.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile?.id
    }
  })

  if (!channel || !member) redirect('/');


  return (
    <>
      <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
        <ChatHeader
          name={channel.name}
          serverId={params.serverId}
          type="channel"
        />
      </div>
    </>
  );
}

export default ChannelIdPage;