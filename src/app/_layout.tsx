import { Slot } from "expo-router";

import { SessionProvider } from "@/provider/SessionProvider";

import '@/styles/global.css';

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
