import { Slot } from "expo-router";
import { useColorScheme } from "react-native";
import * as SystemUI from 'expo-system-ui';

import { SessionProvider } from "@/providers/SessionProvider";

import '@/styles/global.css';
import ModalProvider from "@/providers/ModalProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  SystemUI.setBackgroundColorAsync(colorScheme === 'light' ? 'white' : 'black');

  return (
    <SessionProvider>
      <ModalProvider>
        <Slot />
      </ModalProvider>
    </SessionProvider>
  );
}
