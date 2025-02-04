import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import { clsx } from "clsx";

import { Label } from ".";

interface InputGroupProps {
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
                flex-row flex-nowrap items-center flex-1
                box-border
                rounded-xl border-2 border-solid border-zinc-400 dark:border-zinc-700
                hover:shadow-2xl focus:shadow-2xl
                hover:shadow-zinc-950/20 focus:shadow-zinc-950/20
                dark:hover:shadow-zinc-200/20 dark:focus:shadow-zinc-200/20
                overflow-hidden
                `
            )}>
                <View className="gap-2 items-center p-4 lg:p-4">
                    {props.icon && <Text className="text-zinc-950 dark:text-zinc-100">{props.icon}</Text>}
                    {
                        props.label && props.labelInside ?
                            <Label>
                                {props.label}
                            </Label> : <></>
                    }
                </View>
                {props.children}
            </View>
        </View>
    );
}