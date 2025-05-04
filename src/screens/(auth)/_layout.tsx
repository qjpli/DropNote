import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './AuthScreen';

const Stack = createNativeStackNavigator();

const AuthLayout = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="AuthScreen" 
                component={AuthScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthLayout