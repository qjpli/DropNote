import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Modalize } from 'react-native-modalize';
import dimensions from '../../hooks/useSizing';
import Button1 from '../Buttons/Button1';

interface ProfileAvatarModalProps {
  modalizeRef: any;
}

const ProfileAvatarModal: React.FC<ProfileAvatarModalProps> = ({ modalizeRef }) => {
  return (
    <Modalize ref={modalizeRef} snapPoint={dimensions.screenHeight * 0.5}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Complete Your Profile
        </Text>
        <Text style={{ marginBottom: 20 }}>
          Please upload a profile picture to complete your profile.
        </Text>
        <Button1 title='Continue' onPress={() => {}} />
        <Button1 title='Skip' onPress={() => modalizeRef.current?.close()} backgroundColor='#DFDFDF' />
      </View>
    </Modalize>
  );
};

export default ProfileAvatarModal;
