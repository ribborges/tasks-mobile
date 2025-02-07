import { useColorScheme } from 'react-native';
import { Redirect, Stack } from 'expo-router';

import { useSession } from '@/hooks/useSession';
import { Loading } from '@/components/Loading';
import useCheckUser from '@/hooks/useCheckUser';
import useLoadData from '@/hooks/UseLoadData';

export default function AppLayout() {
  const { session, isLoading } = useSession();

  const colorScheme = useColorScheme();

  const { userLoading } = useCheckUser();
  const { dataLoading } = useLoadData();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading || userLoading || dataLoading) {
    return <Loading />;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/auth" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerStyle: { backgroundColor: colorScheme === 'light' ? 'white' : 'black' },
        headerTitleStyle: { color: colorScheme === 'light' ? 'black' : 'white' },
        headerTintColor: colorScheme === 'light' ? 'black' : 'white',
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colorScheme === 'light' ? 'white' : 'black' },
        statusBarStyle: colorScheme === 'light' ? 'dark' : 'light',
        statusBarBackgroundColor: colorScheme === 'light' ? 'white' : 'black',
      }}
    >
      <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
      <Stack.Screen options={{ title: "Profile" }} name="profile" />
      <Stack.Screen options={{ title: "Edit Task" }} name="edit_task" />
    </Stack>
  );
}
