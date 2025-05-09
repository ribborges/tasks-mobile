import { TouchableOpacity, View, Text } from "react-native";
import { useRouter } from "expo-router";
import clsx from "clsx";

import { useCategoryStore, useTaskStore } from "@/lib/store";
import Collapse from "@/components/Collapse";
import { formatDate } from "@/utils/formatDate";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { RemoveTask, UpdateTask } from "@/services/task.service";
import useToast from "@/hooks/useToast";
import { Dropdown } from "../Dropdown";

interface TaskCardProps {
    taskID: string;
}

export default function TaskCard(props: TaskCardProps) {
    const { removeTask, updateTask, getTask } = useTaskStore();
    const { getCategory } = useCategoryStore();

    const router = useRouter();

    const task = getTask(props?.taskID);
    const category = getCategory(task ? task.categoryId : '');

    const { show } = useToast();

    const completeTask = () => {
        if (task) UpdateTask(task?.id, {
            status: 'completed'
        })
            .then(res => {
                if (res?.status !== 200) {
                    show({ message: `${res?.status}: ${res?.data}`, type: 'error' });
                    return;
                }

                updateTask(task.id, {
                    ...task,
                    status: 'completed'
                });
            })
            .catch(error => show({ message: `An error has occurred: ${error}`, type: 'error' }));
    }

    const setIsImportant = () => {
        if (task) UpdateTask(task?.id, {
            isImportant: !task.isImportant
        })
            .then(res => {
                if (res?.status !== 200) {
                    show({ message: `${res?.status}: ${res?.data}`, type: 'error' });
                    return;
                }

                updateTask(task.id, {
                    ...task,
                    isImportant: !task.isImportant
                });
            })
            .catch(error => show({ message: `An error has occurred: ${error}`, type: 'error' }));
    }

    const deleteTask = () => {
        if (task) RemoveTask(task.id)
            .then(res => {
                if (res?.status !== 200) {
                    show({ message: `${res?.status}: ${res?.data}`, type: 'error' });
                    return;
                }

                removeTask(task.id);
            })
            .catch(error => show({ message: `An error has occurred: ${error}`, type: 'error' }));
    };

    return (
        <View className="
            flex-row items-center gap-2 p-3
            bg-zinc-100 dark:bg-zinc-950
            border border-solid rounded-3xl
            border-zinc-200 dark:border-zinc-900
        ">
            <View className={clsx(
                "h-8 w-1 rounded-full",
                task?.status === 'completed' ? "bg-green-500" :
                    task?.status === 'in-progress' ? "bg-yellow-500" :
                        task?.status === 'pending' ? "bg-red-500" : "bg-blue-500"
            )} />
            <TouchableOpacity
                className={clsx(
                    `
                        h-6 w-6
                        flex items-center justify-center
                        border border-solid rounded-full
                        transition duration-500
                    `, task?.status === 'completed' ? "border-indigo-600 bg-indigo-600/50" : "bg-zinc-300 dark:bg-zinc-800 border-zinc-400 dark:border-zinc-700"
                )}
                onPress={completeTask}
            >
                {
                    task?.status === 'completed' &&
                    <Text className="text-black dark:text-white">
                        <FontAwesome name={'check'} size={10} />
                    </Text>
                }
            </TouchableOpacity>
            <Collapse title={task?.name ?? "Untitled Task"} showCaret={false} className="flex-1" titleClassName="font-bold text-black dark:text-white">
                {task?.categoryId && <Text className="text-sm font-semibold" style={{ color: category?.color }}>{category?.name}</Text>}
                {task?.description && <Text className="text-zinc-700 dark:text-zinc-300">{task?.description}</Text>}
                {task?.dueDate && <Text className="text-gray-500">{`Due: ${formatDate('en-US', task?.dueDate)}`}</Text>}
                <Text className="text-gray-500">{`Created: ${formatDate('en-US', task?.createdAt)}`}</Text>
            </Collapse>
            <View className="flex-row items-center gap-1">
                {
                    task?.isImportant &&
                    <View className="p-1">
                        <Text className="text-yellow-500">
                            <FontAwesome name={'star'} size={18} />
                        </Text>
                    </View>
                }
                <Dropdown align="right" items={[
                    {
                        label: task?.isImportant ? "Unmark as important" : "Mark as important",
                        icon: <FontAwesome name={'star'} size={14} />,
                        onPress: setIsImportant
                    },
                    {
                        label: "Edit task",
                        icon: <FontAwesome name="pencil-square" size={14} />,
                        onPress: () => router.navigate({ pathname: "/edit_task", params: { id: task?.id } })
                    },
                    {
                        label: "Delete task",
                        icon: <FontAwesome name="trash" size={14} />,
                        onPress: deleteTask
                    }
                ]}>
                    <Text className="text-zinc-600 dark:text-zinc-400">
                        <Entypo name="dots-three-vertical" size={20} />
                    </Text>
                </Dropdown>
            </View>
        </View>
    );
}