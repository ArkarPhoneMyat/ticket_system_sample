import * as React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';
import {Color} from '../constants';

const CustomLoading = props => {
  const {isLoading} = props;
  return (
    <Modal animationType="none" visible={isLoading} transparent={true}>
      <View style={styles.container}>
        <View style={styles.indicatorContainer}>
          <ActivityIndicator
            size={'large'}
            animating={isLoading}
            color={Color.white}
          />
        </View>
      </View>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    isLoading: state.LoadingReducer.isLoading,
  };
}

export default connect(mapStateToProps, null)(CustomLoading);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.transparentPrimary,
  },
  indicatorContainer: {
    width: 100,
    height: 100,
    backgroundColor: Color.transparentPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
