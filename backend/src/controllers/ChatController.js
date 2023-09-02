import {PrismaClient, UserChatStatus} from "@prisma/client";

const prisma = new PrismaClient();

const createChat = async (chatName, chatType) => {
    return prisma.chat.create({
        data: {
            chatName: chatName,
            creationDate: new Date(),
            chatType: chatType,
        },
    })
}
const addUsersInChat = async (chatId, firstUser, secondUser) => {
    const firstUserName = firstUser.userProfile.firstName + " " + firstUser.userProfile.lastName
    const secondUserName = secondUser.userProfile.firstName + " " + secondUser.userProfile.lastName

    return prisma.userInChat.createMany({
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
    })
}
export const createChatDialogue = async (req, res) => {
    try {
        const {friendTag} = req.body;

        const firstUser = await prisma.user.findUnique({
            where: {
                id: req.userId
            },
            include: {
                userProfile: true,
            }
        });
        const secondUser = await prisma.user.findUnique({
            where: {
                friendTag: friendTag
            },
            include: {
                userProfile: true,
            }
        });

        const chatBetweenTwoUsers = await prisma.chat.findMany({
            where: {
                users: {
                    every: {
                        userId: {in: [req.userId, secondUser.id]},
                    }
                }
            },
        });
        const isChatCreated = chatBetweenTwoUsers.length > 0;

        if (isChatCreated) {
            return res.json({
                success: false,
                message: "Чат уже создан",
            })
        }

        await prisma.userInChat.updateMany({
            where: {
                AND: {
                    userId: req.userId,
                    chatId: chatBetweenTwoUsers.chatId,
                }
            },
            data: {
                statusUpdated: new Date(),
                userStatus: "InChat",
            }
        })

        const chat = await createChat("DefaultChatName", "Dialogue")
        const usersInChat = await addUsersInChat(chat.id, firstUser, secondUser)
        res.json({
            success: true,
            message: "Чат создан",
            chat: chat,
            secondUser: secondUser,
            usersInChat: usersInChat,
        })
    } catch
        (error) {
        res.status(400).json(error)
    }
}
export const getChats = async (req, res) => {
    try {
        const chats = await prisma.chat.findMany({
            skip: parseInt(req.params.start),
            take: parseInt(req.params.count),
            where: {
                users: {
                    some: {
                        userId: req.userId
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
                                            userId: req.userId
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

        const newChats = chats.map((chat) => (
            {
                id: chat.id,
                creationDate: chat.creationDate,
                chatType: chat.chatType,
                chatAlias: chat.users[1].user.userProfile === null ? chat.users[1].chatAlias : chat.users[0].chatAlias,
                messagesCount: chat._count.messages,
                userCompanion: chat.users[1].user.userProfile !== null ? chat.users[1].user.userProfile : chat.users[0].user.userProfile,
                statusUpdated: chat.users[1].user.userProfile === null  ? chat.users[1].statusUpdated : chat.users[0].statusUpdated,
                lastMessage: chat.messages.length === 0 ? "No messages" : {
                    lastMessageBy: chat.messages[0].userId === req.userId ? "you" : "companion",
                    messageContent: chat.messages[0].messageContent,
                    postDate: chat.messages[0].postDate,
                }
            }
        ));
        res.json({
            success: true,
            userChats: newChats,
        })
    } catch
        (error) {
        res.status(400).json(error)
    }
}


//TODO updateChat
export const updateChat = async (req, res) => {
    try {
        const chatId = parseInt(req.params.id);
        const chats = await prisma.chat.findMany({
            where: {
                chatId: chatId
            },
            include: {
                messages: true,
            }
        });

        res.json({
            success: true,
            userChats: chats,
        })
    } catch
        (error) {
        res.status(400).json(error)
    }
}
export const deleteChatFromUser = async (req, res) => {
    try {
        const chat = await prisma.userInChat.updateMany({
            where: {
                userId: req.userId,
                chatId: parseInt(req.params.id),
            },
            data: {
                statusUpdated: new Date(),
                userStatus: UserChatStatus.ClearedChat,
            },
        })

        res.json({
            chat,
            chatId: req.params.id,
            success: true,
        })
    } catch
        (error) {
        res.status(400).json(error)
    }
}
