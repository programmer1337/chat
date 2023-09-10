import {PrismaClient} from '@prisma/client'
import {validationResult} from "express-validator";
import {checkRegisterData} from "../validations/registrationDataValidation.js";
import UserService from "../service/UserService.js";

const prisma = new PrismaClient();
const userService = new UserService(prisma);

export const register = async (req, res) => {
  try {
    const validResult = validationResult(req);

    if (!validResult.isEmpty()) {
      let errors = validResult.array();
      return res.status(400).json(checkRegisterData(errors))
    }

    const userData = req.body;

    const user = await userService.createUser(userData);
    const token = await userService.generateJWT(user);

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

    res
      .status(400)
      .json(errorData);
  }
}
export const login = async (req, res) => {
  try {
    const {login, password} = req.body
    const user = await userService.getUser(login);
    const token = await userService.authorizeUser(user, password);

    res.json({
      ...user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      errorType: "LoginError",
      message: error.message
    })
  }
}
export const getProfileInfo = async (req, res) => {
  try {
    const userId = req.userId;
    const userProfile = await userService.getUserProfileById(userId);

    res.json({
      userProfile: userProfile,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: error.message,
      });
  }
}

//TODO updateUserProfile
