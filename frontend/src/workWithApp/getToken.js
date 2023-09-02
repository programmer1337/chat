import {retrieveUserSession} from "../context/sessionFunction";

export const getToken = async () => {
    try {
        return await retrieveUserSession("userToken");
    } catch (error) {
        return error;
    }
}