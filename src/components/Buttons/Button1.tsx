import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
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
  borderRadius?: number;
  borderOnly?: boolean;
  borderColor?: string;
  retainColor?: boolean;
  maxHeight?: number | null;
  verticalPadding?: number;
  suffixElement?: React.ReactNode;
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
  borderRadius = 15,
  borderOnly = false,
  borderColor = '#ef3a5d',
  retainColor = false,
  maxHeight = null,
  verticalPadding,
  suffixElement = null,
}) => {
  const isDisabled = !onPress || isLoading;

  const finalStyle: ViewStyle = {
    backgroundColor: borderOnly
      ? retainColor
        ? backgroundColor
        : 'transparent'
      : isDisabled
      ? '#d3d3d3'
      : backgroundColor,
    borderWidth: borderOnly ? 2 : 0,
    borderColor: borderOnly ? borderColor : 'transparent',
    borderRadius,
    flex,
    maxHeight: maxHeight ?? undefined,
    paddingVertical: verticalPadding ?? dimensions.screenHeight * 0.02,
    paddingHorizontal: dimensions.screenWidth * 0.03,
    alignItems: 'center',
    marginVertical: 5,
    flexDirection: suffixElement ? 'row' : undefined,
    justifyContent: suffixElement ? 'center' : undefined,
  };

  return (
    <TouchableOpacity
      style={[finalStyle, customStyle]}
      onPress={onPress ?? (() => {})}
      disabled={isDisabled}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <>
          <Text style={[styles.buttonText, { color: textColor, fontSize }]}> {title}</Text>
          {suffixElement}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
});

export default Button1;
