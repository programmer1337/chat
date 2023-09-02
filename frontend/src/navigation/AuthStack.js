import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AuthorizationForm from "../components/authAndRegisterComponent/authorizationForm/AuthorizationForm";
import RegisterForm from "../components/authAndRegisterComponent/registerForm/RegisterForm";

const Stack = createNativeStackNavigator();
export default function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name={"Login"}
                component={AuthorizationForm}
                options={{
                    title: "",
                }}
            />
            <Stack.Screen
                name={"Register"}
                component={RegisterForm}
                options={{title: ""}}
            />
        </Stack.Navigator>
    )
}