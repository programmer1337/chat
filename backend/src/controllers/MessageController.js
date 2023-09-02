import {PrismaClient, MessageStatus} from "@prisma/client";

const prisma = new PrismaClient();
const prepareMessageData = async (userId, chatId, messageContent, status) => {
    return {
        userId: userId,
        chatId: chatId,
        messageContent: messageContent,
        status: status,
    }
}
const createMessage = async (messageData) => {
    return prisma.message.create({
        data: {
            userId: messageData.userId,
            chatId: messageData.chatId,
            messageContent: messageData.messageContent,
            postDate: new Date(),
            status: messageData.status,
        },
    })
}
export const postMessage = async (req, res) => {
    try {
        const {messageContent} = req.body;
        const userId = req.userId;
        const chatId = parseInt(req.params.id);

        const message = await createMessage(
            await prepareMessageData(userId, chatId, messageContent, MessageStatus.Sent)
        );
        res.json({
            success: true,
            message: "Сообщение отправлено",
            messageSent: message,
        });

    } catch
        (error) {
        res.status(400).json(error)
    }
}
export const getMessages = async (req, res) => {
    try {
        const userId = req.userId;
        const chatId = parseInt(req.params.id);
        const start = parseInt(req.params.start);
        const count = parseInt(req.params.count);

        const userInChat = await prisma.userInChat.findFirst({
            where: {
                userId: userId,
                chatId: chatId,
            }
        })

        const messages = await prisma.message.findMany({
            skip: start,
            take: count,
            where: {
                chatId: chatId,
                postDate: {
                    gte: userInChat.statusUpdated,
                }
            },
            orderBy:{
                postDate: "desc",
            }
        });

        const newMessages = messages.map((message) => (
            {
                sender: message.userId === userId ? "you" : "companion",
                ...message
            }
        ));

        res.json({
            success: true,
            messages: newMessages,
            user: userInChat.statusUpdated,
        })
    } catch
        (error) {
        res.status(400).json(error)
    }
}

//TODO Сделать обновление состояния собщения.
export const updateMessageStatus = async (req, res) =>{
    try {
        const { chatId, viewingTime, newStatus } = req.body;

        const updatedMessages = await prisma.message.updateMany({
            where: {
                chatId: chatId,
                postDate:{
                    gte: viewingTime,
                }
            },
            data: {
                status: newStatus,
            }
        })
        res.json({
            newStatusIn: updatedMessages,
        })
    }catch (error){
        res.status(500).json({
            error: error,
        })
    }
}