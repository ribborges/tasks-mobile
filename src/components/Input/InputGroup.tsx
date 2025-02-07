import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { clsx } from "clsx";

import Label from "./Label";

interface InputGroupProps {
    fakeInput?: boolean,
    value?: string,
    className?: string,
    icon?: ReactNode,
    label?: string,
    labelInside?: boolean,
    htmlFor?: string,
    children?: ReactNode
}

export default function InputGroup(props: InputGroupProps) {
    return (
        <View>
            {
                props.label && !props.labelInside ?
                    <Label>
                        {props.label}
                    </Label> : <></>
            }
            <View className={clsx(
                props.className || "",
                `
                m-1
                flex-row flex-nowrap items-center
                overflow-hidden
                `,
                props.fakeInput ? "" : "rounded-xl border-2 border-solid border-zinc-400 dark:border-zinc-700"
            )}>
                <View className="gap-2 items-center p-4">
                    {props.icon && <Text className="text-zinc-950 dark:text-zinc-100">{props.icon}</Text>}
                    {
                        props.label && props.labelInside ?
                            <Label>
                                {props.label}
                            </Label> : <></>
                    }
                </View>
                {
                    props.fakeInput ?
                        <View className="p-4 flex-1 flex-row items-center justify-between">
                            <Text className="text-zinc-950 dark:text-zinc-100">
                                {props.value}
                            </Text>
                        </View> :
                        props.children
                }
            </View>
        </View>
    );
}