import {StyleSheet} from 'react-native';
import React from 'react';
import {Color} from '../constants';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';

const CustomHeader = props => {
  const {backButton = false, isHome = false} = props;
  const navigation = useNavigation();
  return (
    <Appbar.Header mode="center-aligned">
      {backButton ? (
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
          iconColor={Color.primary}
        />
      ) : null}
      <Appbar.Content title="Feedback System" color={Color.primary} />
      {isHome && (
        <Appbar.Action
          icon="logout"
          iconColor={Color.primary}
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
    </Appbar.Header>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: Color.primary,
  },
});
