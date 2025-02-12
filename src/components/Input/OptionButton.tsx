import { ReactNode } from "react";
import { TouchableOpacity, Text } from "react-native";

interface OptionButtonProps {
    label?: string;
    icon?: ReactNode;
    onPress?: () => void;
    children?: ReactNode;
}

export default function OptionButton({ label, icon, onPress, children }: OptionButtonProps) {
    return (
        <TouchableOpacity activeOpacity={0.5} className="p-4 flex-row gap-2" onPress={onPress}>
            {
                icon ? (
                    <Text className="h-6 w-6 text-center text-zinc-700 dark:text-zinc-300">
                        {icon}
                    </Text>
                ) : null
            }
            {
                label ? (
                    <Text className="text-zinc-700 dark:text-zinc-300 font-bold text-base">{label}</Text>
                ) : null
            }
            {children}
        </TouchableOpacity>
    );
}