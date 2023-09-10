import {PrismaClient, MessageStatus} from "@prisma/client";
import MessageService from "../service/MessageService.js";
import ChatService from "../service/ChatService.js";

const prisma = new PrismaClient();
const messageService = new MessageService(prisma);
const chatService = new ChatService(prisma);
export const postMessage = async (req, res) => {
    try {
        const userId = req.userId;
        const chatId = parseInt(req.params.id);
        const {messageContent} = req.body;

        const message =
            await messageService.createMessage(userId, chatId, messageContent);

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

        const userInChat =
            await chatService.findUserInChat(userId, chatId);

        const messages =
            await messageService.getMessages(start, count, userId, chatId, userInChat.statusUpdated)

        res.json({
            success: true,
            messages: messages,
            user: userInChat.statusUpdated,
        })
    } catch
        (error) {
        res.status(400).json(error)
    }
}

//TODO Сделать обновление состояния собщения.
export const updateMessageStatus = async (req, res) => {
    try {
        const {chatId, viewingTime, newStatus} = req.body;

        const updatedMessages = await prisma.message.updateMany({
            where: {
                chatId: chatId,
                postDate: {
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
    } catch (error) {
        res.status(500).json({
            error: error,
        })
    }
}
