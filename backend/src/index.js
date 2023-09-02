import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import {createConnection} from "./database/Connection.js";
import router from "./route.js";
import http from "http";

createConnection()
const app = express();
app.use(express.json());
app.use(cors({origin: true}));
app.use(router)

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"*",
        methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
    }
})

const activeChat = []

io.on('connection', (socket)=>{
    socket.on('createChat', ({chatId})=>{
        socket.join(chatId);
        activeChat.push({id: chatId, messages: []})
    })

    socket.on('sendMessage', (data)=>{
        io.to(data.chatId).emit('message', data);
    })

    io.on("disconnected", () =>{
    })
})

const port = 3006;
const host = "192.168.0.126";
server.listen(port, host);