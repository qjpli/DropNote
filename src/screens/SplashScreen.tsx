import React, { useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { initializeAppThunk } from '../redux/actions/appInitializerActions';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

const SplashScreenCustom = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync(); // 👈 Prevent native splash auto-hide

        await dispatch(initializeAppThunk()).unwrap();

        // 👇 When done, manually hide the splash
        await SplashScreen.hideAsync();

        // navigation.replace('Home');
      } catch (error) {
        console.error('Failed to initialize app:', error);
        await SplashScreen.hideAsync(); // Always hide splash to avoid stuck screen
      }
    };

    initApp();
  }, [dispatch]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  );
};

export default SplashScreenCustom;
