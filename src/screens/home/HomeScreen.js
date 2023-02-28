import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {CardView, CustomButton, CustomHeader} from '../../components';
import {Color} from '../../constants';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';
import {setIsLoading} from '../../stores/loading/LoadingAction';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = props => {
  const {userInfo, setIsLoading} = props;
  const [ticketData, setTicketData] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getTicketData();
      return () => {};
    }, []),
  );

  const getTicketData = () => {
    setIsLoading(true);
    firestore()
      .collection('Tickets')
      .get()
      .then(query => {
        let tickets = [];
        query.forEach(document => {
          var data = document.data();
          switch (userInfo.userType) {
            case 'client':
              tickets.push(data);
              break;
            case 'developer':
              if (data.assignDeveloperId == userInfo.userId) {
                tickets.push(data);
              }
            default:
              break;
          }
        });
        const promise = new Promise((resolve, reject) => {
          setTicketData(
            tickets.sort((a, b) => {
              return a.ticketId - b.ticketId;
            }),
          );
          resolve(ticketData);
        });
        promise.then(data => {
          setIsLoading(false);
        });
      });
  };

  const renderItem = ({item, index}) => {
    return (
      <CardView
        item={item}
        index={index}
        userInfo={userInfo}
        onClickSolve={onClickSolve}
      />
    );
  };

  const onClickSolve = item => {
    firestore()
      .collection('Tickets')
      .doc(`${item.ticketId}`)
      .update({
        status: 1,
      })
      .then(() => {
        getTicketData();
      });
  };

  return (
    <View style={styles.container}>
      <CustomHeader isHome={true} />
      <FlatList
        data={ticketData}
        renderItem={renderItem}
        keyExtractor={item => item.ticketId}
      />
      {userInfo.userType == 'client' && (
        <SafeAreaView>
          <View style={styles.buttonContainer}>
            <CustomButton
              onClick={() => navigation.navigate('addFeedback')}
              text={'New Feedback'}
            />
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

function mapStateToProps(state) {
  return {
    userInfo: state.LoginReducer.userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setIsLoading: isLoading => {
      return dispatch(setIsLoading(isLoading));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 20,
  },
});
