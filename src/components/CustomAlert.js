import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Dialog, Portal, Text} from 'react-native-paper';

const CustomAlert = ({visible, hideDialog, message}) => {
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({});
