import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Modalize } from 'react-native-modalize';
import dimensions from '../../hooks/useSizing';
import Button1 from '../Buttons/Button1';
import { useSelector } from 'react-redux';
import { getThemeStyles } from '../../hooks/useThemes';
import { useAppDispatch } from '../../redux/store';
import { loadTheme } from '../../redux/actions/themeActions';

// SVGS
import CompleteProfileIcon from '../../assets/svgs/avatars/CompleteProfileIcon';
import Spacer from './Spacer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';

interface ProfileAvatarModalProps {
    modalizeRef: any;
}

const ProfileAvatarModal: React.FC<ProfileAvatarModalProps> = ({ modalizeRef }) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const dispatch = useAppDispatch();

    const isDark = useSelector((state: any) => state.theme.isDark);
    const colors = getThemeStyles(isDark);

    return (
        <Modalize ref={modalizeRef} adjustToContentHeight>
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        Let’s Get Your Profile Ready!
                    </Text>
                    <Text style={[styles.description, , { color: colors.textLight }]}>
                        A picture says a thousand words. Upload one to finish your profile.
                    </Text>
                    <Spacer height={dimensions.screenHeight * 0.02} />
                    <CompleteProfileIcon size={dimensions.screenSize * 0.08} color={colors.primary} />
                    <Spacer height={dimensions.screenHeight * 0.08} />
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Button1 title='Continue' onPress={() => {
                        modalizeRef.current?.close();

                        setTimeout(() => {
                            navigation.navigate('UploadAvatarScreen');
                        }, 200);
                    }} />
                    <Button1 title='Skip' onPress={() => modalizeRef.current?.close()} backgroundColor={colors.shadow} />
                </View>
            </View>
        </Modalize>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: dimensions.screenSize * 0.02,
        paddingVertical: dimensions.screenHeight * 0.05
    },
    title: {
        fontSize: dimensions.screenSize * 0.027,
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontWeight: 700,
        marginBottom: 10,
    },
    description: {
        marginBottom: 20,
        fontSize: dimensions.screenSize * 0.012,
        textAlign: 'center',
        fontFamily: 'Montserrat',
    }
});

export default ProfileAvatarModal;
