import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { clsx } from 'clsx';

import { addDays, subtractDays } from "@/utils/formatDate";

interface DateSelectorProps {
    id?: string;
    name?: string;
    label?: string;
    value?: Date;
    locale?: string;
    onChange?: (value: Date, name: string) => void
}

interface DateProps {
    year: string;
    month: string;
    day: string;
    weekday: string;
}

export default function DateSelector({ id, name, label, value = new Date(2026, 11, 30), locale = 'en-US', onChange }: DateSelectorProps) {
    const handleChange = (newValue: Date) => {
        value = newValue;

        if (onChange) {
            onChange(newValue, name || '');
        }
    };

    return (
        <View id={id} className="items-center gap-2">
            {label ? <Text className="text-sm">{label}</Text> : <></>}
            <View className="flex-row gap-2">
                <Day
                    onPress={() => handleChange(subtractDays(value, 1))}
                    date={{
                        year: subtractDays(value, 1).toLocaleDateString(locale, { year: 'numeric' }),
                        month: subtractDays(value, 1).toLocaleDateString(locale, { month: 'long' }),
                        day: subtractDays(value, 1).toLocaleDateString(locale, { day: '2-digit' }),
                        weekday: subtractDays(value, 1).toLocaleDateString(locale, { weekday: 'short' })
                    }}
                />
                <Day selected={true}
                    onPress={() => handleChange(value)}
                    date={{
                        year: value.toLocaleDateString(locale, { year: 'numeric' }),
                        month: value.toLocaleDateString(locale, { month: 'long' }),
                        day: value.toLocaleDateString(locale, { day: '2-digit' }),
                        weekday: value.toLocaleDateString(locale, { weekday: 'short' })
                    }}
                />
                <Day
                    onPress={() => handleChange(addDays(value, 1))}
                    date={{
                        year: addDays(value, 1).toLocaleDateString(locale, { year: 'numeric' }),
                        month: addDays(value, 1).toLocaleDateString(locale, { month: 'long' }),
                        day: addDays(value, 1).toLocaleDateString(locale, { day: '2-digit' }),
                        weekday: addDays(value, 1).toLocaleDateString(locale, { weekday: 'short' })
                    }}
                />
            </View>
        </View>
    );
}

function Day({ date, onPress, selected }: { date: DateProps, onPress?: () => void, selected?: boolean }) {
    return (
        <TouchableOpacity activeOpacity={0.5} className={clsx(
            `
                flex-1 items-center gap-2
                p-4
                border border-solid rounded-3xl
                transition duration-500
            `, selected ? "border-indigo-600 bg-indigo-600/50" : "border-zinc-300 dark:border-zinc-700"
        )} onPress={onPress}>
            <Text className="text-sm first-letter:uppercase text-zinc-700 dark:text-zinc-300">{date.month}</Text>
            <Text className="font-bold text-2xl text-zinc-700 dark:text-zinc-300">{date.day}</Text>
            <Text className="text-sm first-letter:uppercase text-zinc-700 dark:text-zinc-300">{date.weekday}</Text>
        </TouchableOpacity>
    );
}