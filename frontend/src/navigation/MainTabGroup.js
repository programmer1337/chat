import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {AntDesign, FontAwesome, FontAwesome5} from "@expo/vector-icons";
import FriendsComponent from "../components/friendsComponent/FriendsComponent";
import ChatComponent from "../components/chatSection/chatComponent/ChatComponent";
import ProfileComponent from "../components/profileComponent/ProfileComponent";
import {getChats} from "../api/getChats/getChats";
import {useEffect, useState} from "react";
import {useWaitingIndicator} from "../hooks/waitingIndicator";

const Tab = createBottomTabNavigator();

export function TabGroup() {
    return (
        <Tab.Navigator
            activeColor="#00aea2"
            inactiveColor="#95a5a6"
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                    let iconName;
                    if (route.name === "Friends") {
                        iconName = "user-friends";
                        return <FontAwesome5 name={iconName} size={size} color={color}/>
                    }
                    if (route.name === "Chat") {
                        iconName = "wechat";
                        return <FontAwesome name={iconName} size={size} color={color}/>
                    }
                    if (route.name === "Profile") {
                        iconName = "profile";
                        return <AntDesign name={iconName} size={size} color={color}/>
                    }

                },
                headerShown: false,
                tabBarActiveTintColor: "#b0b0b0",
                tabBarInactiveTintColor: "#525252",
                tabBarStyle: {
                    borderColor: "#232323",
                    backgroundColor: "#232323"
                }

            })}
        >
            <Tab.Screen name={"Friends"} component={FriendsComponent} />
            <Tab.Screen name={"Chat"} component={ChatComponent}/>
            <Tab.Screen name={"Profile"} component={ProfileComponent}/>
        </Tab.Navigator>
    )
}