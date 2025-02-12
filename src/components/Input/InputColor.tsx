import React, { ReactNode } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import ColorPicker, { HueSlider, Panel1, Preview } from "reanimated-color-picker";
import { useSharedValue } from "react-native-reanimated";

import useModal from "@/hooks/useModal";
import InputGroup from "./InputGroup";
import Button from "./Button";

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
    ;
    const color = useSharedValue(props.value);

    const onChangeColor = () => {
        props.onChange && props.onChange(color.value || '', props.name || '');
        hide();
    }

    const { show, hide } = useModal();

    const colorModal = () => {
        show({
            title: 'Select a color',
            content:
                <View className="gap-4 p-6">
                    <ColorPicker
                        style={{ gap: 10 }}
                        value={props.value}
                        onChange={(value) => color.value = value.hex}>
                        <Preview hideInitialColor={true} />
                        <Panel1 />
                        <HueSlider />
                    </ColorPicker>
                    <Button label="Ok" onPress={() => onChangeColor()} />
                </View>
        });
    }

    return (
        <>
            <InputGroup fakeInput={props.fakeInput} value={props.value} icon={props.icon} label={props.label}>
                <TouchableOpacity activeOpacity={0.5} className="flex-1 flex-row items-center" onPress={() => colorModal()}>
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
        </>
    );
}