import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    errorContainer:{
        justifyContent: "flex-end",
        marginVertical: 6,
        marginLeft: 12,
    },
    errorStyle: {
        color: "#de0000",
    },
    input: {
        borderColor: "white",
        borderWidth: 1,
        color: "white",
        height: 40,
        marginHorizontal: 12,
        marginVertical:8 ,
        padding: 10,
    },
    placeHolderTextColor: {
        color: "#bdbdbd",
    },
    loginAndRegisterButtons: {
        marginVertical: 26,
        alignItems: "center",
        minWidth: 183,
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderColor: "#fff",
        borderRadius: 3
    },
    indicator: {
        display: "flex",
        flex: 12,
    }
});

