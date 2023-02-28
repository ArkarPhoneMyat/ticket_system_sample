import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Color, Size} from '../../constants';
import {CustomAlert, CustomButton, LoginTextBox} from '../../components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {setUserInfo} from '../../stores/login/LoginAction';
import {connect} from 'react-redux';

const LoginScreen = props => {
  const {setUserInfo} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userList, setUserList] = useState([]);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getUserData();

      return () => {
        setUsernameError('');
        setPasswordError('');
        setUsername('');
        setPassword('');
        setShowAlert(false);
        setMessage('');
      };
    }, []),
  );

  const getUserData = () => {
    firestore()
      .collection('Users')
      .get()
      .then(query => {
        let users = [];
        query.forEach(document => {
          users.push(document.data());
        });
        setUserList(users);
      });
  };

  // const setUsers = () => {
  //   const user = [
  //     {
  //       userId: 1,
  //       userName: 'Morgan',
  //       password: 'morgan123',
  //       userType: 'client',
  //     },
  //     {
  //       userId: 2,
  //       userName: 'Hervay',
  //       password: 'hervay123',
  //       userType: 'client',
  //     },
  //     {userId: 3, userName: 'Kylie', password: 'kylie123', userType: 'client'},
  //     {
  //       userId: 11,
  //       userName: 'Jade',
  //       password: 'jade123',
  //       userType: 'developer',
  //     },
  //     {
  //       userId: 12,
  //       userName: 'Rudy',
  //       password: 'rudy123',
  //       userType: 'developer',
  //     },
  //     {
  //       userId: 13,
  //       userName: 'Nick',
  //       password: 'nick123',
  //       userType: 'developer',
  //     },
  //   ];
  //   AsyncStorage.removeItem('@Users').then(() => {
  //     AsyncStorage.setItem('@Users', JSON.stringify(user));
  //   });
  // };

  const onUsernameChange = v => {
    if (v != '' || v != null || v != undefined) {
      setUsernameError('');
    }
    setUsername(v);
  };

  const onPasswordChange = v => {
    if (v != '' || v != null || v != undefined) {
      setPasswordError('');
    }
    setPassword(v);
  };

  const onClickSignIn = () => {
    if (username == '') {
      setUsernameError('Please fill username!');
    } else if (password == '') {
      setPasswordError('Please fill password!');
    } else {
      const userExist = userList.filter(
        a =>
          a.userName.toLowerCase() == username.toLowerCase() &&
          a.password.toLowerCase() == password.toLowerCase(),
      );
      if (userExist.length > 0) {
        setUserInfo(userExist[0]);
        navigation.navigate('home');
        setUsername('');
        setPassword('');
      } else {
        setShowAlert(true);
        setMessage('Username or Password is incorrect!');
      }
    }
  };

  const onClickSignUp = () => {
    navigation.navigate('signUp');
    setUsernameError('');
    setPasswordError('');
    setUsername('');
    setPassword('');
  };

  const onClickOK = () => {
    setShowAlert(false);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
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
          value={username}
          label={'Username'}
          onChangeText={v => {
            onUsernameChange(v);
          }}
          error={usernameError}
        />
        <LoginTextBox
          value={password}
          label={'Password'}
          onChangeText={v => {
            onPasswordChange(v);
          }}
          error={passwordError}
          isSecure={true}
        />
        <View style={styles.signInButton}>
          <CustomButton
            onClick={onClickSignIn}
            text={'Sign In'}
          />
        </View>
        <View style={styles.singUpContainer}>
          <Text style={styles.text}>You don't have an account?</Text>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => onClickSignUp()}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setUserInfo: userInfo => {
      dispatch(setUserInfo(userInfo));
    },
  };
}

export default connect(null, mapDispatchToProps)(LoginScreen);

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
    height: '40%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textInput: {
    width: '90%',
    height: 50,
    marginBottom: 10,
  },
  signInButton: {
    width: '90%',
    height: 50,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  signInText: {
    color: Color.white,
    fontSize: Size.h5,
  },
  singUpContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    color: Color.darkGray,
  },
  signUpButton: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: Color.primary,
  },
});
