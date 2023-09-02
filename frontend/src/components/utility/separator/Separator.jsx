import React from "react";
import {Text, View, StyleSheet} from "react-native";

function Separator() {
    return (
        <View style={styles.separator}></View>
    )
}
const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: "#424242",
        marginHorizontal: 12,
    }
})
export default Separator;
