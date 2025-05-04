import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStartedScreen from './GetStartedScreen';

const Stack = createNativeStackNavigator();

const OnboardingLayout = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        </Stack.Navigator>
    )
}

export default OnboardingLayout

const styles = StyleSheet.create({})