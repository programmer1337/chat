import * as Validation from "./validations/validations.js";
import * as UserController from "./controllers/UserController.js";
import checkAuthorization from "./utils/checkAuthorization.js";
import * as ChatController from "./controllers/ChatController.js";
import * as MessageController from "./controllers/MessageController.js";
import * as TestController from "./controllers/TestController.js";
import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
    res.send("OK");
})

router.post("/register", Validation.registerValidation, UserController.register);
router.post("/login", Validation.loginValidation, UserController.login)
router.get("/profile_info", checkAuthorization, UserController.getProfileInfo);

router.post("/chats", checkAuthorization, ChatController.createChatDialogue);
router.get("/chats/:start.:count", checkAuthorization, ChatController.getChats);

/*router.patch("/chat/:id", checkAuthorization, ChatController.updateChat);*/
router.delete("/chat/:id", checkAuthorization, ChatController.deleteChatFromUser);

router.post("/chat/:id", checkAuthorization, MessageController.postMessage)
router.get("/chat/:id/:start.:count", checkAuthorization, MessageController.getMessages);
/*
router.get("/message", checkAuthorization, MessageController.getMessage)
router.delete("/message", checkAuthorization, MessageController.deleteMessage)*/

router.post("/test", checkAuthorization, TestController.test)

export default router;
