import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AppLayout from './src/_layout';

// SplashScreen.preventAutoHideAsync(); 

export default function App() {
  return <AppLayout />;
}
