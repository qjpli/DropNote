import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainLayout from './screens/(main)/_layout';
import AuthLayout from './screens/(auth)/_layout';
import OnboardingLayout from './screens/(onboarding)/_layout';
import { supabaseConn } from './services/db/supabaseClient';
import { getAuthSession, onAuthChange } from './services/db/authService';

const Stack = createNativeStackNavigator();

const AppLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkInitialSession = async () => {
      const { data: { session } } = await supabaseConn.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
      }
    };

    checkInitialSession();

    const { data: { subscription } } = supabaseConn.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) {
    console.log('Checking auth...');
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainLayout} />
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthLayout} />
            <Stack.Screen name="Onboarding" component={OnboardingLayout} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppLayout;