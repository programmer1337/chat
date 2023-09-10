import {PrismaClient} from "@prisma/client";
import ChatService from "../service/ChatService.js";
import UserService from "../service/UserService.js";

const prisma = new PrismaClient();
const chatService = new ChatService(prisma);
const userService = new UserService(prisma);
export const createChatDialogue = async (req, res) => {
    try {
        const {userId} = req.userId;
        const {friendTag} = req.body;

        const firstUser = await userService.getUserProfileById(userId);
        const secondUser = await userService.getUserProfileByFriendTag(friendTag);

        const chatBetweenTwoUsers = await
            chatService.findDialogueBetween(firstUser.id, secondUser.id);

        if (chatBetweenTwoUsers.length > 0) {
            await chatService.updateUserInChat(firstUser, chatBetweenTwoUsers.id)

            return res.json({
                success: false,
                message: "Чат уже создан",
            })
        }

        const chat =
            await chatService.createChat("DefaultChatName", "Dialogue")

        const usersInChat =
            await chatService.addUsersInChat(chat.id, firstUser, secondUser);

        res.json({
            success: true,
            message: "Чат создан",
            chat: chat,
            secondUser: secondUser,
            usersInChat: usersInChat,
        })
    } catch
        (error) {
        res.status(400)
            .json({
                success: false,
                message: error.message,
            })
    }
}
export const getChats = async (req, res) => {
    try {
        const userId = req.userId;
        const start = parseInt(req.params.start);
        const count = parseInt(req.params.count);

        const chats = await chatService.getChats(userId, start, count);

        res.json({
            success: true,
            userChats: chats,
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
        const userId = req.userId;
        const chatId = parseInt(req.params.id);

        const chat = await chatService.deleteChatFromUser(userId, chatId);

        res.json({
            success: true,
            chatId: chatId,
            chat,
        })
    } catch
        (error) {
        res.status(400).json(error)
    }
}
