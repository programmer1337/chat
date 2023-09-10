import ChatRepository from "../repository/ChatRepository.js";

export default class ChatService {
  constructor(prismaClient) {
    this.chatRepository = new ChatRepository(prismaClient);
  }
  async findUserInChat(userId, chatId){
      const userInChat =
          await this.chatRepository.findUserInChat(userId, chatId);

      return userInChat;
  }
  async addUsersInChat(chatId, firstUser, secondUser) {
    const addedUser =
        await this.chatRepository.addUsersInChat(chatId, firstUser, secondUser);

    return addedUser;
  }
  async updateUserInChat(userId, chatId) {
    const updatedUser =
        await this.chatRepository.updateUserInChat(userId, chatId);
  }
  async findDialogueBetween(firstUserId, secondUserId) {
    const chatBetweenUsers =
        await this.chatRepository.findDialogueBetween(firstUserId, secondUserId);

    return chatBetweenUsers;
  }
  async getChats(userId, start, count) {
    const chats =
        await this.chatRepository.getChats(userId, start, count);

    return chats.map((chat) => (
      {
        id: chat.id,
        creationDate: chat.creationDate,
        chatType: chat.chatType,
        chatAlias: chat.users[1].user.userProfile === null ? chat.users[1].chatAlias : chat.users[0].chatAlias,
        messagesCount: chat._count.messages,
        userCompanion: chat.users[1].user.userProfile !== null ? chat.users[1].user.userProfile : chat.users[0].user.userProfile,
        statusUpdated: chat.users[1].user.userProfile === null ? chat.users[1].statusUpdated : chat.users[0].statusUpdated,
        lastMessage: chat.messages.length === 0 ? "No messages" : {
          lastMessageBy: chat.messages[0].userId === userId ? "you" : "companion",
          messageContent: chat.messages[0].messageContent,
          postDate: chat.messages[0].postDate,
        }
      }
    ));
  }
  async createChat(chatName, chatType) {
    const chat =
        await this.chatRepository.createChat(chatName, chatType);

    return chat;
  }
  async deleteChatFromUser(userId, chatId) {
    const updatedChat =
        await this.chatRepository.deleteChatFromUser(userId, chatId);

    return updatedChat;
  }
}
