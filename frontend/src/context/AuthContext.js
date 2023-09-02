import React, {createContext, useEffect, useState} from "react";
import {removeUserSession, retrieveUserSession, storeUserSession} from "./sessionFunction";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);

    const setProfileData = async (data) => {
        try {
            await storeUserSession('userProfile', data)
        } catch (error) {
            return  error;
        }
    }
    const getProfileData = async () => {
        try {
            return await retrieveUserSession('userProfile')
        } catch (error) {
            return  error;
        }
    }
    const login = async (token) => {
        try {
            setLoading(true);
            setUserToken(token);
            storeUserSession('userToken', token).then(()=>{
                setLoading(false);
            });
        } catch (error) {
            return  error;
        }
    }
    const logout = async () => {
        try {
            setLoading(true);
            setUserToken(null);
            removeUserSession("userToken").then(()=>{
                setLoading(false);
            });
            removeUserSession("userProfile").then(()=>{
                setLoading(false);
            });
        } catch (error) {
            return error;
        }
    }
    const isLoggedIn = async () => {
        try {
            retrieveUserSession("userToken").then((userToken) => {
                if(userToken !== undefined){
                    setUserToken(userToken);
                    console.log(userToken);
                    setLoading(false);
                }else{
                    setUserToken(null)
                    setLoading(false)
                }
            });
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken, setProfileData, getProfileData}}>
            {children}
        </AuthContext.Provider>
    )
};
