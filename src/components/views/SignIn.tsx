import React, { useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import { InputText, InputPassword, Button } from "@/components/Input";
import Title from "@/components/Title";
import { useSession } from "@/hooks/useSession";

export default function SignIn() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const { signIn } = useSession();

    const onChange = (value: string, name: string) => {
        setCredentials((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
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
                <Button label='Sign-in' onPress={() => {
                    signIn();
                    // Navigate after signing in. You may want to tweak this to ensure sign-in is
                    // successful before navigating.
                    router.replace('/');
                }} />
            </ScrollView>
        </>
    );
}