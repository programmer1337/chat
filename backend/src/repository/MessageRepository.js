export default class MessageRepository {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }

    async createMessage(messageData) {
        await this.prismaClient.message.create({
            data: messageData,
        })
    }

    async getMessages(start, count, chatId, statusUpdated) {
        const messages = await this.prismaClient.message.findMany({
            skip: start,
            take: count,
            where: {
                chatId: chatId,
                postDate: {
                    gte: statusUpdated,
                }
            },
            orderBy: {
                postDate: "desc",
            }
        });

        return messages;
    }
}
