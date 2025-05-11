import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainLayout from './screens/(main)/_layout';
import AuthLayout from './screens/(auth)/_layout';
import OnboardingLayout from './screens/(onboarding)/_layout';
import { useSession } from './contexts/sessionContext';
import ProfileAvatarModal from './components/UI/ProfileAvatarModal';
import { Modalize } from 'react-native-modalize';

const Stack = createNativeStackNavigator();

const AppLayout = () => {
  const { session } = useSession(); 
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    if (session?.user) {
      const avatarUrl = session.user.user_metadata?.avatar_url;
      if (!avatarUrl) {
        modalizeRef.current?.open();
      } 
    }
  }, [session]);

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
      </NavigationContainer>

      <ProfileAvatarModal modalizeRef={modalizeRef} />
    </>
  );
};

export default AppLayout;
