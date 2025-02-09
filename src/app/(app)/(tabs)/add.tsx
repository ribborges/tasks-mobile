import { View } from 'react-native';

import { Toggle } from '@/components/Toggle';
import { AddTask } from '@/components/Task';
import { AddCategory } from '@/components/Category';

export default function Add() {
    return (
        <View className="flex-1 p-4">
            <Toggle id="add" items={[
                {
                    label: "Task",
                    content: <AddTask />
                }, {
                    label: "Category",
                    content: <AddCategory />
                }
            ]} />
        </View>
    );
}