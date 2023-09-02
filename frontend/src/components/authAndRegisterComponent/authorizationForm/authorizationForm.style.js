import {StyleSheet} from "react-native";

module.exports = StyleSheet.create({
    container: {
        backgroundColor: "#141414",
        height: "100%",
        color: "white",
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
    },
    header__text: {
        fontSize: 36,
        fontWeight: "bold",
        color: "white",
    },
    footerButtons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    button: {
        borderColor: "white",
        alignItems: "center",
        minWidth: 183,
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    text: {
        color: "#fff"
    },
})