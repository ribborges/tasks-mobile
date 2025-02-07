import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';

import { Spacer } from '@/components/Separator';
import { ProfilePic, UserInfo } from '@/components/User';
import { useUserStore } from '@/lib/store';
import { Button, InputPassword, InputText } from '@/components/Input';
import { useSession } from '@/hooks/useSession';
import React from 'react';

export default function Profile() {
    const [editingUser, setEditingUser] = useState(false);
    const [editingPass, setEditingPass] = useState(false);
    const { user, setUser } = useUserStore();

    const { signOut } = useSession();

    const [userData, setUserData] = useState({
        name: user?.name || '',
        username: user?.username || '',
        email: user?.email || ''
    });

    const [password, setPassword] = useState({
        password: "",
        newPassword: ""
    });

    const onChange = (value: string, name: string) => {
        setUserData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const onChangePass = (value: string, name: string) => {
        setPassword((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <View className="
            p-4
            flex-1
            bg-white dark:bg-black
        ">
            {user && (
                <View className="flex-row items-center gap-4">
                    <ProfilePic className="h-24 w-24" iconSize={32} />
                    <UserInfo size="xl" name={user?.name} username={user?.username} />
                </View>
            )}
            <Spacer space={30} />
            <ScrollView className="
                flex-1
                bg-zinc-100 bg-opacity-50 dark:bg-zinc-900 dark:bg-opacity-50
                border border-solid rounded-3xl
                border-zinc-200 border-opacity-50 dark:border-zinc-800 dark:border-opacity-50
            " contentContainerClassName="items-stretch p-4 gap-4">
                <View className="gap-2">
                    <InputText
                        fakeInput={!editingUser}
                        id='name'
                        name='name'
                        value={userData.name}
                        onChange={onChange}
                        icon={<Ionicons name="person" />}
                        label='Name'
                        placeholder="Ana Silva"
                    />
                    <InputText
                        fakeInput={!editingUser}
                        id='username'
                        name='username'
                        value={userData.username}
                        onChange={onChange}
                        icon={<FontAwesome5 name="id-badge" />}
                        label='Username'
                        placeholder="ana.Silva"
                        autoCapitalize="none"
                    />
                    <InputText
                        fakeInput={!editingUser}
                        id='email'
                        name='email'
                        value={userData.email}
                        onChange={onChange}
                        icon={<FontAwesome name="envelope" />}
                        label='Email'
                        placeholder="ana_Silva@email.com"
                        autoCapitalize="none"
                    />
                    {
                        editingUser ? (
                            <Button label='Save' />
                        ) : (
                            <Button onPress={() => setEditingUser(true)} label='Edit' />
                        )
                    }
                </View>
                <Spacer space={15} />
                <View className="gap-2">
                    {
                        editingPass ? (
                            <>
                                <InputPassword
                                    id='password'
                                    name='password'
                                    value={password.password}
                                    onChange={onChangePass}
                                    icon={<Ionicons name="key" />}
                                    label='Password'
                                />
                                <InputPassword
                                    id='newPassword'
                                    name='newPassword'
                                    value={password.newPassword}
                                    onChange={onChangePass}
                                    icon={<Ionicons name="key" />}
                                    label='New password'
                                />
                                <Button label='Change password' />
                            </>
                        ) : (
                            <Button onPress={() => setEditingPass(true)} label='Edit password' />
                        )
                    }
                </View>
                <Spacer space={15} />
                <Button onPress={() => signOut()} label='Sign Out' />
                <Button buttonColors="bg-red-600 border-red-600" label='Delete account' />
            </ScrollView>
        </View>
    );
}