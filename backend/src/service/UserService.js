import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import {prepareUserData} from "../utils/prepareUserData.js";
import UserRepository from "../repository/UserRepository.js";

export default class UserService {
  constructor(prismaClient) {
    this.userRepository = new UserRepository(prismaClient);
  }

  async generateJWT(user) {
    return jsonwebtoken.sign({
        _id: user.id,
      }, "aviceSecretKey",
      {
        expiresIn: "30d",
      }
    );
  }
  async authorizeUser(user, password) {
    const isValidPass = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPass) {
      throw new Error("Не получается войти(( Неверный логин или пароль");
    }

    return this.generateJWT(user);
  }
  async getUser(login) {
    const user = await this.userRepository.getUserByLogin(login);

    if (!user) {
      throw new Error("Неверный логин");
    }
    return user;
  }
  async getUserProfileById(userId) {
    const user = await this.userRepository.getUserProfileById(userId)

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    return {
      userId: user.id,
      firstName: user.userProfile.firstName,
      lastName: user.userProfile.lastName,
      userName: user.userProfile.userName,
      userAvatar: user.userProfile.userAvatar,
      userFriendTag: user.friendTag,
    };
  }
  async getUserProfileByFriendTag(friendTag) {
    const user = await this.userRepository.getUserProfileByFriendTag(friendTag);

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    return {
      userId: user.id,
      firstName: user.userProfile.firstName,
      lastName: user.userProfile.lastName,
      userName: user.userProfile.userName,
      userAvatar: user.userProfile.userAvatar,
      userFriendTag: user.friendTag,
    };
  }
  async createUser(userData) {
    const userCount = await this.userRepository.getUserCount();
    const preparedUserData = await prepareUserData(userData, userCount);

    return await this.userRepository.createUser(preparedUserData);
  }
  updateUser(data) {
  }
  deleteUser(data) {
  }
}
