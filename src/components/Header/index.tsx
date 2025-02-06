import { Image, View, Text } from "react-native";
import { useRouter } from "expo-router";

import UserBadge from "@/components/UserBadge";

export default function Header({ leftButton }: { leftButton?: JSX.Element }) {
    const router = useRouter();

    return (
        <View className="
            p-3
            flex-row justify-between items-center
            bg-white dark:bg-black
        ">
            <View className="flex-1" />
            <View className="flex-1 items-center justify-center">
                <Image
                    source={require('#/images/icon.png')}
                    className="w-10 h-10"
                />
            </View>
            <UserBadge onPress={() => router.navigate("/profile")} />
        </View>
    );
}