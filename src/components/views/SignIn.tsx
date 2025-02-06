import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import { InputText, InputPassword, Button } from "@/components/Input";
import Title from "@/components/Title";
import { useSession } from "@/hooks/useSession";
import { LoginData } from "@/interfaces/auth";
import { useUserStore } from "@/lib/store";
import { loginUser } from "@/services/auth.service";

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [credentials, setCredentials] = useState<LoginData>({
        username: '',
        password: '',
    });
    const { signIn } = useSession();
    const { setUser, setToken } = useUserStore();

    const onChange = (value: string, name: string) => {
        setCredentials((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async () => {
        console.log('credentials', credentials);
        setIsLoading(true);

        if (!credentials.username || !credentials.password) {
            Alert.alert('Please fill in all fields');
            return;
        }

        await loginUser(credentials)
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
        <>
            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#71717a" />
                </View>
            ) : (
                <>
                    <Title>Sign-in to your account</Title>
                    <ScrollView contentContainerClassName="items-stretch gap-2">
                        <InputText
                            id='username'
                            name='username'
                            onChange={onChange}
                            icon={<FontAwesome5 name="id-badge" />}
                            label='Username'
                            placeholder="ana.Silva"
                            autoCapitalize="none"
                        />
                        <InputPassword
                            id='password'
                            name='password'
                            onChange={onChange}
                            icon={<Ionicons name="key" />}
                            label='Password'
                        />
                        <Button label='Sign-in' onPress={handleSubmit} />
                    </ScrollView>
                </>
            )}
        </>
    );
}