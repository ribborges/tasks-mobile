import clsx from "clsx";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
    label?: string,
    disabled?: boolean,
    id?: string,
    className?: string,
    onPress?: (event: GestureResponderEvent) => void
}

export default function Button(props: ButtonProps) {
    return (
        <TouchableOpacity
            id={props.id}
            disabled={props.disabled}
            activeOpacity={0.8}
            onPress={props.onPress}
            className="
                bg-indigo-600
                disabled:bg-transparent
                border border-solid border-indigo-600
                basis-[max-content] items-center justify-center content-center gap-2
                p-4 m-1
                rounded-xl
            "
        >
            <Text className={props.disabled ? "text-zinc-500/50" : "text-zinc-300"}>{props.label}</Text>
        </TouchableOpacity>
    );
}