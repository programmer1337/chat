import {StyleSheet} from "react-native";

module.exports = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: "flex-end",
    },
    header__container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerText: {
        marginLeft: 10,
        marginRight: 16,
        color: "#fff",

        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "Roboto",
    },
});
