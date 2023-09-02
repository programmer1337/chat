import React, {useContext, useState} from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View
} from "react-native";
import {AuthContext} from "../../../context/AuthContext";
import PasswordComponent from "../../utility/passwordComponent/PasswordComponent";
import ErrorComponent from "../../utility/errorComponent/ErrorComponent";
import {postRegisterInfo} from "../../../api/register/PostRegisterInfo";
import {useErrorHandler} from "../../../hooks/handleErrors";
import {getProfileInfo} from "../../../api/getProfileInfo/profileInfo";
import {useWaitingIndicator} from "../../../hooks/waitingIndicator";
import globalStyles from "../../../styles/globalStyle"
import registerFormStyle from "./registerForm.style"

//TODO Сделать лейблы для полей регистрации
export default function RegisterForm({navigation}) {
  const [loginField, setLoginField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [firstNameField, setFirstNameField] = useState('');
  const [lastNameField, setLastNameField] = useState('');

  const [userData, setUserData] = useState({
    login: "",
    password: "",
    firstName: "",
    secondName: "",
    errorHandler: "",
  })

  const {error, handleError} = useErrorHandler();
  const {login, setProfileData} = useContext(AuthContext);
  const {ready, handleWaiting} = useWaitingIndicator();

  return (
    <View style={registerFormStyle.container}>
      <View style={registerFormStyle.header}>
        <Text style={registerFormStyle.header__text}>Регистрация</Text>
      </View>
      <ErrorComponent error={error}/>
      {ready ? <ActivityIndicator style={globalStyles.indicator} size={"large"} color={"#d5d5d5"} /> :
      <View>
        <TextInput
          style={globalStyles.input}
          onChangeText={setLoginField}
          value={loginField}
          placeholder="Введите логин"
          placeholderTextColor={globalStyles.placeHolderTextColor.color}
        />
        <PasswordComponent password={passwordField} setPassword={setPasswordField}/>
        <TextInput
          style={globalStyles.input}
          onChangeText={setFirstNameField}
          value={firstNameField}
          placeholder="Введите Имя"
          placeholderTextColor={globalStyles.placeHolderTextColor.color}
        />
        <TextInput
          style={globalStyles.input}
          onChangeText={setLastNameField}
          value={lastNameField}
          placeholder="Введите Фамилию"
          placeholderTextColor={globalStyles.placeHolderTextColor.color}
        />
        <View style={registerFormStyle.footerButtons}>
          <Pressable
            style={globalStyles.loginAndRegisterButtons}
            onPress={async () => {
              const response = await postRegisterInfo(
                loginField,
                passwordField,
                firstNameField,
                lastNameField,
                handleError,
              );
              if (response) {
                login(response);
                const profileInfo = await getProfileInfo();
                setProfileData(profileInfo);
              }
              if (response === null) handleError("Неполадки в сети")
            }}>
            <Text style={registerFormStyle.text}>Зарегистрироваться</Text>
          </Pressable>
          <Pressable
            style={globalStyles.loginAndRegisterButtons}
            onPress={() => navigation.navigate("Login")}>
            <Text style={registerFormStyle.text}>Отмена</Text>
          </Pressable>
        </View>
      </View>
      }
    </View>
  );
}

