import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import store from './utils/redux/store';
import {Provider, useSelector} from 'react-redux';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {Home} from './pages';

const MainApp = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}
const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({});
