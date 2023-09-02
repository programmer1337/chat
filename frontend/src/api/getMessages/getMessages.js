import {getToken} from "../../workWithApp/getToken";
import {address, port, protocol} from "../../address";

export const getMessages = async function (id, start, count) {
    try {
        const token = await getToken();

        const response = await fetch(`${protocol}://${address}:${port}/chat/${id}/${start}.${count}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

        const responseBody = await response.json();
        return responseBody.messages;
    } catch (error) {
        console.log(error)
        return [];
    }
}

