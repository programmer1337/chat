
export const registerValidation = (login, password, firstName, lastName, setErrors) => {
    if (!login && !password && !firstName && !lastName) {
        setErrors("Вы забыли ввести данные??")
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
    if (!firstName) {
        setErrors("Вы забыли про Имя?")
        return true;
    }
    if (!lastName) {
        setErrors("Вы забыли про Фамилию?")
        return true;
    }
}

export const registerResponseValidation = (responseMessage, setErrors) =>{
    if(responseMessage.errorType === "ValidationError"){
        setErrors(responseMessage.errorMessage)
        return true;
    }else if(responseMessage.errorType === "DatabaseError"){
        setErrors(responseMessage.errorMessage)
        return true;
    } else if(responseMessage.token !== undefined){
        setErrors("")
        return false;
    }
}
