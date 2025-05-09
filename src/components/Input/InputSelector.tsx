import React from "react";
import { useColorScheme, View } from "react-native";
import { Picker, PickerProps, PickerItemProps } from "@react-native-picker/picker";

import InputGroup from "./InputGroup";

interface Item extends PickerItemProps {
    label: string;
    value: string | number;
}

interface SelectorProps extends PickerProps {
    id?: string;
    name?: string;
    icon?: React.ReactNode;
    label?: string;
    items: Item[];
    value?: string | number;
    onChange?: (value: string, name: string) => void,
    style?: any;
}

export default function InputSelector({ items, value, onChange, style, ...props }: SelectorProps) {
    const colorScheme = useColorScheme();

    const onItemChange = (itemValue: string | number | object, itemIndex: number) => {
        if (onChange) {
            onChange(itemValue as string, props.name || '');
        }
    }

    return (
        <InputGroup rootClassName="flex-1" icon={props.icon} label={props.label}>
            <View className="flex-1">
                <Picker
                    id={props.id}
                    selectedValue={value}
                    onValueChange={onItemChange}
                    className="text-zinc-950 dark:text-zinc-100 flex-1"
                    dropdownIconColor={colorScheme === 'dark' ? "white" : "black"}
                    itemStyle={{
                        color: colorScheme === 'dark' ? "white" : "black",
                        backgroundColor: colorScheme === 'dark' ? "#09090b" : "#f4f4f5"
                    }}
                    {...props}
                >
                    {items.map(item => (
                        <Picker.Item
                            key={item.value}
                            label={item.label}
                            value={item.value}
                            style={{
                                color: colorScheme === 'dark' ? "white" : "black",
                                backgroundColor: colorScheme === 'dark' ? "#09090b" : "#f4f4f5"
                            }}
                        />
                    ))}
                </Picker>
            </View>
        </InputGroup>
    );
}