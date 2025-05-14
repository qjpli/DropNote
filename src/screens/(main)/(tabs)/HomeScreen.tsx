import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Easing, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { getThemeStyles } from '../../../hooks/useThemes'
import dimensions from '../../../hooks/useSizing'
import Spacer from '../../../components/UI/Spacer'
import { useSession } from '../../../contexts/sessionContext'
import { Edit2Icon, NotepadText, UserIcon } from 'lucide-react-native'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Carousel from 'react-native-reanimated-carousel'
import { shade } from 'polished'
import { AppDispatch, RootState } from '../../../redux/store';
import { NoteTheme } from '../../../types/NoteThemeType'
import { loadIcon } from '../../../utils/LoadIcons'
import { loadUserNoteDetailsThunk } from '../../../redux/actions/noteDetailsActions'
import Button1 from '../../../components/Buttons/Button1'

import { Instagram, Link } from 'lucide-react-native'
import { FontAwesome } from '@expo/vector-icons'

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const isDark = useSelector((state: any) => state.theme.isDark);
  const colors = getThemeStyles(isDark);
  const { session } = useSession();
  const themes = useSelector((state: RootState) => state.noteTheme.noteThemes);
  const [activeTheme, setActiveTheme] = useState<NoteTheme | null>(themes.length > 0 ? themes[0] : null);
  const themeColor = useRef(new Animated.Value(0)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const userId = session?.user?.id;
  const dispatch = useDispatch<AppDispatch>();

  const noteDetails = useSelector((state: RootState) => state.noteDetails[userId ?? ''] || {});

  useEffect(() => {
    if (userId) {
      dispatch(loadUserNoteDetailsThunk(userId ?? ''));
    }
  }, [userId]);

  const renderThemeIcons = (theme: NoteTheme) => {
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        top: 0,
      },
      firstIcon: {
        position: 'absolute',
        bottom: dimensions.screenHeight * 0.02,
        right: dimensions.screenWidth * 0.06,
        transform: [{ rotate: '10deg' }],
      },
      secondIcon: {
        position: 'absolute',
        bottom: dimensions.screenHeight * 0.035,
        left: dimensions.screenWidth * 0.3,
        transform: [{ rotate: '-10deg' }],
      },
      thirdIcon: {
        position: 'absolute',
        bottom: dimensions.screenHeight * 0.05,
        left: dimensions.screenWidth * 0.55,
        transform: [{ rotate: theme.id === 'christmas' ? '-40deg' : '-20deg' }],
      },
    });

    return (
      <View style={styles.container}>
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
              size={dimensions.screenSize * 0.05}
              color={shade(0.2, theme.color)}
              style={style}
            />
          );
        })}
      </View>

    );
  };

  const onThemeChange = (index: number) => {
    const newTheme = themes[index];
    setActiveTheme(newTheme);

    iconOpacity.setValue(0);

    Animated.timing(themeColor, {
      toValue: index,
      duration: 110,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      Animated.sequence([
        Animated.delay(0),
        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const interpolatedBackgroundColor = themes.length > 1
    ? themeColor.interpolate({
      inputRange: themes.map((_, i) => i),
      outputRange: themes.map(theme => theme.color),
    })
    : themes.length === 1
      ? themes[0].color
      : colors.background;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'space-between' }]}>
      <View>
        <View style={[styles.notesContainer]}>
          <Animated.View style={[styles.notesTopBackground, { backgroundColor: interpolatedBackgroundColor }]}>
            <View style={[styles.notesContBG, {}]}>
              <Animated.View style={{
                opacity: iconOpacity,
                position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0,
                top: 0
              }}>
                {activeTheme && renderThemeIcons(activeTheme)}
              </Animated.View>
              <View>
                <Spacer height={dimensions.screenHeight * 0.01} />
                <Text style={styles.textNoteTopHeader}>Note Type</Text>
                <Spacer height={dimensions.screenHeight * 0.005} />
                <Text style={[styles.textNoteTopHeader, { fontSize: dimensions.screenSize * 0.031, fontWeight: 700 }]}>{activeTheme?.title}</Text>
              </View>
              <View>
                <Spacer height={dimensions.screenHeight * 0.03} />
                <View style={styles.noteStatusCont}>
                  <NotepadText size={dimensions.screenSize * 0.017} color={activeTheme?.color} />
                </View>
              </View>
            </View>
          </Animated.View>
          <Carousel
            loop
            width={dimensions.screenWidth}
            height={dimensions.screenHeight * 0.15}
            autoPlay={false}
            data={themes}
            style={[styles.floatingNotesCarousel]}
            onProgressChange={(offsetProgress, absoluteProgress) => {
              const activeIndex = Math.round(absoluteProgress) % themes.length;
              onThemeChange(activeIndex);
              setActiveTheme(themes[activeIndex]);
            }}
            renderItem={({ item }) => {
              const userNoteForTheme = noteDetails[item.id] || 'Hey, ask me something!';

              return (
                <View style={[styles.floatingNotes, { backgroundColor: colors.trueColor }]}>
                  <TouchableOpacity onPress={() => navigation.navigate('UploadAvatarScreen')}>
                    {
                      session?.user.user_metadata['avatar_url'] ? (
                        <Image
                          source={{ uri: session?.user.user_metadata['avatar_url'] }}
                          style={[styles.userImage, { borderColor: item.color, backgroundColor: colors.shadow }]}
                        />
                      ) : (
                        <View style={[styles.userImage, { borderColor: colors.primary, backgroundColor: colors.trueColor, alignItems: 'center', justifyContent: 'center' }]}>
                          <UserIcon size={dimensions.screenSize * 0.022} color={colors.primary} />
                        </View>
                      )
                    }
                  </TouchableOpacity>
                  <View style={{ marginTop: dimensions.screenHeight * 0.005, flex: 1 }}>
                    <Text style={[styles.textInput, { fontWeight: 400, fontSize: dimensions.screenSize * 0.012, color: colors.textLight }]}>
                      Say anything you want
                    </Text>
                    <Spacer height={dimensions.screenHeight * 0.007} />
                    <Text numberOfLines={3} style={styles.textInput}>
                      {userNoteForTheme}
                    </Text>
                  </View>
                  <Spacer width={dimensions.screenWidth * 0.01} />
                  <View style={{ justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                      style={[styles.editNote, { backgroundColor: item.color }]}
                      onPress={() => navigation.navigate('EditNoteMessage', { theme: item, noteMessage: userNoteForTheme })}
                    >
                      <Edit2Icon size={dimensions.screenSize * 0.015} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: dimensions.screenHeight * 0.02 }}>
          {activeTheme && themes.map((_, index) => (
            <View
              key={index}
              style={{
                width: dimensions.screenSize * 0.006,
                height: dimensions.screenSize * 0.006,
                borderRadius: 100,
                marginHorizontal: dimensions.screenWidth * 0.01,
                backgroundColor: index === themes.indexOf(activeTheme) ? activeTheme.color : colors.shadow,
                opacity: index === themes.indexOf(activeTheme) ? 1 : 0.4,
              }}
            />
          ))}
        </View>
        <View style={styles.generalInfoCont}>
          <Text style={[styles.generalInfo, { color: colors.textLight }]}>
            Ready to get notes? Share or copy your link now</Text>
        </View>
        <View style={styles.actionButtonsContainer}>
          <Button1
            title='Share'
            onPress={() => {

            }}
            backgroundColor={activeTheme?.color}
            flex={1}
            borderRadius={30}
            borderOnly={true}
            borderColor={activeTheme?.color}
            retainColor={true}
            verticalPadding={dimensions.screenHeight * 0.015}
            fontSize={dimensions.screenSize * 0.013}
            suffixElement={
              <Instagram size={dimensions.screenSize * 0.014} color="#fff" style={{ marginLeft: dimensions.screenWidth * 0.02 }} />
            }
          />
          <Button1
            title='Copy Link'
            onPress={() => {

            }}
            backgroundColor={activeTheme?.color}
            textColor={activeTheme?.color}
            flex={1}
            borderRadius={30}
            borderOnly={true}
            borderColor={activeTheme?.color}
            verticalPadding={dimensions.screenHeight * 0.015}
            fontSize={dimensions.screenSize * 0.013}
            suffixElement={
              <Link size={dimensions.screenSize * 0.013} color={activeTheme?.color} style={{ marginLeft: dimensions.screenWidth * 0.02 }} />
            }
          />
        </View>
        <View style={styles.moreDetailsCont}>
          <Text style={[styles.moreDetailsInfo, { color: colors.textLight, paddingHorizontal: dimensions.screenWidth * 0.06 }]}>More details about {activeTheme?.title}</Text>
          <Spacer height={dimensions.screenHeight * 0.01} />
          <FlatList
            data={activeTheme?.features}
            keyExtractor={(_, i) => i.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.list}
            style={{ width: dimensions.screenWidth }}
            renderItem={({ item, index }) => {
              const IconComponent = loadIcon(item.icon);
              if (!IconComponent) return null;

              return (
                <View style={[styles.featureItem, { 
                    marginLeft: index == 0 ? dimensions.screenWidth * 0.06 : 0, 
                    marginRight: index == (activeTheme?.features?.length ?? 0) - 1 ? dimensions.screenWidth * 0.06 : dimensions.screenWidth * 0.03, 
                    backgroundColor: activeTheme?.color, borderColor: activeTheme?.color 
                  }]}>
                  <View style={{ backgroundColor: 'white', alignItems: 'center', borderRadius: 100, padding: dimensions.screenSize * 0.005 }}>
                    <IconComponent size={dimensions.screenSize * 0.02} color={activeTheme?.color} />
                  </View>
                  <Spacer height={dimensions.screenHeight * 0.005} />
                  <Text numberOfLines={2} style={[styles.desc, { color: '#fff' }]}>{item.description}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
      {/* <View style={styles.bottomCont}>
        <Button1
          title='More details'
          borderRadius={30}
          backgroundColor={activeTheme?.color}
          onPress={() => { }}
        />
      </View> */}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    paddingVertical: 8,
  },
  featureItem: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'green',
    width: dimensions.screenWidth * 0.26,
    marginRight: dimensions.screenWidth * 0.03,
    paddingVertical: dimensions.screenHeight * 0.015,
    borderRadius: 16,
    paddingHorizontal: dimensions.screenWidth * 0.02,
    borderWidth: 1.5,
    justifyContent: 'center'
  },
  desc: {
    fontSize: dimensions.screenSize * 0.01,
    fontFamily: 'Montserrat',
    fontWeight: 600,
    textAlign: 'center'
  },
  bottomCont: {
    paddingHorizontal: dimensions.screenWidth * 0.06,
  },
  moreDetailsCont: {
    alignItems: 'flex-start',
    width: dimensions.screenWidth,
    marginBottom: dimensions.screenHeight * 0.015,
    marginTop: dimensions.screenHeight * 0.015,
  },
  moreDetailsInfo: {
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: dimensions.screenSize * 0.01,
    textAlign: 'center'
  },
  generalInfoCont: {
    alignItems: 'center',
    marginBottom: dimensions.screenHeight * 0.015,
    paddingHorizontal: dimensions.screenWidth * 0.06
  },
  generalInfo: {
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: dimensions.screenSize * 0.01,
    textAlign: 'center'
  },
  actionButtonsContainer: {
    paddingHorizontal: dimensions.screenWidth * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: dimensions.screenWidth * 0.05
  },
  notesContainer: {
    position: 'relative',
    paddingBottom: dimensions.screenHeight * 0.13,
  },
  notesTopBackground: {
    paddingTop: dimensions.screenHeight * 0.06,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  textNoteTopHeader: {
    fontFamily: 'Montserrat',
    color: 'white'
  },
  notesContBG: {
    position: 'relative',
    paddingHorizontal: dimensions.screenWidth * 0.06,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: dimensions.screenHeight * 0.035
  },
  floatingNotes: {
    position: 'absolute',
    left: dimensions.screenWidth * 0.06,
    right: dimensions.screenWidth * 0.06,
    paddingHorizontal: dimensions.screenWidth * 0.035,
    paddingVertical: dimensions.screenHeight * 0.02,
    height: dimensions.screenHeight * 0.15,
    borderRadius: 12,
    backgroundColor: '#d1eec4',
    flexDirection: 'row'
  },
  floatingNotesCarousel: {
    position: 'absolute',
    bottom: 0,
    top: -dimensions.screenHeight * 0.02,
    left: 0,
    right: 0,
    width: dimensions.screenWidth,
    backgroundColor: 'transparent',
  },
  textInput: {
    fontFamily: 'Montserrat',
    fontSize: dimensions.screenSize * 0.014,
    fontWeight: 600
  },
  userImage: {
    width: dimensions.screenSize * 0.042,
    height: dimensions.screenSize * 0.042,
    borderRadius: 100,
    marginRight: dimensions.screenWidth * 0.04,
    borderWidth: 1.6
  },
  editNote: {
    backgroundColor: '#fff',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    padding: dimensions.screenSize * 0.007
  },
  noteStatusCont: {
    backgroundColor: 'white',
    padding: dimensions.screenSize * 0.007,
    borderRadius: 100
  }
})