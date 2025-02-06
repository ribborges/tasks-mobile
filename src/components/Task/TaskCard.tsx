import { TouchableOpacity, View, Text, useColorScheme } from "react-native";

import { StarFill, PencilSquare, TrashFill } from "../Icons";
import { useCategoryStore, useTaskStore } from "@/lib/store";
import Collapse from "@/components/Collapse";
import { formatDate } from "@/utils/formatDate";

interface TaskCardProps {
    taskID: string;
}

export default function TaskCard(props: TaskCardProps) {
    const colorScheme = useColorScheme();

    const { removeTask, updateTask, getTask } = useTaskStore();
    const { getCategory } = useCategoryStore();

    const task = getTask(props?.taskID);
    const category = getCategory(task ? task.categoryId : '');

    return (
        <View className="flex-row items-center gap-2 p-2 rounded-xl border border-solid border-zinc-300 dark:border-zinc-800">
            <View className="h-8 w-1 bg-red-500 rounded-full" />
            <TouchableOpacity
                className="
                    h-6 w-6
                    border border-solid rounded-full
                    bg-zinc-300 dark:bg-zinc-800
                    hover:bg-zinc-400 dark:hover:bg-zinc-700
                    border-zinc-400 dark:border-zinc-700
                    transition duration-500
                "
            />
            <Collapse title={task?.name ?? "Untitled Task"} showCaret={false} className="flex-1" titleClassName="font-bold text-black dark:text-white">
                <Text className="text-sm font-semibold" style={{ color: category?.color }}>{category?.name}</Text>
                {task?.description && <Text className="text-zinc-700 dark:text-zinc-300">{task?.description}</Text>}
                {task?.dueDate && <Text className="text-gray-500">{`Due: ${formatDate('en-US', task?.dueDate)}`}</Text>}
                <Text className="text-gray-500">{`Created: ${formatDate('en-US', task?.createdAt)}`}</Text>
            </Collapse>
            <View className="flex-row items-center">
                <TouchableOpacity className="p-1">
                    {task?.isImportant ?
                        <StarFill size={16} color="gold" /> :
                        <StarFill size={16} color={colorScheme === 'light' ? "black" : "white"} />
                    }
                </TouchableOpacity>
                <TouchableOpacity className="p-1">
                    <PencilSquare size={16} color={colorScheme === 'light' ? "black" : "white"} />
                </TouchableOpacity>
                <TouchableOpacity className="p-1">
                    <TrashFill size={16} color={colorScheme === 'light' ? "black" : "white"} />
                </TouchableOpacity>
            </View>
        </View>
    );
}