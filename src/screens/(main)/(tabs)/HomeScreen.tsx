import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { getThemeStyles } from '../../../hooks/useThemes'
import dimensions from '../../../hooks/useSizing'
import Spacer from '../../../components/UI/Spacer'
import { useSession } from '../../../contexts/sessionContext'
import { Edit2Icon, NotepadText, UserIcon } from 'lucide-react-native'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

// Default Type Icons
import { NotebookIcon, PinIcon, MessageCircleQuestion } from 'lucide-react-native'
import { shade } from 'polished'
import Carousel from 'react-native-reanimated-carousel'

type Props = {}

type NoteTheme = {
  id: string;
  title: string;
  desc?: string;
  color: string;
  icons: any;
}

const HomeScreen = (props: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const isDark = useSelector((state: any) => state.theme.isDark);
  const colors = getThemeStyles(isDark);
  const { session } = useSession();

  const renderDefault = () => {

    const defaultType = StyleSheet.create({
      container: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        top: 0
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
        transform: [{ rotate: '-20deg' }],
      }
    });

    return (
      <View style={defaultType.container}>
        <NotebookIcon size={dimensions.screenSize * 0.05} color={shade(0.2, colors.primary)} style={defaultType.firstIcon} />
        <MessageCircleQuestion size={dimensions.screenSize * 0.055} color={shade(0.2, colors.primary)} style={defaultType.secondIcon} />
        <PinIcon size={dimensions.screenSize * 0.05} color={shade(0.2, colors.primary)} style={defaultType.thirdIcon} />
      </View>
    )
  }

  const renderChristmas = () => {
    const defaultType = StyleSheet.create({
      container: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        top: 0
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
        transform: [{ rotate: '-20deg' }],
      }
    });

    return (
      <View style={defaultType.container}>
        <NotebookIcon size={dimensions.screenSize * 0.05} color={shade(0.2, '#165B33')} style={defaultType.firstIcon} />
        <MessageCircleQuestion size={dimensions.screenSize * 0.055} color={shade(0.2, '#165B33')} style={defaultType.secondIcon} />
        <PinIcon size={dimensions.screenSize * 0.05} color={shade(0.2, '#165B33')} style={defaultType.thirdIcon} />
      </View>
    )
  }

  const [themes, setThemes] = useState<NoteTheme[]>([
    {
      id: 'q&a',
      title: 'Q&A',
      color: colors.primary,
      icons: renderDefault()
    },
    {
      id: 'christmas',
      title: 'Christmas',
      color: '#165B33',
      icons: renderChristmas()
    }
  ])

  const [activeTheme, setActiveTheme] = useState<NoteTheme>(themes[0]);


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.notesContainer]}>
        <SafeAreaView edges={['top',]} style={[styles.notesTopBackground, { backgroundColor: activeTheme?.color }]}>
          <View style={[styles.notesContBG, {}]}>
            {activeTheme?.icons}
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
        </SafeAreaView>
        <Carousel
          loop
          width={dimensions.screenWidth}
          height={dimensions.screenHeight * 0.15}
          autoPlay={false}
          data={themes} // Use the themes as data for the carousel
          style={[styles.floatingNotesCarousel]}
          onProgressChange={(offsetProgress, absoluteProgress) => {
            const activeIndex = Math.round(absoluteProgress) % themes.length;
            setActiveTheme(themes[activeIndex]);
          }}
          renderItem={({ item }) => (
            <View style={[styles.floatingNotes, { backgroundColor: colors.trueColor }]}>
              <TouchableOpacity onPress={() => navigation.navigate('UploadAvatarScreen')}>
                {
                  session?.user.user_metadata['avatar_url'] ?
                    <Image source={{ uri: session?.user.user_metadata['avatar_url'] }} style={[styles.userImage, { borderColor: item.color, backgroundColor: colors.shadow }]} /> :
                    <View style={[styles.userImage, { borderColor: colors.primary, backgroundColor: colors.trueColor, alignItems: 'center', justifyContent: 'center' }]}>
                      <UserIcon size={dimensions.screenSize * 0.022} color={colors.primary} />
                    </View>
                }
              </TouchableOpacity>
              <View style={{ marginTop: dimensions.screenHeight * 0.005, flex: 1 }}>
                <Text style={[styles.textInput, { fontWeight: 400, fontSize: dimensions.screenSize * 0.012, color: colors.textLight }]}>Say anything you want</Text>
                <Spacer height={dimensions.screenHeight * 0.007} />
                <Text style={styles.textInput}>Hey, ask me something!</Text>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                <View style={[styles.editNote, { backgroundColor: item.color }]}>
                  <Edit2Icon size={dimensions.screenSize * 0.015} color="#fff" />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  notesContainer: {
    position: 'relative',
    paddingBottom: dimensions.screenHeight * 0.13,
    // backgroundColor: 'red'
  },
  notesTopBackground: {
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