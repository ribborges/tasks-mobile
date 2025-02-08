import { View } from 'react-native';

import AddTask from '@/components/Task/AddTask';
import { Toggle } from '@/components/Toggle';

export default function Add() {
    return (
        <View className="
            flex-1
            p-4
            bg-zinc-200 dark:bg-zinc-900
            border border-solid rounded-t-3xl
            border-zinc-300 dark:border-zinc-800
        ">
            <Toggle id="add" items={[
                {
                    label: "Task",
                    content: <AddTask />
                }, {
                    label: "Category",
                    content: <View />
                }
            ]} />
        </View>
    );
}