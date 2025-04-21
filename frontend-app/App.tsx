import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
const App = () => {
  return (
    <>
      <NavigationContainer>
        <Toast
        />
        <Home />
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
