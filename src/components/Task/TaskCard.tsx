import { TouchableOpacity, View, Text } from "react-native";
import { useRouter } from "expo-router";
import clsx from "clsx";

import { useCategoryStore, useTaskStore } from "@/lib/store";
import Collapse from "@/components/Collapse";
import { formatDate } from "@/utils/formatDate";
import { FontAwesome } from "@expo/vector-icons";
import { RemoveTask, UpdateTask } from "@/services/task.service";

interface TaskCardProps {
    taskID: string;
}

export default function TaskCard(props: TaskCardProps) {
    const { removeTask, updateTask, getTask } = useTaskStore();
    const { getCategory } = useCategoryStore();

    const router = useRouter();

    const task = getTask(props?.taskID);
    const category = getCategory(task ? task.categoryId : '');

    const setIsImportant = () => {
        if (task) UpdateTask(task?.id, {
            isImportant: !task.isImportant
        })
            .then(res => {
                if (res?.status !== 200) {
                    console.error('Error updating task:', res);
                    return;
                }

                updateTask(task.id, {
                    ...task,
                    isImportant: !task.isImportant
                });
            })
            .catch(error => console.error('There has been a problem with your fetch operation: ', error));
    }

    const deleteTask = () => {
        if (task) RemoveTask(task.id)
            .then(res => {
                if (res?.status !== 200) {
                    console.error('Error removing task:', res);
                    return;
                }

                removeTask(task.id);
            })
            .catch(error => console.error('There has been a problem with your fetch operation: ', error));
    };

    return (
        <View className="flex-row items-center gap-2 p-2 rounded-xl border border-solid border-zinc-300 dark:border-zinc-800">
            <View className={clsx(
                "h-6 w-1 rounded-full",
                task?.status === 'completed' ? "bg-green-500" :
                    task?.status === 'in-progress' ? "bg-yellow-500" :
                        task?.status === 'pending' ? "bg-red-500" : "bg-blue-500"
            )} />
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
                {task?.categoryId && <Text className="text-sm font-semibold" style={{ color: category?.color }}>{category?.name}</Text>}
                {task?.description && <Text className="text-zinc-700 dark:text-zinc-300">{task?.description}</Text>}
                {task?.dueDate && <Text className="text-gray-500">{`Due: ${formatDate('en-US', task?.dueDate)}`}</Text>}
                <Text className="text-gray-500">{`Created: ${formatDate('en-US', task?.createdAt)}`}</Text>
            </Collapse>
            <View className="flex-row items-center gap-1">
                <TouchableOpacity onPress={setIsImportant} activeOpacity={0.5} className="p-1">
                    <Text className={task?.isImportant ? "text-yellow-500" : "text-zinc-700 dark:text-zinc-300"}>
                        <FontAwesome name={'star'} size={18} />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.navigate({ pathname: "/edit_task", params: { id: task?.id } })} activeOpacity={0.5} className="p-1">
                    <Text className="text-zinc-700 dark:text-zinc-300">
                        <FontAwesome name={'pencil-square'} size={18} />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteTask} activeOpacity={0.5} className="p-1">
                    <Text className="text-zinc-700 dark:text-zinc-300">
                        <FontAwesome name={'trash'} size={18} />
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}