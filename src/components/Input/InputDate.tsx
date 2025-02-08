import React, { ReactNode, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import InputGroup from "./InputGroup";

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

export default function InputDate(props: DateInputProps) {
    const [show, setShow] = useState(false);

    const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (selectedDate) {
            const dateString = selectedDate.toISOString();
            props.onChange && props.onChange(dateString, props.name || '');
        }
        setShow(false);
    }

    return (
        <>
            <InputGroup fakeInput={props.fakeInput} value={props.value} icon={props.icon} label={props.label}>
                <TouchableOpacity activeOpacity={0.5} className="p-4 flex-1" onPress={() => setShow(true)}>
                    {
                        props.value ?
                            <Text className="text-zinc-950 dark:text-zinc-100">
                                {
                                    new Date(props.value).toLocaleDateString() +
                                    (props.mode === "datetime" || props.mode === "time" ?
                                        ' ' + new Date(props.value).toLocaleTimeString() :
                                        ''
                                    )
                                }
                            </Text> :
                            <Text style={{ color: "grey" }}>
                                {props.placeholder}
                            </Text>
                    }
                </TouchableOpacity>
            </InputGroup>
            {
                show && (
                    <DateTimePicker
                        id={props.id}
                        value={new Date(props.value || Date.now())}
                        onChange={onChangeDate}
                        mode={props.mode}
                    />
                )
            }
        </>
    );
}