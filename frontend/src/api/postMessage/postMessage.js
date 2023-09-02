import {getToken} from "../../workWithApp/getToken";
import {address, port, protocol} from "../../address";

export const postMessage = async function (chatId, messageContent, setErrors) {
    try {
        const token = await getToken();

        const response = await fetch(`${protocol}://${address}:${port}/chat/${chatId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    messageContent: messageContent,
                })
            });
    } catch (error) {
        console.log("error: " + error)
        return null;
    }
}

