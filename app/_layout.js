import { useCallback, useState, useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import userAuth from "../hook/userAuth";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    const [loading, setLoading] = useState(true);
    const { currentUser } = userAuth();

    const [fontsLoaded] = useFonts({
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
        DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack initialRouteName="manageUser" onlayOut={onLayoutRootView}>
            <Stack.Screen name="home" />
            <Stack.Screen name="manageUser" />
        </Stack>
    );
}

export default Layout;