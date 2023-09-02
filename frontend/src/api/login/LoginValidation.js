
export const loginValidation = (login, password, setErrors) => {
    if (!login && !password) {
        setErrors("Вы забыли про логин и пароль??")
        return true;
    }
    if (!login) {
        setErrors("Вы забыли ввести логин?")
        return true;
    }
    if (!password) {
        setErrors("Вы забыли про пароль?")
        return true;
    }
}

export const loginResponseValidation = (response, setErrors) =>{
  if (response.message) {
    setErrors(response.message)
    return true;
  } else if (response.token !== undefined) {
    setErrors("")
    return false
  }
}
