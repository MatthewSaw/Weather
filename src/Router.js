import React from 'react';
import { View, StatusBar } from "react-native";
import { MainNavigation } from "@navigation";

export default class Router extends React.PureComponent{

  render() {
    return(
      <View style={{flexGrow:1}}>
        <MainNavigation/>
      </View>
    );
  }
}
