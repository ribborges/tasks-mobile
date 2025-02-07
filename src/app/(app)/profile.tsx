import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';

import { Spacer } from '@/components/Separator';
import { ProfilePic, UserInfo } from '@/components/User';
import { useUserStore } from '@/lib/store';
import { Button, InputPassword, InputText } from '@/components/Input';
import { useSession } from '@/hooks/useSession';
import { UpdateUser, ChangePassword } from '@/services/user.service';
import { logoutUser } from '@/services/auth.service';

export default function Profile() {
    const [editingUser, setEditingUser] = useState(false);
    const [editingPass, setEditingPass] = useState(false);
    const { user, setUser } = useUserStore();

    const { signOut } = useSession();
    const { logout } = useUserStore();

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

    const handleUserSubmit = async () => {
        if (user?.id) {
            await UpdateUser(user?.id, {
                name: userData?.name === user?.name ? undefined : userData?.name,
                username: userData?.username === user?.username ? undefined : userData?.username,
                email: userData?.email === user?.email ? undefined : userData?.email
            })
                .then((res) => {
                    if (!res) {
                        console.error('Error updating user: no response');
                        return;
                    }

                    if (res?.status !== 200) {
                        console.error('Error updating user:', res.status, ":", res.data);
                        return;
                    }

                    setEditingUser(false);
                    setUser({
                        ...user,
                        name: userData?.name || user?.name,
                        username: userData?.username || user?.username,
                        email: userData?.email || user?.email
                    });
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation: ', error);
                });
        }
    }

    const handlePasswordSubmit = async () => {
        if (user?.id) {
            await ChangePassword(user?.id, password)
                .then((res) => {
                    if (!res) {
                        console.error('Error updating password: no response');
                        return;
                    }

                    if (res?.status !== 200) {
                        console.error('Error updating password:', res.status);
                        return;
                    }

                    setPassword({
                        password: "",
                        newPassword: ""
                    });
                    setEditingPass(false);
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation: ', error);
                });
        }
    }

    const handleLogout = async () => {
        logoutUser()
            .catch((error) => {
                console.error('There has been a problem with your fetch operation: ', error);
            })
            .finally(() => {
                signOut();
                logout();
            });
    }

    return (
        <View className="
            p-4
            flex-1
            bg-white dark:bg-black
        ">
            {user && (
                <View className="flex-row items-center gap-4">
                    <ProfilePic className="h-24 w-24" iconSize={32} src={user?.profilePic} />
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
                            <Button onPress={() => handleUserSubmit()} label='Save' />
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
                                <Button onPress={() => handlePasswordSubmit()} label='Change password' />
                            </>
                        ) : (
                            <Button onPress={() => setEditingPass(true)} label='Edit password' />
                        )
                    }
                </View>
                <Spacer space={15} />
                <Button onPress={() => handleLogout()} label='Sign Out' />
                <Button buttonColors="bg-red-600 border-red-600" label='Delete account' />
            </ScrollView>
        </View>
    );
}