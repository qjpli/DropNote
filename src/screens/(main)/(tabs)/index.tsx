// tabs/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import NotesScreen from './NotesScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    animation: 'shift'
                }}
            />
            <Tab.Screen
                name="NotesScreen"
                component={NotesScreen}
                options={{
                    headerShown: false,
                    animation: 'shift',
                    
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
