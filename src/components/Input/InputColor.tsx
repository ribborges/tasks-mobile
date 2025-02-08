import React, { ReactNode, useState } from "react";
import { TouchableOpacity, Text, View, Modal } from "react-native";
import ColorPicker, { HueSlider, Panel1, Preview } from "reanimated-color-picker";
import { useSharedValue } from "react-native-reanimated";

import InputGroup from "./InputGroup";
import { BlurView } from "expo-blur";
import { Spacer } from "@/components/Separator";
import { FontAwesome } from "@expo/vector-icons";

interface DateInputProps {
    mode?: "date" | "time" | "datetime" | "countdown",
    fakeInput?: boolean,
    disabled?: boolean,
    id?: string,
    name?: string,
    onChange?: (value: string, name: string) => void,
    value?: string,
    icon?: ReactNode,
    placeholder?: string,
    label?: string
}

export default function InputColor(props: DateInputProps) {
    const [show, setShow] = useState(false);
    const color = useSharedValue(props.value);

    const onChangeColor = () => {
        props.onChange && props.onChange(color.value || '', props.name || '');
        setShow(false);
    }

    return (
        <>
            <InputGroup fakeInput={props.fakeInput} value={props.value} icon={props.icon} label={props.label}>
                <TouchableOpacity activeOpacity={0.5} className="flex-1 flex-row items-center" onPress={() => setShow(true)}>
                    {
                        props.value ?
                            <View className="p-3 flex-1 items-start" style={{ backgroundColor: props.value }}>
                                <Text className="shadow shadow-black dark:shadow-white text-zinc-950 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 p-1 rounded-full">
                                    {props.value}
                                </Text>
                            </View> :
                            <Text className="p-4 flex-1 items-start" style={{ color: "grey" }}>
                                {props.placeholder}
                            </Text>
                    }
                </TouchableOpacity>
            </InputGroup>
            {
                show && (
                    <Modal className="flex-1" visible={show} transparent={true} animationType="fade">
                        <BlurView
                            className="flex-1"
                            intensity={15}
                            experimentalBlurMethod="dimezisBlurView"
                        >
                            <View className="flex-1 flex-row items-center bg-white/50 dark:bg-black/50">
                                <View className="
                                m-6 p-8
                                flex-1 gap-4
                                bg-zinc-100 dark:bg-zinc-900
                                border border-solid rounded-xl
                                border-zinc-200 dark:border-zinc-800
                            ">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-zinc-900 dark:text-zinc-100 text-lg font-bold">
                                            Select a color
                                        </Text>
                                        <TouchableOpacity className="h-8 w-8 bg-red-500 rounded-full p-2 items-center justify-center" onPress={() => setShow(false)}>
                                            <Text className="text-zinc-900 dark:text-zinc-100">
                                                <FontAwesome name="close" />
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Spacer space={0} />
                                    <ColorPicker
                                        style={{ gap: 10 }}
                                        value={props.value}
                                        onChange={(value) => color.value = value.hex}>
                                        <Preview hideInitialColor={true} />
                                        <Panel1 />
                                        <HueSlider />
                                    </ColorPicker>
                                    <TouchableOpacity
                                        className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-xl"
                                        onPress={() => onChangeColor()}
                                    >
                                        <Text className="text-zinc-900 dark:text-zinc-100 font-bold text-center">
                                            OK
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </BlurView>
                    </Modal>
                )
            }
        </>
    );
}