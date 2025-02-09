import { ScrollView, Text } from 'react-native';

import Collapse from '@/components/Collapse';
import { Blanckspace } from '@/components/Separator';
import { TaskList } from '@/components/Task';
import { useTaskStore } from '@/lib/store';

export default function Important() {
    const { tasks } = useTaskStore();

    return (
        <ScrollView
            className="flex-1"
            contentContainerClassName="gap-2 p-4"
        >
            <TaskList tasks={tasks.filter(task => task.status !== "completed" && task.isImportant)} />
            <Collapse className="gap-2" titleClassName="text-indigo-500 font-bold text-xl" title="Completed">
                {
                    tasks.filter(task => task.status === "completed" && task.isImportant).length > 0 ?
                        <TaskList tasks={tasks.filter(task => task.status === "completed" && task.isImportant)} /> :
                        <Text className="text-lg text-gray-500">No completed tasks</Text>
                }
            </Collapse>
            <Blanckspace space={80} />
        </ScrollView>
    );
}
