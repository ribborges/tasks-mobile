import { ReactNode } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import clsx from "clsx";

interface CheckboxInputProps {
    disabled?: boolean,
    id?: string,
    name?: string,
    onChange?: (value: boolean, name: string) => void,
    value?: boolean,
    icon?: ReactNode,
    placeholder?: string,
    label?: string,
}

export default function InputCheckbox(props: CheckboxInputProps) {
    const onChange = (value: boolean, name: string) => {
        if (props.onChange) {
            props.onChange(value, name);
        }
    }

    return (
        <View className="flex-row items-center gap-2">
            <TouchableOpacity
                id={props.id}
                activeOpacity={0.5}
                onPress={() => onChange(!props.value, props.name || '')}
                className={clsx(
                    `
                        h-10 w-10
                        m-1 p-1
                        border-2 border-solid rounded-2xl
                    `, props.value ? "border-indigo-600 bg-indigo-600/50" : "border-zinc-200 dark:border-zinc-900"
                )}
            >
                {
                    props.value &&
                    <View className="flex-row flex-1 items-center justify-center">
                        <Text className="text-zinc-700 dark:text-zinc-100">
                            <FontAwesome name="check" size={12} />
                        </Text>
                    </View>
                }
            </TouchableOpacity>
            <View className="flex-row items-center gap-2">
                <View>
                    {
                        props.icon &&
                        <Text className="text-zinc-950 dark:text-zinc-100">
                            {props.icon}
                        </Text>
                    }
                </View>
                <View>
                    <Text className="text-zinc-950 dark:text-zinc-100">
                        {props.label}
                    </Text>
                </View>
            </View>
        </View>
    );
}