import { View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";

interface ProfilePicProps {
    className?: string;
    src?: string;
    iconSize?: number;
}

export default function ProfilePic({ className, src, iconSize }: ProfilePicProps) {
    return (
        <View className={clsx(`
            items-center justify-center
            overflow-hidden
            border-2 border-solid rounded-full
            bg-zinc-300 dark:bg-zinc-800
            border-zinc-400 dark:border-zinc-700`,
            className
        )}>
            {
                src
                    ? <Image
                        source={{ uri: src }}
                        className={className}
                    /> :
                    <Text className="text-zinc-600 dark:text-zinc-400 items-center justify-center">
                        <Ionicons name="person" size={iconSize} />
                    </Text>
            }
        </View>
    );
}