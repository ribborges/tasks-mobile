import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { Button, InputText, InputColor } from "@/components/Input";
import { useCategoryStore, useUserStore } from "@/lib/store";
import { CategoryData } from "@/interfaces/category";
import { Blanckspace } from "@/components/Separator";
import { CreateCategory } from "@/services/category.service";

export default function AddCategory() {
    const { user } = useUserStore();
    const { categories, addCategory } = useCategoryStore();

    const [categoryData, setCategoryData] = useState<CategoryData>({
        name: '',
        color: '#ff0000',
    });

    const onChange = (value: string | boolean, name: string) => {
        setCategoryData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async () => {
        if (user?.id) {
            await CreateCategory(categoryData)
                .then((res) => {
                    if (!res) {
                        console.error('Error creating category: no response');
                        return;
                    }

                    if (res?.status !== 201) {
                        console.error(`${res.status}: ${res.data}`);
                        return;
                    }

                    addCategory(res.data);
                    setCategoryData({
                        name: '',
                        color: '#999999',
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
                        !categoryData.name ||
                        !categoryData.color ||
                        categories.some((category: CategoryData) => category.name === categoryData.name)
                    }
                    onPress={handleSubmit}
                    label='Save'
                />
            </View>
            <Blanckspace space={100} />
        </ScrollView>
    );
}