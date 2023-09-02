import {FlatList, Pressable, StyleSheet, View} from "react-native";
import ChatBlock from "../chatBlock/ChatBlock";
import React, {useCallback} from "react";
import {useNavigation} from "@react-navigation/native";
import io from "socket.io-client";
import {address, port, protocol} from "../../../../address";
import chatMainSection from "./chatMainSection.style"
function RenderItem ({navigation, item, onRefresh}){
    return (
        <Pressable
            onPress={() => {
                navigation.navigate("ChatPage", {
                    chatId: item.id,
                    chatName: item.chatAlias,
                    userAvatar: item.userCompanion.userAvatar,
                    messagesCount: item.messagesCount,
                    onRefresh: onRefresh,
                })
            }}
        >
            <ChatBlock
                chatName={item.chatAlias}
                userAvatar={item.userCompanion.userAvatar}
                lastMessage={item.lastMessage === "No messages" ?
                    "" : item.lastMessage.messageContent}
                lastMessageBy={item.lastMessage.lastMessageBy}
            />
        </Pressable>
    );
}
export default function ChatMainSection({chatsData, isRefresh, onRefresh, onEndReached}) {
    const navigation = useNavigation();
    const keyExtractor = useCallback(item => item.creationDate.toString(),[]);

    return (
        <View style={chatMainSection.main}>
            <FlatList
                data={chatsData}
                keyExtractor={keyExtractor}
                onEndReachedThreshold={0.2}
                onEndReached={onEndReached}
                refreshing={isRefresh}
                onRefresh={onRefresh}
                renderItem={({ item }) =>
                  <RenderItem
                    navigation={navigation}
                    item={item}
                    onRefresh={onRefresh}
                  />}
            />
        </View>
    )
}
