import {retrieveUserSession} from "../context/sessionFunction";

export const getProfile = async () => {
    try {
        const userProfile = await retrieveUserSession("userProfile");
        return userProfile;
    } catch (error) {
        return error;
    }
}
