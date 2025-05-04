import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AppLayout from './src/_layout';
import useFonts from './src/hooks/useFonts';

// SplashScreen.preventAutoHideAsync(); 

export default function App() {
  const fontsLoaded = useFonts();
  
  if (!fontsLoaded) {
    return null;
  }

  return <AppLayout />;
}
