import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { getThemeStyles } from '../../../../hooks/useThemes';
import { useAppDispatch } from '../../../../redux/store';
import dimensions from '../../../../hooks/useSizing';
import Button1 from '../../../../components/Buttons/Button1';
import Spacer from '../../../../components/UI/Spacer';
import { CameraIcon, ChevronLeft, UserIcon } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { SaveFormat } from 'expo-image-manipulator';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabaseConn } from '../../../../services/db/supabaseClient';
import { useSession } from '../../../../contexts/sessionContext';

const UploadAvatarScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const dispatch = useAppDispatch();
    const isDark = useSelector((state: any) => state.theme.isDark);
    const colors = getThemeStyles(isDark);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const { session } = useSession();
    const avatarUrl = session?.user.user_metadata['avatar_url'];

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permission to access the gallery is required!");
            return;
        }

        setLoading(true);

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        console.log('ImagePicker Result: ', result);

        if (!result.canceled) {
            console.log('Image picking not canceled');

            const { uri } = result.assets[0];

            try {
                console.log('Starting image compression...');

                let compressedUri = uri;
                let currentSize = 0;
                let quality = 0.6;
                let resizeWidth = 600;

                const fileInfo = await FileSystem.getInfoAsync(compressedUri);
                if (fileInfo.exists && fileInfo.size) {
                    currentSize = fileInfo.size;
                } else {
                    console.error('File not found or size not available');
                    return;
                }

                while (currentSize > 100 * 1024) {
                    const compressedImage = await ImageManipulator.manipulateAsync(
                        compressedUri,
                        [{ resize: { width: resizeWidth } }],
                        { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
                    );

                    compressedUri = compressedImage.uri;

                    const newFileInfo = await FileSystem.getInfoAsync(compressedUri);
                    if (newFileInfo.exists && newFileInfo.size) {
                        currentSize = newFileInfo.size;
                    }

                    quality -= 0.05;
                    resizeWidth -= 100;

                    console.log(`Current size: ${currentSize} bytes, Quality: ${quality}, Width: ${resizeWidth}`);

                    if (resizeWidth < 100 || quality < 0.1) break;
                }

                setImageUri(compressedUri);

                console.log('Final compressed image URI:', compressedUri);
                console.log('Final compressed image size:', currentSize);
            } catch (error) {
                console.error('Image compression error:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 100);
            }
        } else {
            console.log('Image picking was canceled');
        }
    };

    const uploadImage = async () => {
        try {
            if (imageUri == null) {
                return;
            }
            if (!session?.user?.id) throw new Error("No user ID");

            const accessToken = session.access_token;

            setLoading(true);

            const fileExt = imageUri.split('.').pop() || 'jpg';
            const fileName = `user_${session.user.id}.${fileExt}`;
            const filePath = `${session.user.id}/${fileName}`;

            const base64 = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const arrayBuffer = new Uint8Array(
                atob(base64)
                    .split('')
                    .map(char => char.charCodeAt(0))
            ).buffer;

            const { error: uploadError } = await supabaseConn.storage
                .from('useravatars')
                .upload(filePath, arrayBuffer, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    contentType: `image/${fileExt}`,
                    upsert: true,
                    cacheControl: '3600',
                });

            if (uploadError) throw uploadError;

            const { data } = supabaseConn.storage.from('useravatars').getPublicUrl(filePath);
            const photoUrl = `${data.publicUrl}?t=${Date.now()}`;

            const { error: updateError } = await supabaseConn.auth.updateUser({
                data: { avatar_url: photoUrl },
            });

            if (updateError) throw updateError;

            navigation.goBack();

            alert("Profile picture updated successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("There was an error updating your profile picture.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.topContainer}>
                <Spacer height={dimensions.screenHeight * 0.01} />
                <View style={{ justifyContent: 'flex-start', width: dimensions.screenWidth * 0.9 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={dimensions.screenSize * 0.027} color="#000" />
                    </TouchableOpacity>
                </View>
                <Spacer height={dimensions.screenHeight * 0.02} />
                <Text style={[styles.title, { color: colors.text }]}>{session?.user.user_metadata['avatar_url'] ? "Change your\nProfile Picture" : "Choose a\nProfile Picture"}</Text>
                <Spacer height={dimensions.screenHeight * 0.03} />
                <TouchableOpacity onPress={pickImage} style={styles.imageMainCont}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.profileImage} />
                    ) : session?.user.user_metadata['avatar_url'] ? (
                        <View style={[styles.imageCont, { backgroundColor: colors.shadow, position: 'relative', alignItems: 'center', justifyContent: 'center' }]}>
                            <ActivityIndicator size="large" style={{ position: 'absolute' }} />
                            <Image source={{ uri: session?.user.user_metadata['avatar_url'] }} style={[styles.profileImage, { position: 'absolute' }]} />
                        </View>
                    ) : (
                        <View style={[styles.imageCont, { backgroundColor: colors.shadow }]}>
                            <UserIcon size={dimensions.screenSize * 0.04} color={colors.trueColor} />
                        </View>
                    )}
                    <View style={styles.cameraIconCont}>
                        <CameraIcon size={dimensions.screenSize * 0.02} color={colors.primary} />
                    </View>
                </TouchableOpacity>

                <Spacer height={dimensions.screenHeight * 0.03} />
                <Text style={[styles.description, { color: colors.textLight }]}>
                    For best results, upload a clear profile picture in JPEG or PNG format, with a minimum size of 300x300 pixels.
                </Text>
            </View>

            <View style={styles.bottomContainer}>
                <Button1 isLoading={isLoading} title={session?.user.user_metadata['avatar_url'] ? "Save" : "Upload Profile"} onPress={imageUri ? () => uploadImage() : null} />
            </View>
        </SafeAreaView>
    );
};

export default UploadAvatarScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: dimensions.screenWidth * 0.06,
    },
    topContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {},
    title: {
        fontSize: dimensions.screenSize * 0.0316,
        fontWeight: '700',
        fontFamily: 'Montserrat',
        textAlign: 'center',
        marginBottom: dimensions.screenHeight * 0.02,
    },
    description: {
        fontSize: dimensions.screenSize * 0.0115,
        fontWeight: '400',
        fontFamily: 'Montserrat',
        textAlign: 'center',
        lineHeight: dimensions.screenWidth * 0.06,
    },
    imageMainCont: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCont: {
        backgroundColor: '#DFDFDF',
        width: dimensions.screenSize * 0.12,
        height: dimensions.screenSize * 0.12,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: dimensions.screenSize * 0.12,
        height: dimensions.screenSize * 0.12,
        borderRadius: 100,
        resizeMode: 'cover',
    },
    cameraIconCont: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: dimensions.screenSize * 0.005,
        borderRadius: 100,
    },
});
