import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './HomeScreen';
import UploadAvatarScreen from './partials/profile/UploadAvatarScreen';

export type MainStackParamList = {
    HomeScreen: undefined;
    UploadAvatarScreen: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainLayout = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen" 
                component={HomeScreen} 
                options={{
                    headerShown: true,
                }}
            />  
            <Stack.Screen 
                name="UploadAvatarScreen" 
                component={UploadAvatarScreen} 
                options={{
                    headerShown: false,
                    animation: 'fade'
                }}
            /> 
        </Stack.Navigator>
    )
}

export default MainLayout

const styles = StyleSheet.create({})