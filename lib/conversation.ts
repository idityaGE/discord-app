import prisma from "./db"

export const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) => {
  const conversation = await findConversation(memberOneId, memberTwoId) || await findConversation(memberTwoId, memberOneId)
  if (conversation) {
    return conversation
  } else {
    return await createConversation(memberOneId, memberTwoId)
  }
}

const findConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await prisma.conversation.findFirst({
      where: {
        AND: [
          { memberOneId: memberOneId },
          { memberTwoId: memberTwoId }
        ]
      },
      include: {
        memberOne: {
          include: {
            profile: true
          }
        },
        memberTwo: {
          include: {
            profile: true
          }
        }
      }
    })
  } catch (error) {
    return null
  }
}

const createConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await prisma.conversation.create({
      data: {
        memberOneId: memberOneId,
        memberTwoId: memberTwoId
      },
      include: {
        memberOne: {
          include: {
            profile: true
          }
        },
        memberTwo: {
          include: {
            profile: true
          }
        }
      }
    })
  } catch (error) {
    return null
  }
}