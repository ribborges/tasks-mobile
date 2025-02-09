import { useState } from 'react';
import { View, Text } from 'react-native';

import { DateSelector } from '@/components/Input';
import { useTaskStore } from '@/lib/store';
import { TaskList } from '@/components/Task';
import Collapse from '@/components/Collapse';
import { Blanckspace } from '@/components/Separator';
import { removeTime } from '@/utils/formatDate';

export default function Calendar() {
    const [date, setDate] = useState(new Date());
    const { tasks } = useTaskStore();

    const onChange = (value: Date) => {
        setDate(value);
    }

    return (
        <View className="
            flex-1 gap-2
            p-4
            bg-zinc-200 dark:bg-zinc-900
            border border-solid rounded-t-3xl
            border-zinc-300 dark:border-zinc-800
        ">
            <DateSelector locale='en-US' onChange={onChange} value={date} />
            <TaskList tasks={tasks.filter(task => task.status !== "completed" && task.dueDate && removeTime(task.dueDate) === removeTime(date.toISOString()))} />
            <Collapse className="gap-2" titleClassName="text-indigo-500 font-bold text-xl" title="Completed">
                {
                    tasks.filter(task => task.status === "completed" && task.dueDate && removeTime(task.dueDate) === removeTime(date.toISOString())).length > 0 ?
                        <TaskList tasks={tasks.filter(task => task.status === "completed" && task.dueDate && removeTime(task.dueDate) === removeTime(date.toISOString()))} /> :
                        <Text className="text-lg text-gray-500">No completed tasks</Text>
                }
            </Collapse>
            <Blanckspace space={80} />
        </View>
    );
}
