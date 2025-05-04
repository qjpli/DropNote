import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';
import { X } from 'lucide-react-native';
import dimensions from '../../hooks/useSizing';

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
  return (
    <View
      style={[
        styles.mainCont,
        {
          backgroundColor,
          paddingVertical,
          paddingHorizontal,
          height,
        } as ViewStyle,
      ]}
    >
      {prefix && <View style={styles.prefixContainer}>{prefix}</View>}
      <TextInput
        style={[styles.input, { height }]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
      {showClearButton && value?.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <X size={18} color="#666" />
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
    fontWeight: 400
  },
  prefixContainer: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTextInput1;
