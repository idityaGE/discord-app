import { currentProfile } from "@/lib/currect-profile"
import prisma from "@/lib/db"
import { MemberRole } from "@prisma/client"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile()
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!params.channelId) {
      return new NextResponse("Channel ID is required", { status: 400 })
    }
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get("serverId")
    if (!serverId) {
      return new NextResponse("Server ID is required", { status: 400 })
    }
    const server = await prisma.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            }
          },
        }
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: "general"
            }
          }
        }
      }
    })
    return NextResponse.json(server)
  } catch (error) {
    console.error("CHANNEL DELETE ERROR: ", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}