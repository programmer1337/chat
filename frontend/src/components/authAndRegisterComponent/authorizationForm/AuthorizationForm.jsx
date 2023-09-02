import React, {useContext, useState} from "react";
import {Pressable, Text, TextInput, View} from "react-native";
import {AuthContext} from "../../../context/AuthContext";
import {postLoginInfo} from "../../../api/login/PostLoginInfo";
import PasswordComponent from "../../utility/passwordComponent/PasswordComponent";
import ErrorComponent from "../../utility/errorComponent/ErrorComponent";
import {useErrorHandler} from "../../../hooks/handleErrors";
import {getProfileInfo} from "../../../api/getProfileInfo/profileInfo";
import globalStyles from "../../../styles/globalStyle";
import authorizationFormStyle from "./authorizationForm.style"

//TODO Сделать лейблы для полей авторизации
export default function AuthorizationForm({navigation}) {
  const [loginField, setLoginField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const {error, handleError} = useErrorHandler();
  const {login, setProfileData} = useContext(AuthContext);

  return (
    <View style={authorizationFormStyle.container}>
      <View style={authorizationFormStyle.header}>
        <Text style={authorizationFormStyle.header__text}>Авторизация</Text>
      </View>
      <ErrorComponent error={error}/>
      <TextInput
        style={globalStyles.input}
        onChangeText={setLoginField}
        value={loginField}
        placeholder="Введите логин"
        placeholderTextColor={globalStyles.placeHolderTextColor.color}
      />
      <PasswordComponent password={passwordField} setPassword={setPasswordField}/>
      <View style={authorizationFormStyle.footerButtons}>
        <Pressable
          style={globalStyles.loginAndRegisterButtons}
          onPress={async () => {
            const response = await postLoginInfo(
              loginField,
              passwordField,
              handleError,
            );
            if (response) {
              login(response);
              const profileInfo = await getProfileInfo();
              setProfileData(profileInfo);
            }
            if (response === null) {
              handleError("Неполадки в сети")
            }
          }}>
          <Text style={authorizationFormStyle.text}>Войти</Text>
        </Pressable>
        <Pressable
          style={globalStyles.loginAndRegisterButtons}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={authorizationFormStyle.text}>Регистрация</Text>
        </Pressable>
      </View>
    </View>
  );
}
