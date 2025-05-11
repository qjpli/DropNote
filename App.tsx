import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AppLayout from './src/_layout';
import useFonts from './src/hooks/useFonts';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import React from 'react';
import ContextHandler from './src/contexts/handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// SplashScreen.preventAutoHideAsync(); 

export default function App() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ContextHandler>
        <Provider store={store}>
          <AppLayout />
        </Provider>
      </ContextHandler>
    </GestureHandlerRootView>
  );
} 
