import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainLayout from './screens/(main)/_layout';
import AuthLayout from './screens/(auth)/_layout';
import OnboardingLayout from './screens/(onboarding)/_layout';
import { useSession } from './contexts/sessionContext';
import ProfileAvatarModal from './components/UI/ProfileAvatarModal';
import { Modalize } from 'react-native-modalize';
import { useAppDispatch } from './redux/store';
import { initializeAppThunk } from './redux/actions/appInitializerActions';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

const AppLayout = () => {
  const { session } = useSession();
  const [isAppReady, setAppReady] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    const initApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        await dispatch(initializeAppThunk()).unwrap();

        setAppReady(true);

        await SplashScreen.hideAsync();

        console.log('Done Loading');
      } catch (error) {
        console.error('App initialization failed:', error);
        await SplashScreen.hideAsync();
      }
    };

    initApp();
  }, [dispatch]);

  if (!isAppReady) {
    return null; 
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {session?.user ? (
            <Stack.Screen name="Main" component={MainLayout} />
          ) : (
            <>
              <Stack.Screen name="Auth" component={AuthLayout} />
              <Stack.Screen name="Onboarding" component={OnboardingLayout} />
            </>
          )}
        </Stack.Navigator>
        <ProfileAvatarModal modalizeRef={modalizeRef} />
      </NavigationContainer>
    </>
  );
};

export default AppLayout;
