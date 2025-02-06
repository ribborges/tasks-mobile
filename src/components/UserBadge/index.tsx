import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function UserBadge({ src, onPress }: { src?: string, onPress?: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} className="flex-1 items-end" activeOpacity={0.5}>
            <View className="
            items-center justify-center
            overflow-hidden
            border-2 border-solid rounded-full
            bg-zinc-300 dark:bg-zinc-800
            border-zinc-400 dark:border-zinc-700
            h-11 w-11
        ">
                {
                    src
                        ? <Image
                            source={{ uri: src }}
                            className="h-11 w-11"
                        /> :
                        <Text className="text-zinc-600 dark:text-zinc-400 items-center justify-center"><Ionicons name="person" size={16} /></Text>
                }
            </View>
        </TouchableOpacity>
    );
}