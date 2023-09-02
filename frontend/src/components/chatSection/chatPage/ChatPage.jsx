import {View, TextInput, Text,
  SafeAreaView, FlatList, Pressable,
  ActivityIndicator, BackHandler
} from "react-native";

import {memo, useCallback, useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import ChatPageHeader from "../сhatPageHeader/ChatPageHeader";
import {postMessage} from "../../../api/postMessage/postMessage";
import {getProfileData} from "../../../hooks/getProfileData";
import {useFetchMessage} from "../../../hooks/useFetchMessage";
import {useNavigation} from "@react-navigation/native";
import {getProfile} from "../../../workWithApp/getProfile";
import io from "socket.io-client";
import {address, port, protocol} from "../../../address";
import globalStyle from "../../../styles/globalStyle";
import chatPageStyle from "./chatPage.style";

const Message = memo(({message, sender}) => (
  <View
    style={
      sender === "companion" ? [chatPageStyle.messageContainer, chatPageStyle.companionMessage] :
        [chatPageStyle.messageContainer, chatPageStyle.myMessages]
    }>
    <Text style={chatPageStyle.message}>
      {message}
    </Text>
  </View>
))

export default function ChatPage({route}) {
  const {chatId, chatName, userAvatar, messagesCount, onRefresh} = route.params;
  const [text, setText] = useState("")

  const {isLoading, messages, setMessages, onEndReached} = useFetchMessage(chatId, messagesCount);
  const {profileData, isProfileLoading} = getProfileData();

  const navigation = useNavigation();
  const socket = io.connect(`${protocol}://${address}:${port}`)

  useEffect(async() => {
    const user = await getProfile();

    socket.emit('createChat', {
      chatId: chatId,
      userId: user.userId,
    }, [])

    socket.on('message', async (data) => {
      if (data.userId !== user.userId) {
        const newMsg = {
          chatId: data.chatId,
          messageContent: data.messageContent,
          postDate: new Date(data.postDate),
          sender: "companion",
          status: data.status,
          userId: data.userId,
        }
        console.log(newMsg)
        setMessages((prevState) =>
          [newMsg, ...prevState]
        );
      }
    }, [])

  }, []);

  useEffect(() => {
    const backAction = (() => {
      navigation.navigate('Root', {screen: 'Chat'});
      onRefresh();
      return true;
    });
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  }, [])

  const keyExtractor = useCallback(message => message.postDate.toString(), []);
  const renderItem = useCallback(({item}) => {
    return (<Message
      key={item.postDate}
      message={item.messageContent}
      sender={item.sender}
    />);
  }, []);

  return (
    <SafeAreaView style={chatPageStyle.chatPage}>
      <ChatPageHeader chatName={chatName} userAvatar={userAvatar}/>
      {isLoading ?
        <ActivityIndicator style={globalStyle.indicator} size={"large"} color={"#d5d5d5"}/>
        : <FlatList
          contentContainerStyle={chatPageStyle.list}
          data={messages}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReachedThreshold={0.1}
          onEndReached={onEndReached}
          inverted={true}
        />
      }
      <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
        <TextInput
          multiline
          textAlignVertical="top"
          style={chatPageStyle.input}
          value={text}
          onChangeText={setText}
          progressViewOffset={0.25}
          placeholder={"Напишите сообщение"}
          placeholderTextColor={globalStyle.placeHolderTextColor.color}
        >
        </TextInput>
        <Pressable onPress={async () => {
          if (text !== "") {
            const newMessage = text;
            setText("");
            setMessages((prevState) =>
              [{
                chatId: chatId,
                messageContent: newMessage,
                postDate: Date.now(),
                sender: "you",
                status: "Sent",
                userId: profileData.userId
              },
                ...prevState])
            socket.emit('sendMessage', {
              chatId: chatId,
              messageContent: newMessage,
              postDate: Date.now(),
              sender: profileData.firstName + " " + profileData.lastName,
              status: "Sent",
              userId: profileData.userId
            });
            await postMessage(chatId, newMessage)
          }
        }}>
          <Ionicons name="send" size={28} color="white"/>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
