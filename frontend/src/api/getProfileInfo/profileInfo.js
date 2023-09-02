import {getToken} from "../../workWithApp/getToken";
import {address, port, protocol} from "../../address";

export const getProfileInfo = async function () {
  try {
    const token = await getToken();

    const response = await fetch(`${protocol}://${address}:${port}/profile_info`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

    const responseBody = await response.json();
    if (responseBody.userProfile !== undefined) {
      return responseBody.userProfile;
    }
  } catch (error) {
    console.log(error)
    return [];
  }
}

