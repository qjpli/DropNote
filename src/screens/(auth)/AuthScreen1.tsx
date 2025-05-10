import React, { useEffect, useState } from 'react';
import { NavigationContainer, ParamListBase, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Button,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback, 
} from 'react-native';
import dimensions from '../../hooks/useSizing';
import CustomTextInput1 from '../../components/TextInputs/CustomTextInput1';
import Button1 from '../../components/Buttons/Button1';
import PhilippineFlagIcon from '../../assets/svgs/PhilippineFlagIcon';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { loadTheme, persistTheme, toggleAndPersistTheme } from '../../redux/actions/themeActions';
import { useAppDispatch } from '../../redux/store';
import { getThemeStyles } from '../../hooks/useThemes';


const AuthScreen1 = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dispatch = useAppDispatch();

  const isDark = useSelector((state: any) => state.theme.isDark);
  const colors = getThemeStyles(isDark);

  useEffect(() => {
    // dispatch(loadTheme());
  }, [dispatch]);

  const handleToggleTheme = () => {
    dispatch(toggleAndPersistTheme());
  };

  const handleUsernameChange = (text: string) => {
    const regex = /^[a-zA-Z0-9.]*$/;
    if (regex.test(text) && text.length <= 16) {
      setUsername(text);
    }
  };
   
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior="padding" style={[styles.mainCont, { backgroundColor: colors.background }]}>
        <View>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              {"What's your\nUsername?"}
            </Text>
            <Text style={styles.headerSubtitle}>
              Your username will be used to access your account securely.
            </Text>
          </View>
          <View style={styles.body}>
            <CustomTextInput1
              placeholder="Username"
              value={username}
              onChangeText={handleUsernameChange}
              height={dimensions.screenHeight * 0.07}
              keyboardType="default"
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
                  <Text style={{ fontFamily: 'Montserrat', color: "#808080" }}>@</Text>
                </View>
              }
            />
          </View>
        </View>
        <View style={styles.floatingBottom}>
          <Button1
            title="Continue"
            backgroundColor={colors.primary}
            textColor="white"
            isLoading={isLoading}
            onPress={
              username.trim().length > 2
                ? () => {


                    Keyboard.dismiss();
                    setLoading(true);

                    setTimeout(function () {
                      setLoading(false); 
                      navigation.navigate('AuthScreen2', { username, process: 'sign-in' });
                    }, 0); 
                  }
                : null
            }
          />
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
    margin: dimensions.screenWidth * 0.06,
  },
  floatingBottom: {
    bottom: dimensions.screenHeight * 0.035,
    paddingHorizontal: dimensions.screenWidth * 0.05,
    backgroundColor: '',
  },
});

export default AuthScreen1;

