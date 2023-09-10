export const prepareMessageData = async (userId, chatId, messageContent, status) => {
    return {
        userId: userId,
        chatId: chatId,
        messageContent: messageContent,
        postDate: new Date(),
        status: status,
    }
}
