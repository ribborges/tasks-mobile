import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { useCategoryStore, useTaskStore } from '@/lib/store';
import { Filter } from '@/components/Filter';
import { FontAwesome6 } from '@expo/vector-icons';
import { TaskList } from '@/components/Task';
import Collapse from '@/components/Collapse';
import { Blanckspace } from '@/components/Separator';

export default function Categories() {
    const { tasks } = useTaskStore();
    const { categories } = useCategoryStore();

    const router = useRouter();

    return (
        <View className="flex-1 p-4">
            <Filter id="add" items={[
                {
                    label: 'Uncategorized',
                    content: <>
                        <TaskList tasks={tasks.filter(task => task.status !== "completed" && !task.categoryId)} />
                        <Collapse className="gap-2" titleClassName="text-indigo-500 font-bold text-xl" title="Completed">
                            {
                                tasks.filter(task => task.status === "completed" && !task.categoryId).length > 0 ?
                                    <TaskList tasks={tasks.filter(task => task.status === "completed" && !task.categoryId)} /> :
                                    <Text className="text-lg text-gray-500">No completed tasks</Text>
                            }
                        </Collapse>
                        <Blanckspace space={80} />
                    </>
                },
                ...categories.map((category) => ({
                    label: category.name,
                    onLongPress: () => router.navigate({ pathname: "/edit_category", params: { id: category?.id } }),
                    icon: <FontAwesome6 name={'layer-group'} size={14} color={category.color} />,
                    content: <>
                        <TaskList tasks={tasks.filter(task => task.status !== "completed" && task.categoryId === category.id)} />
                        <Collapse className="gap-2" titleClassName="text-indigo-500 font-bold text-xl" title="Completed">
                            {
                                tasks.filter(task => task.status === "completed" && task.categoryId === category.id).length > 0 ?
                                    <TaskList tasks={tasks.filter(task => task.status === "completed" && task.categoryId === category.id)} /> :
                                    <Text className="text-lg text-gray-500">No completed tasks</Text>
                            }
                        </Collapse>
                        <Blanckspace space={80} />
                    </>
                }))
            ]} />
        </View>
    );
}
