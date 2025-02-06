import { Image, View } from "react-native";
import { useRouter } from "expo-router";

import { UserButton } from "@/components/User";

export default function Header() {
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
            <UserButton onPress={() => router.navigate("/profile")} />
        </View>
    );
}