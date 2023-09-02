import {loginResponseValidation, loginValidation} from "./LoginValidation";
import {address, port, protocol} from "../../address";

export const postLoginInfo = async function (login, password, setErrors) {
  try {
    console.log(login, password)
    if (loginValidation(login, password, setErrors)) {
      return;
    }

    const response = await fetch(`${protocol}://${address}:${port}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
          password: password,
        })
      });

    const responseBody = await response.json()
    if (loginResponseValidation(responseBody, setErrors)) {
      return;
    }
    return responseBody.token;
  } catch (error) {
    console.log("error: " + error)
    return null;
  }
}

