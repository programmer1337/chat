import {getToken} from "../../workWithApp/getToken";
import {address, port, protocol} from "../../address";

export const getChats = async function (start, count) {
    try {
        const token = await getToken();

        const response = await fetch(`${protocol}://${address}:${port}/chats/${start}.${count}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

        const responseBody = await response.json();
        return responseBody.userChats;
    } catch (error) {
        console.log(error)
        return [];
    }
}

