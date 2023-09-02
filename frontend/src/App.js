import React from 'react';
import {StyleSheet} from 'react-native';
import AppNavigation from './navigation/Navigation.js'
import {SafeAreaProvider} from "react-native-safe-area-context";
import {AuthProvider} from "./context/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <SafeAreaProvider style={styles.container}>
                <AppNavigation/>
            </SafeAreaProvider>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#141414",
        flex: 1,
    },
});
