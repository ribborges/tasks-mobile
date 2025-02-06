import { Slot } from "expo-router";
import { useColorScheme } from "react-native";
import * as SystemUI from 'expo-system-ui';

import { SessionProvider } from "@/provider/SessionProvider";

import '@/styles/global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  SystemUI.setBackgroundColorAsync(colorScheme === 'light' ? 'white' : 'black');

  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
