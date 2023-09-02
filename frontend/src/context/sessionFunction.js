import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeUserSession(key, value) {
    try {
        await EncryptedStorage.setItem(
            key,
            JSON.stringify({
                token : value,
            })
        );
    } catch (error) {
    }
}
export async function retrieveUserSession(key) {
    try {
        const session = await EncryptedStorage.getItem(key);
        const test = JSON.parse(session).token;

        if (session !== undefined) {
            return test;
        }
    } catch (error) {
    }
}
export async function removeUserSession(key) {
    try {
        await EncryptedStorage.removeItem(key);
    } catch (error) {
    }
}