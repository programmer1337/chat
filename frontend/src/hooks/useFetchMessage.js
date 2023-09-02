import {useEffect, useState} from "react";
import {getMessages} from "../api/getMessages/getMessages";

function countFrom(countRemaining, minus = 20) {
    if (countRemaining - minus < 0) {
        /*console.log("countFrom: " + 0)*/
        return 0
    } else {
        return countRemaining - minus;
    }
}

function countRemaining(count, minus = 20) {
    if (count - minus < 0) {
        /*console.log("countRemaining: " + count)*/
        return count;
    } else {
        return minus;
    }
}

export function useFetchMessage(id, messagesCount) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [countOfRemainingMessage, setCountOfRemainingMessages] = useState(messagesCount);

    useEffect(() => {
        /*console.log(countOfRemainingMessage)*/

        getMessages(id, 0, 20).then(newMessages => {
            setCountOfRemainingMessages(prevState => prevState - 20);
            setMessages((prevState) =>
                [...prevState, ...newMessages]
            );
            setLoading(false);
        })
    }, []);

    async function onEndReached() {
        /*console.log(countOfRemainingMessage)*/
        const newMessages = await getMessages(id, messagesCount - countOfRemainingMessage + 1, countRemaining(countOfRemainingMessage))
        setCountOfRemainingMessages(prevState => countFrom(prevState))
        setMessages((prevState) =>
            [...prevState, ...newMessages]
        )
    }

    return {isLoading, messages, setMessages, setCountOfRemainingMessages, onEndReached}
}
