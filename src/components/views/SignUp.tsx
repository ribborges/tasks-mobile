import React, { useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import { InputText, InputPassword, Button } from "@/components/Input";
import Title from "@/components/Title";
import { useSession } from "@/hooks/useSession";

export default function SignUp() {
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });
    const { signIn } = useSession();

    const onChange = (value: string, name: string) => {
        setUser((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
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
                <Button label='Sign-up' onPress={() => {
                    signIn();
                    // Navigate after signing in. You may want to tweak this to ensure sign-in is
                    // successful before navigating.
                    router.replace('/');
                }} />
            </ScrollView>
        </>
    );
}