import {PrismaClient} from '@prisma/client'
import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import {checkRegisterData} from "../src/validations/registrationDataValidation.js";

const prisma = new PrismaClient();
const prepareUserData = async (firstName, lastName, login, password, userAvatar) => {
  const usersCount = await prisma.user.count();

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  return {
    firstName: firstName,
    lastName: lastName,
    userName: login,
    login: login,
    passwordHash: passwordHash,
    usersCount: usersCount,
    userAvatar: userAvatar,
  }
}
const createUser = async (userData) => {
  let data;
  if (userData.userAvatar === "") {
    data = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      userName: userData.userName,
    }
  } else {
    data = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      userName: userData.userName,
      userAvatar: userData.userAvatar,
    }
  }

  return prisma.user.create({
    data: {
      login: userData.login,
      passwordHash: userData.passwordHash,
      registrationDate: new Date(),
      friendTag: 1000000 + userData.usersCount,
      userProfile: {
        create: data,
      }
    },
  })
}

export const register = async (req, res) => {
  try {
    const validResult = validationResult(req);
    console.log(validResult.array())
    if (!validResult.isEmpty()) {
      let errors = validResult.array();

      return res.status(400).json(checkRegisterData(errors))
    }

    const {firstName, lastName, login, password, userAvatar} = req.body;

    const user = await createUser(
      await prepareUserData(firstName, lastName, login, password, userAvatar)
    )

    const token = jsonwebtoken.sign({
        _id: user.id
      }, "aviceSecretKey",
      {
        expiresIn: "30d",
      })

    res.json({
      user: user,
      token
    });
  } catch (error) {
    let errorData = {
      errorType: "DefaultError",
      error: error,
    };

    if (error.name === "PrismaClientKnownRequestError") {
      if (error.meta.target[0] === "login") {
        errorData = {
          errorType: "DatabaseError",
          errorMessage: "Login уже используется"
        }
      }

    }

    res.json(errorData);
  }
}
export const login = async (req, res) => {
  try {
    const {login, password} = req.body

    const user = await prisma.user.findUnique({
        where: {
            login: login
        }
    })

    if (!user) {
        return res.status(404).json({
            message: "Неверный логин",
        })
    }

    const isValidPass = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPass) {
      return res.status(400).json({
        message: "Не получается войти(( Неверный логин или пароль",
      })
    }

    const token = jsonwebtoken.sign({
        _id: user.id,
      }, "aviceSecretKey",
      {
        expiresIn: "30d",
      }
    )

    res.json({
      ...user,
      token,
    });
  } catch (error) {
    res.json(error)
  }
}
export const getProfileInfo = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        userProfile: true,
      }
    });

    if (!user) {
      res.status(404).json({
        message: "Пользователь не найден"
      })
    }

    const userData = {
      userId: user.id,
      firstName: user.userProfile.firstName,
      lastName: user.userProfile.lastName,
      userName: user.userProfile.userName,
      userAvatar: user.userProfile.userAvatar,
      userFriendTag: user.friendTag,
    }

    res.json({
      userProfile: userData,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

//TODO updateUserProfile
