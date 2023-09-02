import {registerResponseValidation, registerValidation} from "./RegisterValidation";
import {address, port, protocol} from "../../address";

export const postRegisterInfo = async function (login, password, firstName, lastName, setErrors) {
  try {
    if (registerValidation(login, password, firstName, lastName, setErrors)) {
      return;
    }

    const response = await fetch(`${protocol}://${address}:${port}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
          password: password,
          firstName: firstName,
          lastName: lastName,
          userAvatar: "",
        })
      });

    const responseBody = await response.json()
    if (registerResponseValidation(responseBody, setErrors)) {
      return;
    }
    return responseBody.token;
  } catch (error) {
    console.log(error)
    return null;
  }
}
