import React, {useContext} from "react";

import {NavigationContainer} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";
import {ActivityIndicator, View} from "react-native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

export default function AppNavigation() {
    const {isLoading, userToken} = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size={"large"}/>
            </View>
        )
    }

    return (
        <NavigationContainer>
            {userToken !== null ?
                <AppStack/>:
                <AuthStack/>}
        </NavigationContainer>
    )
}
