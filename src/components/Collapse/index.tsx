import { useState, ReactNode, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, Easing } from 'react-native';
import clsx from 'clsx';
import { Ionicons } from '@expo/vector-icons';

interface CollapseProps {
    title: string;
    showCaret?: boolean;
    className?: string;
    titleClassName?: string;
    containerClassName?: string;
    children?: ReactNode;
}

export default function Collapse({ title, showCaret = true, className, titleClassName, containerClassName, children }: CollapseProps) {
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
        <View className={className}>
            <TouchableOpacity className="flex-row gap-2" onPress={toggleCollapse} activeOpacity={0.5}>
                {showCaret &&
                    <Animated.Text
                        className={titleClassName}
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
                }
                <Text className={titleClassName}>{title}</Text>
            </TouchableOpacity>
            <View className={clsx(containerClassName, { hidden: collapsed })}>
                {children}
            </View>
        </View>
    );
};