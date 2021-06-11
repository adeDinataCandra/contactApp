import React from 'react';
import {StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import Store from './redux/store';
import {Provider} from 'react-redux';

const MainApp = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}
const App = () => {
  return (
    <Provider store={Store}>
         <MainApp />
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({});
