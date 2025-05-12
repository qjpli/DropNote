import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../../_layout';
import Button1 from '../../../../components/Buttons/Button1';
import dimensions from '../../../../hooks/useSizing';
import { ChevronLeft, UserIcon } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Spacer from '../../../../components/UI/Spacer';
import { useSession } from '../../../../contexts/sessionContext';
import { shade, tint } from 'polished';
import { TextInput } from 'react-native-gesture-handler';
import { loadIcon } from '../../../../utils/LoadIcons';
import { hexToRgba } from '../../../../utils/HexToRGBA';
import { useAppDispatch } from '../../../../redux/store';
import { updateUserNoteDetailThunk } from '../../../../redux/actions/noteDetailsActions';

type EditNoteMessageRouteProp = RouteProp<MainStackParamList, 'EditNoteMessage'>;

const EditNoteMessage = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route = useRoute<EditNoteMessageRouteProp>();
    const { theme, noteMessage } = route.params;
    const [message, setMessage] = React.useState<string>(noteMessage);

    const { session } = useSession();
    const dispatch = useAppDispatch();


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={[styles.container, { backgroundColor: theme.color }]}>
                <View style={styles.iconsCont}>
                    {theme.icons.map((iconName, index) => {
                        const IconComponent = loadIcon(iconName);
                        if (!IconComponent) return null;

                        const style =
                            index === 0 ? styles.firstIcon :
                                index === 1 ? styles.secondIcon :
                                    styles.thirdIcon;

                        return (
                            <IconComponent
                                key={index}
                                size={dimensions.screenSize * 0.15}
                                color={shade(0.2, theme.color)}
                                style={[style]}
                            />
                        );
                    })}
                </View>
                <KeyboardAvoidingView behavior="padding" style={styles.mainCont}>
                    <View style={styles.topContainer}>
                        <Spacer height={dimensions.screenHeight * 0.01} />
                        <View style={{ justifyContent: 'flex-start', width: dimensions.screenWidth * 0.9 }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <ChevronLeft size={dimensions.screenSize * 0.027} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.textHeader}>{theme.title}</Text>
                        <View style={styles.noteCont}>
                            <View style={[styles.noteMessage, { backgroundColor: hexToRgba(tint(0.5, theme.color), 0.5) }
                            ]}>
                                <TextInput
                                    style={styles.textInput}
                                    value={message}
                                    placeholder="Say anything you want..."
                                    placeholderTextColor={shade(0.3, theme.color)}
                                    onChangeText={setMessage}
                                    multiline={true}
                                    textAlignVertical="top"
                                    selectionColor="#fff"
                                />
                            </View>
                            <View style={styles.imageCont}>
                                {
                                    session?.user.user_metadata['avatar_url'] ? (
                                        <Image source={{ uri: session?.user.user_metadata['avatar_url'] }} style={[styles.userImage, { borderColor: '#fff', backgroundColor: '#EFEFEF' }]} />
                                    ) : (
                                        <View style={[styles.userImage, { borderColor: theme.color, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }]}>
                                            <UserIcon size={dimensions.screenSize * 0.022} color={theme.color} />
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Button1
                            title="Save Note"
                            backgroundColor="#fff"
                            textColor={theme.color}
                            onPress={() => {
                                Keyboard.dismiss();
                                if (session?.user?.id) {
                                    dispatch(updateUserNoteDetailThunk({
                                        userId: session.user.id,
                                        themeId: theme.id,
                                        note: message ?? '',
                                    }));
                                    navigation.goBack();
                                }
                            }}
                        />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default EditNoteMessage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
    },
    firstIcon: {
        position: 'absolute',
        top: dimensions.screenHeight * 0.02,
        left: -dimensions.screenWidth * 0.1,
        transform: [{ rotate: '50deg' }],
    },
    secondIcon: {
        position: 'absolute',
        top: dimensions.screenHeight * 0.4,
        bottom: 0,
        right: -dimensions.screenWidth * 0.1,
        transform: [{ rotate: '-10deg' }],
    },
    thirdIcon: {
        position: 'absolute',
        bottom: dimensions.screenHeight * 0.05,
        left: -dimensions.screenWidth * 0.1,
        transform: [{ rotate: '-10deg' }],
    },
    iconsCont: {
        position: 'absolute',
        height: dimensions.screenHeight,
        width: dimensions.screenWidth
    },
    mainCont: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    textHeader: {
        color: 'white',
        fontSize: dimensions.screenSize * 0.031,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
    },
    topContainer: {
        alignItems: 'center',
    },
    bottomContainer: {
        width: dimensions.screenWidth * 0.88,
        marginBottom: 20,
    },
    userImage: {
        width: dimensions.screenSize * 0.052,
        height: dimensions.screenSize * 0.052,
        borderRadius: 100,
        borderWidth: 2,
    },
    noteCont: {
        alignItems: 'center',
        position: 'relative',
        marginTop: dimensions.screenHeight * 0.04,
    },
    imageCont: {
        position: 'absolute',
    },
    noteMessage: {
        width: dimensions.screenWidth * 0.88,
        minHeight: dimensions.screenHeight * 0.2,
        maxHeight: dimensions.screenHeight * 0.3,
        marginTop: dimensions.screenHeight * 0.04,
        borderRadius: 15,
        paddingHorizontal: 10,
    },
    textInput: {
        width: '100%',
        marginTop: dimensions.screenHeight * 0.04,
        minHeight: dimensions.screenHeight * 0.17,
        maxHeight: dimensions.screenHeight * 0.25,
        color: '#fff',
        textAlign: 'center',
        fontSize: dimensions.screenSize * 0.015,
        fontFamily: 'Montserrat',
        padding: 10,
    },
});
