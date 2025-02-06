import { ReactNode } from "react";
import { StatusBar, useColorScheme, View, Image, Text } from "react-native";

interface AuthProps {
    children?: ReactNode;
}

export default function Auth(props: AuthProps) {
    const colorScheme = useColorScheme();

    return (
        <View className="flex-1 items-stretch bg-white dark:bg-black">
            <StatusBar className="bg-white dark:bg-black" barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />
            <View className="p-4 h-1/4 flex-row items-center justify-center gap-4">
                <Image
                    source={require('#/images/icon.png')}
                    style={{ width: 80, height: 80 }}
                />
                <Text className="text-4xl font-bold text-pink-500">Tasks</Text>
            </View>
            <View className="
                flex-1 items-stretch gap-4
                p-4 mx-1
                bg-zinc-100 bg-opacity-50 dark:bg-zinc-900 dark:bg-opacity-50
                border-t border-x border-solid rounded-t-[4rem]
                border-zinc-200 border-opacity-50 dark:border-zinc-800 dark:border-opacity-50
            ">
                {props.children}
            </View>
        </View>
    );
}