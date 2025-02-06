import { View } from "react-native";

import TaskCard from "./TaskCard";
import { Indicator } from "@/components/Loading";
import { TaskSchema } from "@/types/task";

export default function TaskList({ tasks }: { tasks: TaskSchema[] }) {
    return (
        !tasks ? <Indicator /> :
            <View className="gap-2">
                {
                    tasks.map((task, index) => (
                        <TaskCard key={index} taskID={task.id} />
                    ))
                }
            </View>
    );
}