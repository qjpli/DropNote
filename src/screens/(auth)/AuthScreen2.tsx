import React, { useEffect, useState } from 'react';
import { NavigationContainer, ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Button,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
} from 'react-native';
import dimensions from '../../hooks/useSizing';
import CustomTextInput1 from '../../components/TextInputs/CustomTextInput1';
import Button1 from '../../components/Buttons/Button1';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { loadTheme, persistTheme, toggleAndPersistTheme } from '../../redux/actions/themeActions';
import { useAppDispatch } from '../../redux/store';
import { getThemeStyles } from '../../hooks/useThemes';
import { AuthStackParamList } from './_layout';
import { ChevronLeft } from 'lucide-react-native';
import { handleLogin, handleRegister } from '../../controllers/authController';

const AuthScreen2 = () => {
  type AuthScreen2RouteProp = RouteProp<AuthStackParamList, 'AuthScreen2'>;
  const route = useRoute<AuthScreen2RouteProp>();
  const { username, process } = route.params;

  const [hasAccount, setHasAccount] = useState<boolean>(process == 'sign-in' ? true : false);

  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [animationValue] = useState(new Animated.Value(0));
  const [strengthVisible, setStrengthVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [containerAnimation] = useState(new Animated.Value(0));

  const dispatch = useAppDispatch();

  const isDark = useSelector((state: any) => state.theme.isDark);
  const colors = getThemeStyles(isDark);

  useEffect(() => {
    if (password.trim().length > 0) {
      Animated.timing(containerAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(containerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    Animated.timing(animationValue, {
      toValue: passwordStrength / 5,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [passwordStrength, password]);


  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: passwordStrength / 5,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setStrengthVisible(password.trim().length > 0);
  }, [passwordStrength, password]);

  const handleToggleTheme = () => {
    dispatch(toggleAndPersistTheme());
  };

  const handlePasswordChange = (text: string) => {
    const regex = /^[^\s]*$/;
    if (regex.test(text) && text.length <= 100) {
      setPassword(text);
      setPasswordStrength(calculatePasswordStrength(text));
    }
  };

  const calculatePasswordStrength = (password: string) => {
    const lengthCriteria = password.length >= 8;
    const numberCriteria = /\d/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const lowerCaseCriteria = /[a-z]/.test(password);
    const upperCaseCriteria = /[A-Z]/.test(password);

    let strength = 0;
    if (lengthCriteria) strength += 1;
    if (numberCriteria) strength += 1;
    if (specialCharCriteria) strength += 1;
    if (lowerCaseCriteria) strength += 1;
    if (upperCaseCriteria) strength += 1;

    return strength;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior="padding" style={[styles.mainCont, { backgroundColor: colors.background }]}>
        <View>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              {hasAccount ? "Enter your\nPassword" : "Create your\nPassword"}
            </Text>
            <Text style={styles.headerSubtitle}>
              {hasAccount
                ? "Enter your password to access your account securely."
                : "Create a secure password to protect your new account."
              }
            </Text>
          </View>
          <View style={styles.body}>
            <CustomTextInput1
              placeholder="Password"
              value={password}
              onChangeText={handlePasswordChange}
              height={dimensions.screenHeight * 0.07}
              keyboardType="default"
              secureTextEntry={true}
              backgroundColor={colors.cardBackground}
              maxLength={50}
              prefix={
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Ionicons name='key-outline' size={dimensions.screenSize * 0.0125} color="#808080" />
                </View>
              }
            />
          </View>
          {
            !hasAccount && <>
              <Animated.View
                style={{
                  overflow: 'hidden',
                  height: containerAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, dimensions.screenHeight * 0.02],
                  }),
                  opacity: containerAnimation,
                  paddingHorizontal: dimensions.screenWidth * 0.06,
                }}
              >
                <View style={styles.progressBarContainer}>
                  <Animated.View
                    style={[
                      styles.progressBar,
                      {
                        width: animationValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        }),
                        backgroundColor: passwordStrength < 3 ? 'red' : 'green',
                      },
                    ]}
                  />
                </View>
              </Animated.View>
              <View style={styles.bottom}>
                <Text style={[styles.headerSubtitle, { fontSize: dimensions.screenSize * 0.01 }]}>
                  Password must be at least 8 characters, including uppercase and lowercase letters, numbers, and symbols to create your account.
                </Text>
              </View>
            </>
          }
        </View>
        <View style={styles.floatingBottom}>
          <Button1
            title={hasAccount ? 'Sign in' : 'Create Account'}
            backgroundColor={colors.primary}
            textColor="white"
            isLoading={isLoading}
            // onPress={
            //   passwordStrength == 5
            //     ? () => {
            //       Keyboard.dismiss();
            //       setLoading(true);

            //       setTimeout(function () {
            //         setLoading(false);
            //         // handleToggleTheme();

            //         console.log(username);
            //       }, 0);
            //     }
            //     : null
            // }
            onPress={
              passwordStrength === 5
                ? async () => {
                  try {
                    Keyboard.dismiss();
                    setLoading(true);

                    if (hasAccount) {
                      const result = await handleLogin(dispatch, username, password);
                      console.log('Login success:', result);
                    } else {
                      const result = await handleRegister(dispatch, username, password);
                      console.log('Registration success:', result);
                    }

                    setLoading(false);
                  } catch (err) {
                    setLoading(false);
                    console.error('Auth error:', err);
                  }
                }
                : null
            }

          />
        </View>
        <View style={styles.floatingTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft size={dimensions.screenSize * 0.027} color="#000" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    backgroundColor: '#fff',
    height: dimensions.screenHeight,
    justifyContent: 'space-between',
    position: 'relative',
  },
  header: {
    marginTop: dimensions.screenHeight * 0.15,
    width: '100%',
    paddingHorizontal: dimensions.screenWidth * 0.06,
  },
  bottom: {
    marginTop: dimensions.screenHeight * 0.0,
    width: '100%',
    paddingHorizontal: dimensions.screenWidth * 0.06,
  },
  headerTitle: {
    fontSize: dimensions.screenSize * 0.0316,
    marginBottom: dimensions.screenHeight * 0.025,
    textAlign: 'left',
    fontFamily: 'Montserrat',
    fontWeight: '700',
    color: 'black',
  },
  headerSubtitle: {
    fontFamily: 'Montserrat',
    color: '#808080',
    lineHeight: dimensions.screenHeight * 0.026,
    fontSize: dimensions.screenSize * 0.0115,
  },
  body: {
    marginHorizontal: dimensions.screenWidth * 0.06,
    marginTop: dimensions.screenHeight * 0.02,
  },
  passwordStrengthContainer: {
    marginBottom: dimensions.screenHeight * 0.02,
    paddingHorizontal: dimensions.screenWidth * 0.06,
  },
  progressBarContainer: {
    height: dimensions.screenHeight * 0.003,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 5,
  },
  progressBar: {
    height: dimensions.screenHeight * 0.003,
    borderRadius: 5,
  },
  floatingTop: {
    position: 'absolute',
    top: dimensions.screenHeight * 0.08,
    left: dimensions.screenWidth * 0.03
  },
  floatingBottom: {
    bottom: dimensions.screenHeight * 0.035,
    paddingHorizontal: dimensions.screenWidth * 0.06,
    backgroundColor: '',
  },
});

export default AuthScreen2;
