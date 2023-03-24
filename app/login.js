import { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Stack, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from 'firebase/auth';

import { COLORS } from '../constants';
import { auth } from '../firebase/config';
import { emailValidator, passwordValidator } from '../utils';
import styles from '../styles/login';

const login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onFooterLinkPress = () => {
        router.push(`/signup`);
    }

    const onLoginPress = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password,);
            const user = userCredential.user;
            setLoading(false);
            router.push('/home');
        } catch (error) {
            setLoading(false);
            alert(error);
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
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => onLoginPress()}>
                                <Text style={styles.buttonTitle}>Log in</Text>
                            </TouchableOpacity>
                            <View style={styles.footerView}>
                                <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                )
            }

        </SafeAreaView>
    )
}

export default login;