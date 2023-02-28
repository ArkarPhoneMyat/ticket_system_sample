import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AddFeedback,
  HomeScreen,
  LoginScreen,
  SignUpScreen,
} from './src/screens';
import {Provider as PaperProvider} from 'react-native-paper';
import {createStore, applyMiddleware} from 'redux';
import {Provider as ReduxProvider} from 'react-redux';
import thunk from 'redux-thunk';
import RootReducer from './src/stores/RootReducer';

const Stack = createNativeStackNavigator();

const store = createStore(RootReducer, applyMiddleware(thunk));

function App() {
  return (
    <PaperProvider>
      <ReduxProvider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="login"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="signUp" component={SignUpScreen} />
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="addFeedback" component={AddFeedback} />
          </Stack.Navigator>
        </NavigationContainer>
      </ReduxProvider>
    </PaperProvider>
  );
}

export default App;
