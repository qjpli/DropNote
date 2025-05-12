import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './(tabs)/HomeScreen';
import UploadAvatarScreen from './partials/profile/UploadAvatarScreen';
import TabNavigator from './(tabs)';
import EditNoteMessage from './partials/notes/EditNoteMessage';
import { NoteTheme } from '../../types/NoteThemeType';

export type MainStackParamList = {
    TabNavigator: undefined;
    UploadAvatarScreen: undefined;
    EditNoteMessage: { theme: NoteTheme, noteMessage: string };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainLayout = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{
                    headerShown: false,
                    animation: 'fade'
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
            <Stack.Screen
                name="EditNoteMessage"
                component={EditNoteMessage}
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