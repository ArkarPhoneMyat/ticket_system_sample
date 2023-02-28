import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Color, Size} from '../constants';

const CustomTextBox = ({
  value, label, onChangeText, numLine = 1, multiline = false, error,
}) => {
  return (
    <View style={[styles.container, {height: numLine > 1 ? 180 : 80}]}>
      <View style={[styles.labelContainer, {width: 90}]}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={[styles.inputContainer, {height: numLine > 1 ? 150 : 50}]}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          style={[styles.inputBox, {height: numLine > 1 ? 130 : 45}]}
          onChangeText={v => onChangeText(v)}
          placeholder={`Enter ${label}...`}
          placeholderTextColor={Color.gray}
          numberOfLines={numLine}
          multiline={multiline}
        />
      </View>
      {error != '' && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomTextBox;

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
  labelContainer: {
    backgroundColor: Color.white,
    zIndex: 2,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10,
  },
  label: {
    color: Color.primary,
    fontSize: Size.body2,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Color.gray,
    borderWidth: 1,
    zIndex: 0,
  },
  inputBox: {
    width: '90%',
    backgroundColor: Color.white,
    zIndex: 1,
  },
  errorText: {
    color: Color.red,
    fontSize: Size.body3,
  },
});
