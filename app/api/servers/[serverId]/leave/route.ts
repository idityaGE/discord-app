import { currentProfile } from "@/lib/currect-profile"
import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile()
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!params.serverId) {
      return new NextResponse("Server ID found", { status: 404 })
    }
    const server = await prisma.server.update({
      where: {
        id: params.serverId,
        profileId: { // Admin can't leave server
          not: profile.id,
        },
        members: {
          some: {  // Only members can leave server
            profileId: profile.id
          }
        }
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id
          }
        }
      }
    })
    return NextResponse.json(server)
  } catch (error) {
    console.error("SERVER_ID_LEAVE", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}