import { Text, View } from 'react-native';

import { useSession } from '@/hooks/useSession';

export default function A() {
    const { signOut } = useSession();
    return (
        <View className="
            flex-1
            p-4
            bg-zinc-200 dark:bg-zinc-900
            border border-solid rounded-t-3xl
            border-zinc-300 dark:border-zinc-800
        ">
            <Text
                onPress={() => {
                    // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
                    signOut();
                }}>
                Sign Out
            </Text>
        </View>
    );
}
