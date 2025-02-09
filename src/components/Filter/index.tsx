import { useState, ReactNode } from "react";
import { View, Text, ScrollView, TouchableOpacity, TouchableOpacityProps } from "react-native";
import clsx from "clsx";

interface toggleButtonProps {
    id?: string,
    active?: boolean,
    icon?: ReactNode,
    label: string,
    onPress: () => void
}

interface toggleContainerProps {
    id: string,
    items: Array<{
        icon?: ReactNode,
        label: string,
        content: ReactNode
    }>
}

export function FilterButton(props: toggleButtonProps) {
    return (
        <TouchableOpacity
            className={clsx(
                `
                    p-3
                    flex-row items-center gap-2
                    border border-solid rounded-full
                `,
                props.active ? "border-indigo-600 bg-indigo-600/50" : "first-line:border-zinc-200 dark:border-zinc-800"
            )}
            onPress={props.onPress}
        >
            {props.icon && <Text className="text-zinc-700 dark:text-zinc-300">{props.icon}</Text>}
            {props.label && <Text className="text-zinc-700 dark:text-zinc-300">{props.label}</Text>}
        </TouchableOpacity>
    );
}

export function Filter(props: toggleContainerProps) {
    const [active, setActive] = useState(0);

    return (
        <View className="gap-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="flex-row gap-2">
                {props.items.map((item, index) => {
                    return (
                        <FilterButton
                            key={index}
                            icon={item.icon}
                            label={item.label}
                            onPress={() => setActive(index)}
                            active={active === index}
                        />
                    )
                })}
            </ScrollView>
            <ScrollView contentContainerClassName="gap-2">
                {props.items[active].content}
            </ScrollView>
        </View>
    );
}