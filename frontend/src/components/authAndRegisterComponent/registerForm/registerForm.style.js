import {StyleSheet} from "react-native";

module.exports = StyleSheet.create({
    container: {
        backgroundColor: "#141414",
        height: "100%",
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
    },
    header__text: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#fff"
    },
    footerButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    text: {
        color: "#fff"
    }
})