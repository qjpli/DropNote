import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AppLayout from './src/_layout';
import useFonts from './src/hooks/useFonts';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import React from 'react';

// SplashScreen.preventAutoHideAsync(); 

export default function App() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
}
