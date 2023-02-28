import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color, myColor, Size} from '../constants';
import {Styled} from './RadioButtonStyle';

const CustomRadioButton = ({data, value, setValue}) => {
  return (
    <View style={styles.container}>
      {data.length &&
        data.map((v, i) => (
          <TouchableOpacity
            key={i}
            style={styles.radioButton}
            onPress={() => setValue(v.value)}>
            <View
              style={[
                styles.circle,
                {borderColor: v.value == value ? Color.primary : Color.darkGray},
              ]}>
              <View
                style={[
                  styles.innerCircle,
                  {backgroundColor: v.value == value ? Color.primary : Color.white},
                ]}
              />
            </View>
            <Text style={styles.label}>{v.label}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  radioButton: {
    width: 100,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: Size.width <= 500 ? 20 : 25,
    height: Size.width <= 500 ? 20 : 25,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  innerCircle: {
    width: Size.width <= 500 ? 15 : 20,
    height: Size.width <= 500 ? 15 : 20,
    borderRadius: 10,
  },
  label: {
    fontSize: Size.body2,
    color: Color.darkGray,
  },
});
