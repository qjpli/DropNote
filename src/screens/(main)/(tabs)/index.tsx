// tabs/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import { View, Text } from 'react-native';
import { HomeIcon, User2Icon } from 'lucide-react-native';
import { useSelector } from 'react-redux';
import { getThemeStyles } from '../../../hooks/useThemes';
import dimensions from '../../../hooks/useSizing';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const isDark = useSelector((state: any) => state.theme.isDark);
  const colors = getThemeStyles(isDark);
  
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                animation: 'shift',
                tabBarStyle: {
                    backgroundColor: colors.background,
                    height: dimensions.screenHeight * 0.1,
                    borderTopWidth: 0,
                    elevation: 5,
                    paddingTop: dimensions.screenHeight * 0.02,
                },
                tabBarLabelStyle: {
                    fontSize: 0,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconComponent;
                    const iconSize = 28;

                    switch (route.name) {
                        case 'Home':
                            iconComponent = (
                                <HomeIcon size={iconSize} color={focused ? colors.primary : '#888'} />
                            );
                            break;
                        case 'Profile':
                            iconComponent = (
                                <User2Icon size={iconSize} color={focused ? colors.primary : '#888'} />
                            );
                            break;
                        default:
                            iconComponent = <View />;
                    }

                    return (
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: dimensions.screenWidth * 0.13 }}>
                            {iconComponent}
                            <Text
                                style={{
                                    color: focused ? colors.primary : '#888',
                                    fontWeight: focused ? 600 : 400,
                                    fontSize: dimensions.screenSize * 0.01,
                                    marginTop: 2,
                                    fontFamily: 'Montserrat'
                                }}
                            >
                                {route.name}
                            </Text>
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
