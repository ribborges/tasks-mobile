import { View, Image, StatusBar, useColorScheme, ActivityIndicator } from 'react-native';

export default function Loading() {
    const colorScheme = useColorScheme();

    return (
        <View className="
            flex-1 justify-center items-center gap-10
            bg-white dark:bg-black
        ">
            <StatusBar
                barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
                backgroundColor={colorScheme === 'light' ? 'white' : 'black'}
            />
            <Image
                source={require('#/images/icon.png')}
                className="w-24 h-24"
            />
            <ActivityIndicator size="large" color="#71717a" />
        </View>
    );
}