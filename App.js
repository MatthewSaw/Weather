/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Router from "./src/Router";
import {ContextProvider} from "./src/services/Context";

export default class App extends Component{
  render(){
    console.disableYellowBox = true;
    return(
      <ContextProvider>
        <Router/>
      </ContextProvider>
    );
  }
};
