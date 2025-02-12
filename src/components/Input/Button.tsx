import clsx from "clsx";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
    label?: string,
    disabled?: boolean,
    id?: string,
    className?: string,
    buttonColors?: string,
    onPress?: (event: GestureResponderEvent) => void
}

export default function Button({ buttonColors = "bg-indigo-600 border-indigo-600", ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            id={props.id}
            disabled={props.disabled}
            activeOpacity={0.8}
            onPress={props.onPress}
            className={clsx(
                `
                    flex-1
                    disabled:bg-transparent
                    border border-solid
                    basis-[max-content] items-center justify-center content-center gap-2
                    p-4 m-1
                    rounded-xl
                `, buttonColors, props.className
            )}
        >
            <Text className={props.disabled ? "text-zinc-500/50" : "text-zinc-300"}>{props.label}</Text>
        </TouchableOpacity>
    );
}