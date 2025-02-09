import React from "react";
import { View } from "react-native";

import TaskCard from "./TaskCard";
import { Indicator } from "@/components/Loading";
import { TaskSchema } from "@/types/task";

interface TaskListProps {
    tasks: TaskSchema[];
}

export default function TaskList(props: TaskListProps) {
    return (
        !props.tasks ? <Indicator /> :
            <View className="gap-2">
                {
                    props.tasks.map((task, index) => (
                        <TaskCard key={index} taskID={task.id} />
                    ))
                }
            </View>
    );
}