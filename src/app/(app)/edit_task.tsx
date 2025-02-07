import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';

import { Spacer } from '@/components/Separator';
import { ProfilePic, UserInfo } from '@/components/User';
import { useTaskStore, useUserStore } from '@/lib/store';
import { Button, InputDate, InputPassword, InputText } from '@/components/Input';
import { useSession } from '@/hooks/useSession';
import { UpdateUser, ChangePassword } from '@/services/user.service';
import { logoutUser } from '@/services/auth.service';
import { useLocalSearchParams } from 'expo-router';
import { TaskData } from '@/interfaces/task';

import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function EditTask() {
    const { id } = useLocalSearchParams();
    const { tasks } = useTaskStore();
    const task = tasks.find(task => task.id === id);

    const [taskData, setTaskData] = useState<TaskData>({
        categoryId: task?.categoryId,
        name: task?.name,
        description: task?.description,
        dueDate: task?.dueDate ? task.dueDate : '',
        status: task?.status,
        isImportant: task?.isImportant
    });

    const onChange = (value: string, name: string) => {
        setTaskData((prevState: any) => ({
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
            <ScrollView className="
                flex-1
                bg-zinc-100 bg-opacity-50 dark:bg-zinc-900 dark:bg-opacity-50
                border border-solid rounded-3xl
                border-zinc-200 border-opacity-50 dark:border-zinc-800 dark:border-opacity-50
            " contentContainerClassName="items-stretch p-4 gap-4">
                <View className="gap-2">
                    <InputText
                        id='name'
                        name='name'
                        value={taskData.name}
                        onChange={onChange}
                        icon={<Ionicons name="person" />}
                        label='Name'
                    />
                    <InputText
                        id='description'
                        name='description'
                        value={taskData.description}
                        onChange={onChange}
                        icon={<FontAwesome5 name="id-badge" />}
                        label='Description'
                        autoCapitalize="none"
                    />
                    <InputDate
                        id='dueDate'
                        name='dueDate'
                        value={taskData.dueDate}
                        mode="date"
                        onChange={onChange}
                        icon={<FontAwesome name="calendar" />}
                        label='Due Date'
                    />
                    <Button label='Save' />
                </View>
            </ScrollView>
        </View>
    );
}