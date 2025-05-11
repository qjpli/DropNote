import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainLayout from './screens/(main)/_layout';
import AuthLayout from './screens/(auth)/_layout';
import OnboardingLayout from './screens/(onboarding)/_layout';
import { useSession } from './contexts/sessionContext';
import ProfileAvatarModal from './components/UI/ProfileAvatarModal';
import { Modalize } from 'react-native-modalize';
import { loadTheme } from './redux/actions/themeActions';
import { useAppDispatch } from './redux/store';

const Stack = createNativeStackNavigator();

const AppLayout = () => {
  const { session } = useSession();
  const [isInitialized, setInitialized] = useState<boolean>(false);
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => { 
    modalizeRef.current?.open();
 
    if (!isInitialized) {
      if (session?.user) {
        const avatarUrl = session.user.user_metadata?.avatar_url;
        if (!avatarUrl) {
          modalizeRef.current?.open();
        }

        setInitialized(true);
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
        <ProfileAvatarModal modalizeRef={modalizeRef} />
      </NavigationContainer>
    </>
  );
};

export default AppLayout;
