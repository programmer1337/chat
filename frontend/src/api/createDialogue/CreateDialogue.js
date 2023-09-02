import {getToken} from "../../workWithApp/getToken";
import {address, port, protocol} from "../../address";

export const createDialogue = async function (userTag, setError) {
    try {
        const token = await getToken();

        const response = await fetch(`${protocol}://${address}:${port}/chats`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    friendTag: parseInt(userTag)
                })
            });

        const responseBody = await response.json();
        console.log(responseBody)
        if(responseBody.name === "PrismaClientUnknownRequestError"){
            setError("Пользователь не найден");
            return false;
        }
        if(responseBody.success === false){
            setError(responseBody.message);
            return false;
        }
        if(responseBody.success === true){
            return responseBody;
        }

    } catch (error) {
        console.log(error)
        return [];
    }
}

