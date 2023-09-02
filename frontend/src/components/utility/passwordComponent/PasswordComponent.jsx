import React from 'react';
import {Pressable, TextInput, View, KeyboardAvoidingView} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useTogglePasswordVisibility} from "../../../hooks/passwordVisibility"
import globalStyles from "../../../styles/globalStyle"
import {passwordComponentStyles} from "../../../styles/passwordComponentStyle";
export default function PasswordComponent({password, setPassword}) {
    const {passwordVisibility, rightIcon, handlePasswordVisibility} =
        useTogglePasswordVisibility();

    return (
        <KeyboardAvoidingView>
            <View style={passwordComponentStyles.container}>
                <View style={[globalStyles.input, passwordComponentStyles.passwordContainer]}>
                    <TextInput
                        style={passwordComponentStyles.inputField}
                        name="password"
                        placeholder="Введите пароль"
                        placeholderTextColor={globalStyles.placeHolderTextColor.color}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={passwordVisibility}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <Pressable onPress={handlePasswordVisibility}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color={"#dcdcdc"}/>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
