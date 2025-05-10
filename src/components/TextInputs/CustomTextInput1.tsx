import React, { useState, useRef } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';
import { X, Eye, EyeOff } from 'lucide-react-native';
import dimensions from '../../hooks/useSizing';
import { useSelector } from 'react-redux';
import { getThemeStyles } from '../../hooks/useThemes';

interface CustomTextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  backgroundColor?: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  prefix?: React.ReactNode;
  height?: number;
  keyboardType?: KeyboardTypeOptions;
  showClearButton?: boolean;
  maxLength?: number;
}

const CustomTextInput1: React.FC<CustomTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  backgroundColor = '#fff',
  paddingHorizontal = dimensions.screenWidth * 0.05,
  paddingVertical = 0,
  prefix = null,
  height = dimensions.screenHeight * 0.05,
  keyboardType = 'default',
  showClearButton = false,
  maxLength,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const textInputRef = useRef<TextInput | null>(null); // Create a ref for the TextInput
  const isDark = useSelector((state: any) => state.theme.isDark);
  const colors = getThemeStyles(isDark);

  // Function to trigger blur
  const handleBlur = () => {
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
  };

  return (
    <View
      style={[
        styles.mainCont,
        {
          backgroundColor: backgroundColor || colors.cardBackground,
          paddingVertical,
          paddingHorizontal,
          height,
        } as ViewStyle,
      ]}
    >
      {prefix && <View style={styles.prefixContainer}>{prefix}</View>}
      <TextInput
        ref={textInputRef} // Assign ref to TextInput
        style={[styles.input, { height, color: colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        keyboardType={keyboardType}
        clearTextOnFocus={false}
        maxLength={maxLength}
        selectionColor={colors.primary}
      />
      {showClearButton && value?.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <X size={18} color="#666" />
        </TouchableOpacity>
      )}
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
          {isPasswordVisible ? (
            <EyeOff size={dimensions.screenSize * 0.016} color="#666" />
          ) : (
            <Eye size={dimensions.screenSize * 0.016} color="#666" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Montserrat',
    fontWeight: '400',
  },
  prefixContainer: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTextInput1;
