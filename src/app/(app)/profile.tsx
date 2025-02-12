import React, { useState } from 'react';
import { ScrollView, View, Text, Linking } from 'react-native';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';

import { Spacer } from '@/components/Separator';
import { ProfilePic, UserInfo } from '@/components/User';
import { useUserStore } from '@/lib/store';
import { Button, InputPassword, InputText, OptionButton } from '@/components/Input';
import { useSession } from '@/hooks/useSession';
import { UpdateUser, ChangePassword, DeleteUser } from '@/services/user.service';
import { logoutUser } from '@/services/auth.service';
import useModal from '@/hooks/useModal';
import TextLink from '@/components/TextLink';

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

    const { show, hide } = useModal();

    const deleteModal = () => {
        show({
            title: 'Delete account',
            content:
                <View className="gap-4 p-6">
                    <Text className="text-center text-zinc-800 dark:text-zinc-200">Are you sure you want to delete your account?</Text>
                    <View className="flex-row">
                        <Button className="bg-red-500 border-red-500" label="Yes" onPress={handleDelete} />
                        <Button label="Cancel" onPress={hide} />
                    </View>
                </View>
        });
    }

    const aboutModal = () => {
        show({
            title: 'About',
            content:
                <View className="gap-2 px-6 pb-6">
                        <Text className="text-zinc-800 dark:text-zinc-200">A simple tasks app</Text>
                        <Text className="text-zinc-800 dark:text-zinc-200">This is a free and open source project ❤️</Text>
                        <View className="flex-row items-center gap-1">
                            <Text className="text-zinc-800 dark:text-zinc-200">Backend source:</Text>
                            <TextLink onPress={() => Linking.openURL('https://github.com/ribborges/tasks-api')}>Github</TextLink>
                        </View>
                        <View className="flex-row items-center gap-1">
                            <Text className="text-zinc-800 dark:text-zinc-200">Web App source:</Text>
                            <TextLink onPress={() => Linking.openURL('https://github.com/ribborges/tasks-web')}>Github</TextLink>
                        </View>
                        <View className="flex-row items-center gap-1">
                            <Text className="text-zinc-800 dark:text-zinc-200">Mobile App source:</Text>
                            <TextLink onPress={() => Linking.openURL('https://github.com/ribborges/tasks-mobile')}>Github</TextLink>
                        </View>
                        <View className="flex-row items-center gap-1">
                            <Text className="text-zinc-800 dark:text-zinc-200">Licensed unde:</Text>
                            <TextLink onPress={() => Linking.openURL('https://www.mozilla.org/en-US/MPL/2.0/')}>Mozilla Public License v2.0</TextLink>
                        </View>
                        <Text className="text-zinc-800 dark:text-zinc-200">v1.0.4</Text>
                </View>
        });
    }

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

    const handleDelete = async () => {
        hide();

        if (user?.id) {
            await DeleteUser(user?.id)
                .then((res) => {
                    if (!res) {
                        console.error('Error deleting user: no response');
                        return;
                    }

                    if (res?.status !== 200) {
                        console.error('Error deleting user:', res.status);
                        return;
                    }

                    logout();
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation: ', error);
                });
        }
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
            <OptionButton
                label="About"
                icon={<FontAwesome name="info" size={22} />}
                onPress={aboutModal}
            />
            <Spacer space={30} />
            <ScrollView
                className="flex-1"
                contentContainerClassName="items-stretch p-4 gap-4"
            >
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
                <Button onPress={deleteModal} buttonColors="bg-red-600 border-red-600" label='Delete account' />
            </ScrollView>
        </View>
    );
}