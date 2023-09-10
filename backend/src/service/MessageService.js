import MessageRepository from "../repository/MessageRepository.js";
import {MessageStatus} from "@prisma/client";
import {prepareMessageData} from "../utils/prepareMessageData.js";

export default class MessageService {
    constructor(prismaClient) {
        this.messageRepository = new MessageRepository(prismaClient);
    }

    async createMessage(userId, chatId, messageContent) {
        const preparedMessageData =
            await prepareMessageData(userId, chatId, messageContent, MessageStatus.Sent)

        return await this.messageRepository.createMessage(preparedMessageData);
    }

    async getMessages(start, count, userId, chatId, statusUpdated) {
        const messages =
            await this.messageRepository.getMessages(start, count, chatId, statusUpdated)

        return messages.map((message) => (
            {
                sender: message.userId === userId ? "you" : "companion",
                ...message
            }
        ));
    }
}

