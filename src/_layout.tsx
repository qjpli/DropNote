import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainLayout from './screens/(main)/_layout';
import AuthLayout from './screens/(auth)/_layout';
import OnboardingLayout from './screens/(onboarding)/_layout';

const Stack = createNativeStackNavigator();

const AppLayout = () => {
  const isAuthenticated = false;

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