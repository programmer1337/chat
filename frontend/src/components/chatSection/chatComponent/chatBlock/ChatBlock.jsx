import React from "react";
import {Image, Text, View} from "react-native";
import chatBlockStyle from "chatBlock.style"

function ChatBlock({chatName, lastMessage, lastMessageBy, userAvatar}) {
    return (
        <View style={chatBlockStyle.chatBlock}>
            {userAvatar !== '' ?
                <Image
                    style={chatBlockStyle.chatAvatar}
                    source={
                        {uri: userAvatar}
                    }/> : null}
            <View>
                <Text style={chatBlockStyle.userName}>{chatName}</Text>
                <View style={{display: "flex", flexDirection: "row"}}>
                    {lastMessageBy === "you" ?
                        <Text style={{color: "rgba(96,96,96,0.78)"}}>{"Вы: "}</Text> : ""
                    }
                    <Text style={chatBlockStyle.lastMessage}>{lastMessage}</Text>
                </View>
            </View>
        </View>
    )
}

export default ChatBlock;
