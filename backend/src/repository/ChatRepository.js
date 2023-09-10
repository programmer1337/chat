import {UserChatStatus} from "@prisma/client";

export default class ChatRepository {
  constructor(prismaClient) {
    this.prismaClient = prismaClient;
  }
  async findUserInChat(userId, chatId){
    const userInChat = await this.prismaClient.userInChat.findFirst({
      where: {
        userId: userId,
        chatId: chatId,
      }
    })

    return userInChat;
  }
  async addUsersInChat(chatId, firstUser, secondUser) {
    const firstUserName = firstUser.userProfile.firstName + " " + firstUser.userProfile.lastName
    const secondUserName = secondUser.userProfile.firstName + " " + secondUser.userProfile.lastName

    const addedUser = await this.prismaClient.userInChat.createMany({
      data: [
        {
          userId: firstUser.id,
          chatId: chatId,
          chatAlias: secondUserName,
          userStatus: "InChat",
        },
        {
          userId: secondUser.id,
          chatId: chatId,
          chatAlias: firstUserName,
          userStatus: "InChat",
        }
      ]
    });
    return addedUser;
  }
  async updateUserInChat(userId, chatId) {
    await this.prismaClient.userInChat.update({
      where: {
        AND: {
          userId: userId,
          chatId: chatId,
        }
      },
      data: {
        statusUpdated: new Date(),
        userStatus: "InChat",
      }
    })
  }
  async findDialogueBetween(firstUserId, secondUserId) {
    return await this.prismaClient.chat.findMany({
      where: {
        users: {
          every: {
            userId: {
              in: [firstUserId, secondUserId]
            },
          }
        }
      },
    });
  }
  async getChats(userId, start, count) {
    return await this.prismaClient.chat.findMany({
      skip: start,
      take: count,
      where: {
        users: {
          some: {
            userId: userId,
          }
        },
      },
      include: {
        users: {
          select: {
            chatAlias: true,
            statusUpdated: true,
            user: {
              select: {
                userProfile: {
                  where: {
                    NOT: {
                      userId: userId,
                    }
                  },
                },
              }
            },
          }
        },
        messages: {
          orderBy: {
            postDate: 'desc',
          },
          take: 1,
        },
        _count: {
          select: {messages: true},
        },
      },
    });
  }
  async createChat(chatName, chatType) {
    return await this.prismaClient.chat.create({
      data: {
        chatName: chatName,
        creationDate: new Date(),
        chatType: chatType,
      },
    })
  }
  async deleteChatFromUser(userId, chatId) {
    const updatedChat = await this.prismaClient.userInChat.updateMany({
      where: {
        userId: userId,
        chatId: chatId,
      },
      data: {
        statusUpdated: new Date(),
        userStatus: UserChatStatus.ClearedChat,
      },
    })

    return updatedChat;
  }
}
