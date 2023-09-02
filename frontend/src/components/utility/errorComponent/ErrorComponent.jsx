import globalStyles from "../../../styles/globalStyle";
import {Text, View} from "react-native";
import React from "react";

export default function ErrorComponent({error}) {
    return (
        <View style={globalStyles.errorContainer}>
            <Text style={globalStyles.errorStyle}>
                {error !== "" ?
                    error :
                    ""
                }
            </Text>
        </View>
    )
}