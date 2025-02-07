import { Image, View } from "react-native";
import { useRouter } from "expo-router";

import { UserButton } from "@/components/User";
import { useUserStore } from "@/lib/store";

export default function Header() {
    const { user } = useUserStore();

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
            <UserButton src={user?.profilePic} onPress={() => router.navigate("/profile")} />
        </View>
    );
}