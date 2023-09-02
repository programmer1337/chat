import {StyleSheet} from "react-native";

export const passwordComponentStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12
    },
    inputContainer: {
        borderColor: "white",
        borderWidth: 1,
        height: 40,
        marginVertical: 8,
    },
    passwordContainer: {
        padding: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputField: {
        padding: 10,
        width: '90%',
        color: "white",
    }
});