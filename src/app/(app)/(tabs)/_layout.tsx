import { useColorScheme } from "react-native";
import { Tabs } from "expo-router";

import TabBar from "@/components/TabBar";
import { HouseFill, CalendarFill, PlusLg, StarFill, CollectionFill } from "@/components/Icons";
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
                    tabBarIcon: ({ focused }) => (
                        <HouseFill size="100%" color={
                            focused ? colorScheme === 'light' ? "#3730a3" : "#6366f1" : colorScheme === 'light' ? "#3f3f46" : "#d4d4d8"
                        } />
                    )
                }}
            />
            <Tabs.Screen
                name="a"
                options={{
                    title: 'Calendar',
                    tabBarIcon: ({ focused }) => (
                        <CalendarFill size="100%" color={
                            focused ? colorScheme === 'light' ? "#3730a3" : "#6366f1" : colorScheme === 'light' ? "#3f3f46" : "#d4d4d8"
                        } />
                    )
                }}
            />
            <Tabs.Screen
                name="b"
                options={{
                    title: 'Add',
                    tabBarIcon: ({ focused }) => (
                        <PlusLg size="100%" color={
                            focused ? colorScheme === 'light' ? "#3730a3" : "#6366f1" : colorScheme === 'light' ? "#3f3f46" : "#d4d4d8"
                        } />
                    )
                }}
            />
            <Tabs.Screen
                name="c"
                options={{
                    title: 'Important',
                    tabBarIcon: ({ focused }) => (
                        <StarFill size="100%" color={
                            focused ? colorScheme === 'light' ? "#3730a3" : "#6366f1" : colorScheme === 'light' ? "#3f3f46" : "#d4d4d8"
                        } />
                    )
                }}
            />
            <Tabs.Screen
                name="d"
                options={{
                    title: 'Categories',
                    tabBarIcon: ({ focused }) => (
                        <CollectionFill size="100%" color={
                            focused ? colorScheme === 'light' ? "#3730a3" : "#6366f1" : colorScheme === 'light' ? "#3f3f46" : "#d4d4d8"
                        } />
                    )
                }}
            />
        </Tabs>
    )
}