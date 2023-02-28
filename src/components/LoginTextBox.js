import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Color, Size} from '../constants';
import {IconButton} from 'react-native-paper';

const LoginTextBox = ({
  value,
  label,
  onChangeText,
  error,
  confirm = false,
  isSecure = false,
}) => {
  const [passwordView, setPasswordView] = useState(false);
  return (
    <View style={styles.container}>
      <View style={[styles.labelContainer, {width: confirm ? 150 : 90}]}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          style={styles.inputBox}
          onChangeText={v => onChangeText(v)}
          placeholder={`Enter ${label}...`}
          placeholderTextColor={Color.gray}
          secureTextEntry={isSecure && !passwordView ? true : false}
        />
        {value.length > 0 && isSecure ? (
          <View>
            {passwordView ? (
              <IconButton
                icon="eye-off"
                iconColor={Color.gray}
                size={15}
                onPress={() => setPasswordView(false)}
              />
            ) : (
              <IconButton
                icon="eye"
                iconColor={Color.gray}
                size={15}
                onPress={() => setPasswordView(true)}
              />
            )}
          </View>
        ) : null}
      </View>
      {error != '' && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default LoginTextBox;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 80,
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
    fontSize: Size.body1,
  },
  inputContainer: {
    width: '100%',
    height: 55,
    alignItems: 'center',
    borderColor: Color.gray,
    borderWidth: 1,
    zIndex: 0,
    flexDirection: 'row',
  },
  inputBox: {
    width: '80%',
    height: 50,
    backgroundColor: Color.white,
    marginLeft: '5%',
    zIndex: 1,
  },
  errorText: {
    color: Color.red,
    fontSize: Size.body3,
  },
});
