import { ReactNode } from "react";
import { Modal, View, TouchableOpacity, Text } from "react-native";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";
import clsx from "clsx";

interface ToastProps {
    closeBtn: () => void,
    message: string,
    type?: 'success' | 'error' | 'warning' | 'info',
    visible: boolean,
}

export default function Toast(props: ToastProps) {
    return (
        <Modal
            visible={props.visible}
            transparent={true}
            animationType="fade"
        >
            <View
                className={clsx(
                    `
                        m-6 overflow-hidden
                        flex-row justify-between items-center gap-4
                        border border-solid rounded-xl
                    `, props.type === 'success' ? 'border-green-600' :
                    props.type === 'error' ? 'border-red-600' :
                        props.type === 'warning' ? 'border-yellow-600' :
                            props.type === 'info' ? 'border-blue-600' :
                                "border-zinc-200 dark:border-zinc-800"
                )}
            >
                <BlurView
                    intensity={15}
                    experimentalBlurMethod="dimezisBlurView"
                    className="flex-1"
                >
                    <View className={clsx(
                        "flex-row justify-between items-center p-4",
                        props.type === 'success' ? 'bg-green-500/50' :
                            props.type === 'error' ? 'bg-red-500/50' :
                                props.type === 'warning' ? 'bg-yellow-500/50' :
                                    props.type === 'info' ? 'bg-blue-500/50' :
                                        "bg-zinc-100/50 dark:bg-zinc-900/50"
                    )}>
                        <Text className={
                            props.type === 'info' ? 'text-blue-300' :
                                props.type === 'success' ? 'text-green-300' :
                                    props.type === 'error' ? 'text-red-300' :
                                        props.type === 'warning' ? 'text-yellow-300' :
                                            "text-zinc-500"
                        }>
                            {props.message}
                        </Text>
                        <TouchableOpacity
                            className="h-8 w-8 items-center justify-center"
                            onPress={() => props.closeBtn()}
                        >
                            <Text className={
                                props.type === 'info' ? 'text-blue-300' :
                                    props.type === 'success' ? 'text-green-300' :
                                        props.type === 'error' ? 'text-red-300' :
                                            props.type === 'warning' ? 'text-yellow-300' :
                                                "text-zinc-500"
                            }>
                                <FontAwesome name="close" size={16} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </View>
        </Modal>
    )
}