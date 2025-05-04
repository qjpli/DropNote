import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import PhilippineFlagIcon from '../../assets/svgs/PhilippineFlagIcon';
import Button1 from '../../components/Buttons/Button1';

const SignInScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setLoading] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior="padding" style={styles.mainCont}>
        <View>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {"What's your\nMobile Number?"}
            </Text>
            <Text style={styles.headerSubtitle}>
              Your mobile number will be used to access your account, receive
              important updates, and help keep your profile secure.
            </Text>
          </View>
          <View style={styles.body}>
            <CustomTextInput1
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              height={dimensions.screenHeight * 0.07}
              keyboardType="numeric"
              maxLength={11}
              prefix={
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    // backgroundColor: 'green',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: dimensions.screenWidth * 0.05,
                      height: dimensions.screenHeight * 0.07,
                      marginRight: dimensions.screenWidth * 0.02,
                    }}>
                    <PhilippineFlagIcon
                      props={{
                        width: dimensions.screenWidth * 0.05,
                        height: dimensions.screenHeight * 0.05,
                      }}
                    />
                  </View>
                  <Text style={{ fontFamily: 'Montserrat' }}>+63</Text>
                </View>
              }
            />
          </View>
        </View>
        <View style={styles.floatingBottom}>
          <Button1
            title="Continue"
            backgroundColor="#ef3a5d"
            textColor="white"
            isLoading={isLoading}
            onPress={
              phoneNumber.trim().length > 9
                ? () => {
                  setLoading(true);

                  setTimeout(function () {
                    setLoading(false);
                    // router.navigate('VerifyOTP');
                  }, 1000);
                  
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
    fontSize: dimensions.screenWidth * 0.1,
    marginBottom: 20,
    textAlign: 'left',
    fontFamily: 'Montserrat',
    fontWeight: 700,
    color: 'black',
  },
  headerSubtitle: {
    fontFamily: 'Montserrat',
    color: '#808080',
    lineHeight: dimensions.screenHeight * 0.026
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

export default SignInScreen;
