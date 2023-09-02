import {StyleSheet} from "react-native";

module.exports = StyleSheet.create({
    chatAvatar: {
        marginLeft: 20,
        marginVertical: 4,
        borderRadius: 36,
        width: 45,
        height: 45,
    },
    header: {
        justifyContent: "flex-end",
    },
    header__container: {
        display: "flex",
        flexDirection: "row",
    },
    headerText: {
        marginLeft: 10,
        marginTop: 8,
        color: "#fff",

        fontSize: 14,
        fontWeight: "bold",
        fontFamily: "Roboto",
    },
});
