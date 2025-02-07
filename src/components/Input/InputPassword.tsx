import { ReactNode, useState } from "react";
import { TextInput, Text, TouchableOpacity, KeyboardTypeOptions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import InputGroup from "./InputGroup";

interface PasswordInputProps {
    fakeInput?: boolean,
    disabled?: boolean,
    id?: string,
    name?: string,
    onChange?: (value: string, name: string) => void,
    value?: string,
    icon?: ReactNode,
    label?: string,
    keyboardType?: KeyboardTypeOptions
}

export default function InputPassword(props: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <InputGroup fakeInput={props.fakeInput} icon={props.icon} label={props.label}>
            <TextInput
                id={props.id}
                value={props.value}
                onChangeText={(text: string) => (props.onChange && props.name) && props.onChange(text, props.name)}
                placeholder="••••••••"
                autoCapitalize="none"
                placeholderTextColor={"grey"}
                className="p-4 text-zinc-950 dark:text-zinc-100 flex-1"
                cursorColor={"grey"}
                secureTextEntry={!showPassword}
                keyboardType={props.keyboardType}
            />
            <TouchableOpacity className="p-4" onPress={() => setShowPassword(!showPassword)}>
                <Text className="text-zinc-950 dark:text-zinc-100">
                    {
                        showPassword ?
                            <Ionicons name="eye" /> :
                            <Ionicons name="eye-off" />
                    }
                </Text>
            </TouchableOpacity>
        </InputGroup>
    );
}