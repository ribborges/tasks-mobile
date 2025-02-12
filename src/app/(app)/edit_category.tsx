import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import { useCategoryStore, useUserStore } from '@/lib/store';
import { Button, InputColor, InputText } from '@/components/Input';
import useToast from '@/hooks/useToast';
import { CategoryData } from '@/interfaces/category';
import { UpdateCategory } from '@/services/category.service';

export default function EditCategory() {
    const router = useRouter();

    const { id } = useLocalSearchParams() as unknown as { id: string };
    const { user } = useUserStore();
    const { categories, updateCategory } = useCategoryStore();
    const category = categories.find(task => task.id === id);

    const [categoryData, setCategoryData] = useState<CategoryData>({
        name: category?.name ? category.name : '',
        color: category?.color ? category.color : '#999999',
    });

    const { show } = useToast();

    const onChange = (value: string | boolean, name: string) => {
        setCategoryData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async () => {
        if (user?.id) {
            await UpdateCategory(id, {
                name: categoryData.name === category?.name ? undefined : categoryData.name,
                color: categoryData.color === category?.color ? undefined : categoryData.color
            })
                .then((res) => {
                    if (!res) {
                        show({ message: 'Error updating category: no response', type: 'error' });
                        return;
                    }

                    if (res?.status !== 200) {
                        show({ message: `${res?.status}: ${res?.data}`, type: 'error' });
                        return;
                    }

                    if (category) {
                        updateCategory(id, {
                            ...category,
                            name: categoryData.name ? categoryData.name : category.name,
                            color: categoryData.color ? categoryData.color : category.color
                        });
                    } else {
                        show({ message: 'Task not found', type: 'error' });
                    }

                    router.dismiss();
                })
                .catch(error => show({ message: `An error has occurred: ${error}`, type: 'error' }));
        }
    }

    return (
        <View className="
            p-4
            flex-1
            bg-white dark:bg-black
        ">
            <ScrollView
                className="flex-1"
                contentContainerClassName="items-stretch p-4 gap-4"
            >
                <View className="gap-2">
                    <InputText
                        id='name'
                        name='name'
                        value={categoryData.name}
                        onChange={onChange}
                        icon={<Ionicons name="person" />}
                        label='Name'
                        placeholder="Category"
                    />
                    <InputColor
                        id='color'
                        name='color'
                        value={categoryData.color}
                        onChange={onChange}
                        icon={<FontAwesome5 name="palette" />}
                        label='Color'
                        placeholder="Select a color"
                    />
                    <Button
                        disabled={
                            categoryData.name === category?.name &&
                            categoryData.color === category?.color
                        }
                        onPress={handleSubmit}
                        label='Save'
                    />
                </View>
            </ScrollView>
        </View>
    );
}