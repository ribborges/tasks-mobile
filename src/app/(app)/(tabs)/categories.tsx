import React from 'react';
import { View, Text } from 'react-native';

import { useCategoryStore, useTaskStore } from '@/lib/store';
import { Filter } from '@/components/Filter';
import { FontAwesome6 } from '@expo/vector-icons';
import { TaskList } from '@/components/Task';
import Collapse from '@/components/Collapse';
import { Blanckspace } from '@/components/Separator';

export default function Categories() {
    const { tasks } = useTaskStore();
    const { categories } = useCategoryStore();

    return (
        <View className="
            flex-1
            p-4
            bg-zinc-200 dark:bg-zinc-900
            border border-solid rounded-t-3xl
            border-zinc-300 dark:border-zinc-800
        ">
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
