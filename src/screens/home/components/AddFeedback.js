import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../../constants';
import {
  CustomButton,
  CustomDropdown,
  CustomHeader,
  CustomLoading,
  CustomTextBox,
} from '../../../components';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import {setIsLoading} from '../../../stores/loading/LoadingAction';
import {useFocusEffect, useNavigation} from '@react-navigation/core';

const AddFeedback = props => {
  const {userInfo, setIsLoading} = props;
  const navigation = useNavigation();
  const [developerList, setDeveloperList] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    issueType: '',
    feedback: '',
    assignDeveloperId: 0,
    assignDeveloper: '',
  });
  const [errorFeedback, setErrorFeedback] = useState({
    issueTypeError: '',
    feedbackError: '',
    assignDeveloperError: '',
  });

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
      return () => {
        setDeveloperList([]);
        setNewFeedback({
          issueType: '',
          feedback: '',
          assignDeveloperId: 0,
          assignDeveloper: '',
        });
        setErrorFeedback({
          issueTypeError: '',
          feedbackError: '',
          assignDeveloperError: '',
        });
      };
    }, []),
  );

  const getUserData = () => {
    firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        let developers = [];
        querySnapshot.forEach(documentSnapshot => {
          var data = documentSnapshot.data();
          var obj = {};
          obj['label'] = data.userName;
          obj['value'] = data.userId;
          if (data.userType == 'developer') {
            developers.push(obj);
          }
        });
        setDeveloperList(developers);
      });
  };

  const onValueChange = (text, value) => {
    const newValue = {...newFeedback};
    switch (text) {
      case 'issueType':
        if (value != '' || value != null || value != undefined) {
          var oldValue = {...errorFeedback};
          oldValue['issueTypeError'] = '';
          setErrorFeedback(oldValue);
        }
        break;
      case 'feedback':
        if (value != '' || value != null || value != undefined) {
          var oldValue = {...errorFeedback};
          oldValue['feedbackError'] = '';
          setErrorFeedback(oldValue);
        }
        break;
      case 'assignDeveloperId':
        if (value != 0 || value != null || value != undefined) {
          var oldValue = {...errorFeedback};
          oldValue['assignDeveloperError'] = '';
          setErrorFeedback(oldValue);
        }
        newValue['assignDeveloper'] = developerList.filter(
          a => a.value == value,
        )[0].label;
        break;
      default:
        break;
    }
    newValue[text] = value;
    setNewFeedback(newValue);
  };

  const onClickSubmit = () => {
    const {issueType, feedback, assignDeveloperId, assignDeveloper} =
      newFeedback;
    const errorValue = {...errorFeedback};
    if (issueType == '') {
      errorValue['issueTypeError'] = 'Please fill Issue Type!';
    } else if (feedback == '') {
      errorValue['feedbackError'] = 'Please fill Feedback!';
    } else if (assignDeveloperId == 0) {
      errorValue['assignDeveloperError'] = 'Please select Assign Developer!';
    } else {
      setIsLoading(true);
      firestore()
        .collection('Tickets')
        .get()
        .then(query => {
          let ticketsId = [];
          query.forEach(document => {
            ticketsId.push(document.data().ticketId);
          });
          const maxId = Math.max(...ticketsId);
          firestore()
            .collection('Tickets')
            .doc(`${maxId + 1}`)
            .set({
              ticketId: maxId + 1,
              userId: userInfo.userId,
              issueType,
              feedback,
              assignDeveloperId,
              assignDeveloper,
              status: 0,
            })
            .then(() => {
              const promise = new Promise((resolve, reject) => {
                setIsLoading(false);
                resolve(null);
              });
              promise.then(v => {
                navigation.goBack();
              });
            });
        });
    }
    setErrorFeedback(errorValue);
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <CustomHeader backButton={true} />
      <CustomLoading/>
      <View style={styles.formContainer}>
        <CustomTextBox
          value={newFeedback.issueType}
          label={'Issue Type'}
          onChangeText={v => {
            onValueChange('issueType', v);
          }}
          error={errorFeedback.issueTypeError}
        />

        <CustomTextBox
          value={newFeedback.feedback}
          label={'Feedback'}
          onChangeText={v => {
            onValueChange('feedback', v);
          }}
          numLine={5}
          multiline={true}
          error={errorFeedback.feedbackError}
        />

        <CustomDropdown
          value={newFeedback.assignDeveloperId}
          setValue={e => onValueChange('assignDeveloperId', e)}
          data={developerList}
          labelCol={'label'}
          valueCol={'value'}
          placeholder={'Please Select Developer'}
          title={'Assign Developer'}
          search={true}
          errorText={errorFeedback.assignDeveloperError}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            icon={'check'}
            onClick={onClickSubmit}
            text={'Submit'}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddFeedback);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  formContainer: {
    width: '95%',
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
