import React from "react";
import {Image, Text, View} from "react-native";
import Separator from "../../utility/separator/Separator";
import chatPageHeader from "./chatPageHeader.style";

export default function ChatPageHeader({chatName, userAvatar}) {
    return (
        <View style={chatPageHeader.header}>
            <View style={chatPageHeader.header__container}>
                { userAvatar !== '' ?
                    <Image
                        style={chatPageHeader.chatAvatar}
                        source={
                            {uri: userAvatar}
                        } /> : null
                }
                <Text style={chatPageHeader.headerText}>{chatName}</Text>
            </View>
            <Separator />
        </View>
    )
}
