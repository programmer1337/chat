import {Pressable, TextInput, View, Text} from "react-native";
import Separator from "../../utility/separator/Separator";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import {createDialogue} from "../../../api/createDialogue/CreateDialogue";
import ErrorComponent from "../../utility/errorComponent/ErrorComponent";
import {useErrorHandler} from "../../../hooks/handleErrors";
import globalStyles from "../../../styles/globalStyle";
import chatCreationComponentStyle from "./chatCreationComponent.style";

export const ChatCreationComponent = ({navigation, route}) => {
    const {onRefresh} = route.params;
    const [userTag, setUserTag] = useState("");
    const {error, handleError} = useErrorHandler();

    return (
        <View style={chatCreationComponentStyle.chatCreation}>
            <Separator/>
            <Text style={chatCreationComponentStyle.containerHeader}>Создать чат с помощью тега</Text>
            <ErrorComponent error={error}/>
            <View style={chatCreationComponentStyle.finderContainer}>
                <TextInput
                    style={globalStyles.input}
                    placeholder={"Введите тег человека"}
                    value={userTag}
                    keyboardType={"numeric"}
                    onChangeText={text => setUserTag(text)}
                    placeholderTextColor={globalStyles.placeHolderTextColor.color}
                >
                </TextInput>
                <Pressable
                    style={chatCreationComponentStyle.startChatButton}
                    onPress={async () => {
                        const response = await createDialogue(userTag, handleError);

                        if(response!==false) {
                            navigation.navigate("ChatPage", {
                                chatId: response.chat.id,
                                chatName: response.secondUser.userProfile.firstName + response.secondUser.userProfile.lastName,
                                userAvatar: response.secondUser.userProfile.userAvatar,
                                messagesCount: 0,
                                onRefresh: onRefresh,
                            });
                        }
                    }}
                >
                    <Ionicons name="send" size={28} color="white"/>
                </Pressable>
            </View>
            <Separator/>
            {/*<FriendsList/>*/}
        </View>
    )
}

