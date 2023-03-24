import { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from '../constants';
import {
    Nearbyjobs,
    Popularjobs,
    ScreenHeaderBtn,
    Welcome,
} from "../components";
import userAuth from "../hook/userAuth";

const Home = () => {
    const { currentUser } = userAuth();
    console.log(currentUser);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const [showJobs, setShowJobs] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowJobs(true);
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (<ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />),
                    headerRight: () => (
                        // Only render the `ScreenHeaderBtn` component if the user is logged in
                        !currentUser ? (
                            <ScreenHeaderBtn
                                iconUrl={images.profile}
                                dimension="100%"
                                handlePress={() => router.push(`/login`)}
                            />
                        ) : (
                            <ScreenHeaderBtn
                                iconUrl={images.profile}
                                dimension="100%"
                                handlePress={() => { }}
                            />
                        )
                    )
                    ,
                    headerTitle: "",
                }}
            >
            </Stack.Screen>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if (searchTerm) {
                                router.push(`/search/${searchTerm}`)
                            }
                        }}
                    />
                    <Popularjobs />
                    {
                        showJobs ? <Nearbyjobs /> : <></>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;