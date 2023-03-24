import { Stack } from "expo-router";

const manageUser = () => {
    return (
        <>
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
        </>
    )
}

export default manageUser