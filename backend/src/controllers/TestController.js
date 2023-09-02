import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const test = async (req, res) => {
    try {
        const { chatId } = req.body;
        const userId = req.userId;

        /*const userInChat = await prisma.userInChat.findFirst({
            where:{
                chatId: chatId,
                NOT:{
                    userId: userId,
                }
            },
            select: {
                userId: true,
            }
        })*/

        /*const userInChat = await prisma.userInChat.findFirst({
            where: {
                userId: userId,
                chatId: chatId,
            }
        })

        const messages = await prisma.message.findMany({
            where: {
                chatId: chatId,
                postDate: {
                    gte: userInChat.statusUpdated,
                }
            },
        });*/

        const usersChat = await prisma.chat.findMany({
            skip: 0,
            take: 1,
            where: {
                users: {
                    some: {
                        userId: req.userId
                    }
                },
            },
            include:{
                users: true,
            }
        })

        res.json({
            chats: usersChat,
            /*statusUpdated: userInChat.statusUpdated,
            userId: userId,
            message: messages,*/
            /*userInChat,*/

            /*user,*/
            /*chats: chatBetweenTwoUsers,
            length: chatBetweenTwoUsers.length,*/
        })
    } catch (error) {
        res.json({
            error: error,
        })
    }
}
