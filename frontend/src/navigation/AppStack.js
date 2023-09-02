import {createNativeStackNavigator} from "@react-navigation/native-stack"
import ChatPage from "../components/chatSection/chatPage/ChatPage";
import {ChatCreationComponent} from "../components/chatSection/chatCreationComponent/ChatCreationComponent";
import {TabGroup} from "./MainTabGroup";

const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={TabGroup}
                options={{
                    headerShown: false,
                    statusBarColor: "#141414",
                }}
            />
            <Stack.Screen
                name="ChatPage"
                component={ChatPage}
                options={{
                    headerShown: false,
                    statusBarColor: "#141414",
                }}
            />
            <Stack.Screen
                name="ChatCreation"
                component={ChatCreationComponent}
                options={{
                    title: "Написать сообщение",
                    statusBarColor: "#141414",
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerStyle: {
                        backgroundColor: "#141414",
                    },
                }}/>
        </Stack.Navigator>
    )
}
