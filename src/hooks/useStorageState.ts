import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
    initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
    return useReducer(
        (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
        initialValue
    ) as UseStateHook<T>;
}

export async function setStorageStateAsync(key: string, value: string | null) {
    if (value === null) await SecureStore.deleteItemAsync(key);
    else await SecureStore.setItemAsync(key, value);
}

export function useStorageState(key: string): UseStateHook<string> {
    const [state, setState] = useAsyncState<string>();

    useEffect(() => {
        SecureStore.getItemAsync(key).then((value) => {
            setState(value);
        });
    }, [key]);

    const setStorageState = useCallback(
        (value: string | null) => {
            setState(value);
            setStorageStateAsync(key, value);
        },
        [key]
    );

    return [state, setStorageState];
}