import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Ionicons, FontAwesome5, FontAwesome, FontAwesome6 } from "@expo/vector-icons";

import { Button, InputCheckbox, InputDate, InputSelector, InputText, InputTextarea, OptionSelector } from "@/components/Input";
import { useCategoryStore, useTaskStore, useUserStore } from "@/lib/store";
import { TaskData } from "@/interfaces/task";
import { Blanckspace } from "@/components/Separator";
import { CreateTask } from "@/services/task.service";

export default function AddTask() {
    const { user } = useUserStore();
    const { addTask } = useTaskStore();
    const { categories } = useCategoryStore();

    const [taskData, setTaskData] = useState<TaskData>({
        categoryId: '',
        name: '',
        description: '',
        dueDate: undefined,
        status: "pending",
        isImportant: false
    });

    const onChange = (value: string | boolean, name: string) => {
        setTaskData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async () => {
        if (user?.id) {
            await CreateTask(taskData)
                .then((res) => {
                    if (!res) {
                        console.error('Error creating task: no response');
                        return;
                    }

                    if (res?.status !== 201) {
                        console.error(`${res.status}: ${res.data}`);
                        return;
                    }

                    addTask(res.data);
                    setTaskData({
                        name: '',
                        description: '',
                        dueDate: undefined,
                        categoryId: '',
                        status: 'pending',
                        isImportant: false
                    });
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation: ', error);
                });
        }
    }

    return (
        <ScrollView>
            <View className="gap-2">
                <InputText
                    id='name'
                    name='name'
                    value={taskData.name}
                    onChange={onChange}
                    icon={<Ionicons name="person" />}
                    label='Name'
                    placeholder="Do something"
                />
                <InputTextarea
                    id='description'
                    name='description'
                    value={taskData.description}
                    onChange={onChange}
                    icon={<FontAwesome5 name="id-badge" />}
                    label='Description'
                    placeholder="Description"
                />
                <InputDate
                    id='dueDate'
                    name='dueDate'
                    value={taskData.dueDate}
                    mode="date"
                    onChange={onChange}
                    icon={<FontAwesome name="calendar" />}
                    label='Due Date'
                    placeholder="00/00/0000"
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
                        !taskData.name ||
                        !taskData.categoryId ||
                        !taskData.status
                    }
                    onPress={handleSubmit}
                    label='Save'
                />
            </View>
            <Blanckspace space={100} />
        </ScrollView>
    );
}