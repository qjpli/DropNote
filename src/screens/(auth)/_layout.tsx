import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen2 from './AuthScreen2';
import AuthScreen1 from './AuthScreen1';

export type AuthStackParamList = {
    AuthScreen1: undefined;
    AuthScreen2: { username: string, process: 'sign-in' | 'sign-up' };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthLayout = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AuthScreen1"
                component={AuthScreen1}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AuthScreen2"
                component={AuthScreen2}
                options={{
                    headerShown: false,
                    animation: 'simple_push',
                }}
            />
        </Stack.Navigator>
    );
};

export default AuthLayout;