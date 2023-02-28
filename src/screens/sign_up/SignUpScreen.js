import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Color, Size} from '../../constants';
import {
  CustomAlert,
  CustomLoading,
  LoginTextBox,
  CustomRadioButton,
  CustomButton,
} from '../../components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {setIsLoading} from '../../stores/loading/LoadingAction';
import {connect} from 'react-redux';

const SignUpScreen = props => {
  const {setIsLoading} = props;
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState(0);
  const navigation = useNavigation();
  const radioButtonOption = [
    {label: 'Client', value: 0},
    {label: 'Developer', value: 1},
  ];

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setNewUser({
          username: '',
          password: '',
          confirmPassword: '',
        });
        setUsernameError('');
        setPasswordError('');
        setConfirmPasswordError();
      };
    }, []),
  );

  const onValueChange = (text, value) => {
    const newValue = {...newUser};
    switch (text) {
      case 'username':
        if (value != '' || value != null || value != undefined) {
          setUsernameError('');
        }
        break;
      case 'password':
        if (value != '' || value != null || value != undefined) {
          setPasswordError('');
        }
        break;
      case 'confirmPassword':
        if (value != '' || value != null || value != undefined) {
          setConfirmPasswordError('');
        }
        break;
      default:
        break;
    }

    newValue[text] = value;
    setNewUser(newValue);
  };

  // const onPasswordChange = (text, value) => {
  //   const newValue = {...newUser};
  //   if (value != '' || value != null || value != undefined) {
  //     setPasswordError('');
  //   }
  //   newValue[text] = value;
  //   setNewUser(newValue);
  // };

  // const onConfirmPasswordChange = v => {
  //   if (v != '' || v != null || v != undefined) {
  //     setConfirmPasswordError('');
  //   }
  //   setConfirmPassword(v);
  // };

  const onClickSignUp = () => {
    const {username, password, confirmPassword} = newUser;
    if (username == '') {
      setUsernameError('Please fill Username!');
    } else if (password == '') {
      setPasswordError('Please fill Password!');
    } else if (confirmPassword == '') {
      setConfirmPasswordError('Please fill Confirm Password!');
    } else if (password != confirmPassword) {
      setShowAlert(true);
      setMessage('Password and Confirm Password must be the same!');
    } else {
      setIsLoading(true);
      firestore()
        .collection('Users')
        .get()
        .then(query => {
          let usersId = [];
          query.forEach(document => {
            usersId.push(document.data().userId);
          });
          const maxId = Math.max(...usersId);
          firestore()
            .collection('Users')
            .doc(`${maxId + 1}`)
            .set({
              userId: maxId + 1,
              userName: username,
              password: password,
              userType: userType == 0 ? 'client' : 'developer',
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
  };

  const onClickOK = () => {
    setShowAlert(false);
    setMessage('');
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomLoading />
        <CustomAlert
          visible={showAlert}
          hideDialog={onClickOK}
          message={message}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Ticket System</Text>
        </View>
        <View style={styles.formContainer}>
          <LoginTextBox
            value={newUser.username}
            label={'Username'}
            onChangeText={v => {
              onValueChange('username', v);
            }}
            error={usernameError}
          />
          <LoginTextBox
            value={newUser.password}
            label={'Password'}
            onChangeText={v => {
              onValueChange('password', v);
            }}
            error={passwordError}
            isSecure={true}
          />
          <LoginTextBox
            value={newUser.confirmPassword}
            label={'Confirm Password'}
            onChangeText={v => {
              onValueChange('confirmPassword', v);
            }}
            error={confirmPasswordError}
            confirm={true}
            isSecure={true}
          />
          <View style={styles.radioButtonContainer}>
            <CustomRadioButton
              data={radioButtonOption}
              value={userType}
              setValue={v => setUserType(v)}
            />
          </View>
          <View style={styles.signUpButton}>
          <CustomButton
            onClick={onClickSignUp}
            text={'Sign Up'}
          />
        </View>
          <View style={styles.singInContainer}>
            <Text style={styles.text}>You already have an account?</Text>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setIsLoading: isLoading => {
      return dispatch(setIsLoading(isLoading));
    },
  };
}

export default connect(null, mapDispatchToProps)(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  headerContainer: {
    width: '100%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: Color.primary,
    fontSize: Size.h1,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '90%',
    height: '50%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textInput: {
    width: '90%',
    height: 50,
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    width: '90%',
    marginBottom: 10,
  },
  signUpButton: {
    width: '90%',
    height: 50,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  signUpText: {
    color: Color.white,
    fontSize: Size.h5,
  },
  singInContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    color: Color.darkGray,
  },
  signInButton: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: Color.primary,
  },
});
