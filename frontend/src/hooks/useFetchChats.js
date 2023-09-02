import {useEffect, useState} from "react";
import {getChats} from "../api/getChats/getChats";

export function useFetchChats(){
    const [chats, setChats] = useState([]);
    const [isRefreshing, setRefreshing] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getChats(0, 10).then(newChats => {
            setChats((prevState) =>
                [...prevState,...newChats]
            );
            setLoading(false);
        });
    }, []);

    async function onEndReached() {
        const newChats = await getChats(chats.length, 10)
        setChats((prevState)=>
            [...prevState,...newChats]
        )
    }

    async function onRefresh(){
        setLoading(true)
        setRefreshing(true)
        const newChats = await getChats(0, chats.length);
        setChats(newChats);
        setRefreshing(false)
        setLoading(false)
    }

    return {isLoading, chats, isRefreshing, onRefresh, onEndReached}
}