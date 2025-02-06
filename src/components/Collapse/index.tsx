import { Ionicons } from '@expo/vector-icons';
import { useState, ReactNode, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, Easing } from 'react-native';

interface CollapseProps {
    title: string;
    children: ReactNode;
}

export default function Collapse({ title, children }: CollapseProps) {
    const [collapsed, setCollapsed] = useState(true);
    const rotateValue = useRef(new Animated.Value(0)).current;

    const toggleCollapse = () => {
        // Rotate animation
        Animated.timing(rotateValue, {
            toValue: collapsed ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.linear
        }).start();

        setCollapsed(!collapsed);
    };

    return (
        <View>
            <TouchableOpacity className="flex-row gap-2" onPress={toggleCollapse} activeOpacity={0.5}>
                <Animated.Text
                    className="text-indigo-500 font-bold text-xl"
                    style={{
                        transform: [{
                            rotate: rotateValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '90deg'],
                            })
                        }]
                    }}>
                    <Ionicons name="caret-forward" size={18} />
                </Animated.Text>
                <Text className="text-indigo-500 font-bold text-xl">{title}</Text>
            </TouchableOpacity>
            <View className={collapsed ? "hidden" : "flex"}>
                {children}
            </View>
        </View>
    );
};