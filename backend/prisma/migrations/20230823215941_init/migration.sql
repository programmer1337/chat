-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('Activated', 'Deactivated');

-- CreateEnum
CREATE TYPE "UserChatStatus" AS ENUM ('InChat', 'LeaveChat', 'ClearedChat');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('Sent', 'Delivered', 'Received');

-- CreateEnum
CREATE TYPE "FriendStatus" AS ENUM ('Pending', 'NotFriends', 'Friends');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "friendTag" INTEGER NOT NULL,
    "accountStatus" "AccountStatus" NOT NULL DEFAULT 'Activated',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "userId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userAvatar" TEXT NOT NULL DEFAULT 'https://avatars.mds.yandex.net/i?id=7ed09bb7a0d83a61b5ff96ab06195c8b3bc46c09-7547952-images-thumbs&n=13',

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "chatName" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatType" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInChat" (
    "userId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "chatAlias" TEXT NOT NULL,
    "statusUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userStatus" "UserChatStatus" NOT NULL DEFAULT 'InChat',

    CONSTRAINT "UserInChat_pkey" PRIMARY KEY ("userId","chatId")
);

-- CreateTable
CREATE TABLE "Message" (
    "userId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "messageContent" TEXT NOT NULL,
    "postDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "MessageStatus" NOT NULL DEFAULT 'Sent',

    CONSTRAINT "Message_pkey" PRIMARY KEY ("userId","chatId","postDate")
);

-- CreateTable
CREATE TABLE "Friend" (
    "id" SERIAL NOT NULL,
    "userIdFK" INTEGER NOT NULL,
    "friendIdFK" INTEGER NOT NULL,
    "status" "FriendStatus" NOT NULL DEFAULT 'NotFriends',
    "friendAlias" TEXT NOT NULL,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "User_friendTag_key" ON "User"("friendTag");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInChat" ADD CONSTRAINT "UserInChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInChat" ADD CONSTRAINT "UserInChat_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userIdFK_fkey" FOREIGN KEY ("userIdFK") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendIdFK_fkey" FOREIGN KEY ("friendIdFK") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
