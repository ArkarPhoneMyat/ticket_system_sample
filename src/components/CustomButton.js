import {StyleSheet, View} from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { Color, Size } from '../constants';

const CustomButton = ({icon, onClick, small = false, text}) => {
  return (
    <View style={small ? null : styles.container}>
      <Button
        icon={icon ? icon : ""}
        mode="contained"
        buttonColor={Color.primary}
        onPress={onClick}
        labelStyle={small ? styles.textSmall : styles.text}
        >
        {text}
      </Button>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  textSmall: {
    fontSize: Size.body3
  },
  text: {
    fontSize: Size.body1
  }
});
