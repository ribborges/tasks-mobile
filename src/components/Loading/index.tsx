import { View, Animated, Image, Easing, StatusBar, useColorScheme } from 'react-native';
import { useEffect, useRef } from 'react';

import { ArrowRepeat } from '@/components/Icons';

export default function Loading() {
    const colorScheme = useColorScheme();
    const rotateValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Rotate animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(rotateValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.linear
                })
            ])
        ).start();
    }, [rotateValue]);

    return (
        <View className="
            flex-1 justify-center items-center gap-5
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
            <Animated.View className="
                p-1
                bg-zinc-200 dark:bg-zinc-900
                border border-solid rounded-full
                border-zinc-300 dark:border-zinc-800
            " style={{
                    transform: [{
                        rotate: rotateValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg'],
                        })
                    }]
                }}>
                <ArrowRepeat color="#71717a" size={32} />
            </Animated.View>
        </View>
    );
}