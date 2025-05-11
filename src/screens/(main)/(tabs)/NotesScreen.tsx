import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { getThemeStyles } from '../../../hooks/useThemes'

type Props = {}

const NotesScreen = (props: Props) => {
  const isDark = useSelector((state: any) => state.theme.isDark);
  const colors = getThemeStyles(isDark);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text>NotesScreen</Text>
    </SafeAreaView>
  )
} 

export default NotesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})