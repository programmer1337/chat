import {PrismaClient} from "@prisma/client";

export const createConnection = () => {
    const prisma = new PrismaClient()
    prisma.$connect().then(() => {
        console.log("connected to the database")
    }).catch((error) => {
        console.log("error: " + error)
    })
}