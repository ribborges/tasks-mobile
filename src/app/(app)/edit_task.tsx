import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome, FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons';

import { useCategoryStore, useTaskStore, useUserStore } from '@/lib/store';
import { Button, InputCheckbox, InputDate, InputSelector, InputText, InputTextarea, OptionSelector } from '@/components/Input';
import { TaskData } from '@/interfaces/task';
import { UpdateTask } from '@/services/task.service';
import useToast from '@/hooks/useToast';

export default function EditTask() {
    const router = useRouter();

    const { id } = useLocalSearchParams() as unknown as { id: string };
    const { user } = useUserStore();
    const { tasks, updateTask } = useTaskStore();
    const { categories } = useCategoryStore();
    const task = tasks.find(task => task.id === id);

    const [taskData, setTaskData] = useState<TaskData>({
        categoryId: task?.categoryId,
        name: task?.name,
        description: task?.description,
        dueDate: task?.dueDate ? task.dueDate : '',
        status: task?.status,
        isImportant: task?.isImportant
    });

    const { show } = useToast();

    const onChange = (value: string | boolean, name: string) => {
        setTaskData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async () => {
        if (user?.id) {
            await UpdateTask(id, {
                categoryId: taskData.categoryId === task?.categoryId ? undefined : taskData.categoryId,
                name: taskData.name === task?.name ? undefined : taskData.name,
                description: taskData.description === task?.description ? undefined : taskData.description,
                dueDate: taskData.dueDate === task?.dueDate ? undefined : taskData.dueDate,
                status: taskData.status === task?.status ? undefined : taskData.status,
                isImportant: taskData.isImportant === task?.isImportant ? undefined : taskData.isImportant
            })
                .then((res) => {
                    if (!res) {
                        show({ message: 'Error updating task: no response', type: 'error' });
                        return;
                    }

                    if (res?.status !== 200) {
                        show({ message: `${res?.status}: ${res?.data}`, type: 'error' });
                        return;
                    }

                    if (task) {
                        updateTask(id, {
                            ...task,
                            categoryId: taskData.categoryId ? taskData.categoryId : task.categoryId,
                            name: taskData.name ? taskData.name : task.name,
                            description: taskData.description ? taskData.description : task.description,
                            dueDate: taskData.dueDate ? taskData.dueDate : task.dueDate,
                            status: taskData.status ? taskData.status : task.status,
                            isImportant: taskData.isImportant ? taskData.isImportant : task.isImportant
                        });
                    } else {
                        show({ message: 'Task not found', type: 'error' });
                    }

                    router.dismiss();
                })
                .catch(error => show({ message: `An error has occurred: ${error}`, type: 'error' }));
        }
    }

    return (
        <View className="
            p-4
            flex-1
            bg-white dark:bg-black
        ">
            <ScrollView
                className="flex-1"
                contentContainerClassName="items-stretch p-4 gap-4"
            >
                <View className="gap-2">
                    <InputText
                        id='name'
                        name='name'
                        value={taskData.name}
                        onChange={onChange}
                        icon={<Ionicons name="person" />}
                        label='Name'
                    />
                    <InputTextarea
                        id='description'
                        name='description'
                        value={taskData.description}
                        onChange={onChange}
                        icon={<FontAwesome5 name="id-badge" />}
                        label='Description'
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
                    <OptionSelector
                        id='categoryId'
                        name='categoryId'
                        value={taskData.categoryId}
                        onChange={onChange}
                        icon={<FontAwesome name="envelope" />}
                        label='Category'
                        options={categories.map(category => ({
                            label: category.name,
                            value: category.id,
                            children: <FontAwesome6 name={'layer-group'} size={18} color={category.color} />
                        }))}
                    />
                    <InputSelector
                        id='status'
                        name='status'
                        value={taskData.status}
                        onChange={onChange}
                        icon={<FontAwesome name="envelope" />}
                        label='Status'
                        items={[
                            { label: 'Pending', value: 'pending' },
                            { label: 'In Progress', value: 'in-progress' },
                            { label: 'Completed', value: 'completed' }
                        ]}
                    />
                    <InputCheckbox
                        id='isImportant'
                        name='isImportant'
                        value={taskData.isImportant}
                        onChange={onChange}
                        icon={<FontAwesome name="exclamation-triangle" />}
                        label='Is important'
                    />
                    <Button
                        disabled={
                            taskData.name === task?.name &&
                            taskData.description === task?.description &&
                            taskData.dueDate === task?.dueDate &&
                            taskData.categoryId === task?.categoryId &&
                            taskData.status === task?.status &&
                            taskData.isImportant === task?.isImportant
                        }
                        onPress={handleSubmit}
                        label='Save'
                    />
                </View>
            </ScrollView>
        </View>
    );
}