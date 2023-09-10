export default class UserRepository {
  constructor(prismaClient) {
    this.prismaClient = prismaClient;
  }
  async getUserCount() {
    return await this.prismaClient.user.count();
  }
  async getUserByLogin(login) {
    return await this.prismaClient.user.findUnique({
      where: {
        login: login,
      },
    });
  }
  async getUserProfileById(userId) {
    return await this.prismaClient.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        userProfile: true,
      }
    });
  }
  async getUserProfileByFriendTag(friendTag) {
    return await this.prismaClient.user.findUnique({
      where: {
        friendTag: friendTag,
      },
      include: {
        userProfile: true,
      }
    });
  }
  async createUser(userData) {
    return await this.prismaClient.user.create({
      data: userData,
    });
  }
}
