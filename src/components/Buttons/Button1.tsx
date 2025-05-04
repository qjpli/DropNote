import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';
import dimensions from '../../hooks/useSizing';

interface Button1Props {
  title: string;
  onPress?: (() => void) | null;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  customStyle?: ViewStyle;
  flex?: number;
  isLoading?: boolean;
}

const Button1: React.FC<Button1Props> = ({
  title,
  onPress,
  backgroundColor = '#ef3a5d',
  textColor = '#ffffff',
  fontSize = dimensions.screenWidth * 0.045,
  customStyle,
  flex,
  isLoading = false,
}) => {
  const isDisabled = !onPress || isLoading;
  const finalBackgroundColor = isDisabled ? '#d3d3d3' : backgroundColor;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: finalBackgroundColor, flex }, customStyle]}
      onPress={onPress ?? (() => {})}
      disabled={isDisabled}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={[styles.buttonText, { color: textColor, fontSize }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: dimensions.screenHeight * 0.02,
    paddingHorizontal: dimensions.screenWidth * 0.03,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: dimensions.screenWidth * 0.045,
  },
});

export default Button1;
