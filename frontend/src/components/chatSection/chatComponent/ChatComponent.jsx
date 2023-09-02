import {ActivityIndicator, StyleSheet, View} from "react-native";
import SectionHeader from "../../utility/sectionHeader/SectionHeader";
import ChatMainSection from "./chatMainSection/ChatMainSection";
import globalStyle from "../../../styles/globalStyle"
import chatComponent from "./chatComponent.style"
import {useFetchChats} from "../../../hooks/useFetchChats";

function ChatComponent() {
    const {isLoading, chats, isRefreshing, onRefresh, onEndReached} = useFetchChats();

    return (
        <View style={chatComponent.pageSection}>
            <SectionHeader
                sectionName={"Chat"}
                pageName={"ChatCreation"}
                onRefresh={onRefresh}
            />
            {isLoading ? <ActivityIndicator style={globalStyle.indicator} size={"large"} color={"#d5d5d5"} />
                : <ChatMainSection
                    chatsData={chats}
                    isRefresh={isRefreshing}
                    onRefresh={onRefresh}
                    onEndReached={onEndReached}/>
            }
        </View>
    )
}

export default ChatComponent;
