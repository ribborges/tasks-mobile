import { useColorScheme } from "react-native";
import { Tabs } from "expo-router";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";

import TabBar from "@/components/TabBar";
import Header from "@/components/Header";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                header: ({ navigation, route, options }) => {
                    return (
                        <Header />
                    );
                },
                sceneStyle: {
                    backgroundColor: colorScheme === 'light' ? 'white' : 'black',
                }
            }}
            tabBar={props => <TabBar {...props} />}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: () => (
                        <FontAwesome6 name={'house'} size={18} />
                    )
                }}
            />
            <Tabs.Screen
                name="a"
                options={{
                    title: 'Calendar',
                    tabBarIcon: () => (
                        <FontAwesome6 name={'calendar-day'} size={18} />
                    )
                }}
            />
            <Tabs.Screen
                name="b"
                options={{
                    title: 'Add',
                    tabBarIcon: () => (
                        <FontAwesome6 name={'plus'} size={18} />
                    )
                }}
            />
            <Tabs.Screen
                name="c"
                options={{
                    title: 'Important',
                    tabBarIcon: () => (
                        <FontAwesome name={'star'} size={18} />
                    )
                }}
            />
            <Tabs.Screen
                name="d"
                options={{
                    title: 'Categories',
                    tabBarIcon: () => (
                        <FontAwesome6 name={'layer-group'} size={18} />
                    )
                }}
            />
        </Tabs>
    )
}