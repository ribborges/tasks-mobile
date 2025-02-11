import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import { InputText, InputPassword, Button } from "@/components/Input";
import Title from "@/components/Title";
import { useSession } from "@/hooks/useSession";
import { useUserStore } from "@/lib/store";
import { registerUser } from "@/services/auth.service";

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });
    const { signIn } = useSession();
    const { setUser, setToken } = useUserStore();

    const onChange = (value: string, name: string) => {
        setUserData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async () => {
        setIsLoading(true);

        if (!userData.name || !userData.username || !userData.email || !userData.password) {
            Alert.alert('Please fill all fields');
            return;
        }

        if (userData.password.length < 8) {
            Alert.alert('Password must have at least 8 characters');
            return;
        }

        if (!userData.email.includes('@')) {
            Alert.alert('Invalid email');
            return;
        }

        await registerUser(userData)
            .then((res) => {
                const { token, ...user } = res?.data;
                signIn(token);

                setToken(token);
                setUser(user);

                router.replace('/');
            })
            .catch((error) => {
                console.error(error);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    return (
        isLoading ?
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#71717a" />
            </View>
            :
            <>
                <Title>Sign-in to your account</Title>
                <ScrollView contentContainerClassName="items-stretch gap-2">
                    <InputText
                        id='name'
                        name='name'
                        onChange={onChange}
                        icon={<Ionicons name="person" />}
                        label='Name'
                        placeholder="Ana Silva"
                    />
                    <InputText
                        id='username'
                        name='username'
                        onChange={onChange}
                        icon={<FontAwesome5 name="id-badge" />}
                        label='Username'
                        placeholder="ana.Silva"
                        autoCapitalize="none"
                    />
                    <InputText
                        id='email'
                        name='email'
                        onChange={onChange}
                        icon={<FontAwesome name="envelope" />}
                        label='Email'
                        placeholder="ana_Silva@email.com"
                        autoCapitalize="none"
                    />
                    <InputPassword
                        id='password'
                        name='password'
                        onChange={onChange}
                        icon={<Ionicons name="key" />}
                        label='Password'
                    />
                    <Button label='Sign-up' onPress={handleSubmit} />
                </ScrollView>
            </>
    );
}