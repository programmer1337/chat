import {useState} from "react";
import {doTimeout} from "../functions/doTimeout";

export const useErrorHandler = () => {
    const [error, setError] = useState("");

    const handleError = (error) => {
        setError(error);
        doTimeout(setError);
    };

    return {
        error,
        handleError
    };
};