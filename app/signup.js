import { useState } from 'react';
import { Stack, useRouter } from "expo-router";
import { View, SafeAreaView, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { COLORS } from '../constants';
import { auth, db } from '../firebase/config';
import styles from '../styles/signup';

const signup = () => {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [file, setFile] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onFooterLinkPress = () => {
        router.push(`/login`);
    }

    const onRegisterPress = async () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                displayName: userName,
                email,
                // photoURL: downloadURL,
            })

            // Update later. Below is upload user image funtion:

            // const storageRef = ref(storage, `images/${Date.now() + userName}`);
            // const uploadTask = uploadBytesResumable(storageRef, file);
            // uploadTask.on((error) => {
            //     toast.error(error.message);
            // }, () => {
            //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //         // update profile
            //         await updateProfile(user, {
            //             displayName: userName,
            //             photoURL: downloadURL
            //         })

            //         // store user profile in firestore database
            //         await setDoc(doc(db, 'users', user.uid), {
            //             uid: user.uid,
            //             displayName: userName,
            //             email,
            //             photoURL: downloadURL,
            //         })
            //     })
            // })
            setLoading(false);
            router.push(`/login`);
        } catch (error) {
            alert(error)
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            >
            </Stack.Screen>
            {
                loading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                    <View style={styles.container}>
                        <KeyboardAwareScrollView
                            style={{ flex: 1, width: '100%' }}
                            keyboardShouldPersistTaps="always">
                            <Image
                                style={styles.logo}
                                source={require('../assets/firebase-icon.png')}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Full Name'
                                placeholderTextColor="#aaaaaa"
                                onChangeText={(text) => setUserName(text)}
                                value={userName}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='E-mail'
                                placeholderTextColor="#aaaaaa"
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#aaaaaa"
                                secureTextEntry
                                placeholder='Password'
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#aaaaaa"
                                secureTextEntry
                                placeholder='Confirm Password'
                                onChangeText={(text) => setConfirmPassword(text)}
                                value={confirmPassword}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => onRegisterPress()}>
                                <Text style={styles.buttonTitle}>Create account</Text>
                            </TouchableOpacity>
                            <View style={styles.footerView}>
                                <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                )
            }

        </SafeAreaView>
    )
}

export default signup