import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import Consumer from '../services/Context';
export default class ProfileScreen extends PureComponent{

  constructor(props){
    super(props);

    this.state = {
      isUnit: true,
      isTheme: true,
    }
  }

  toggleUnit = (value) => {
    this.setState({ isUnit: value });
  }

  toggleTheme = (value) => {
    this.setState({ isTheme: value });
  }

  render() {
    const { navigation } = this.props
    const { isUnit, isTheme } = this.state;

    return(
      <Consumer>
        {
          value =>
          <View style={{flex:1,marginTop:35, justifyContent:'center',alignItems:'center'}}>
            <View style={{ flexDirection:'row', padding:5 }}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isUnit ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(state) => value.toggleUnit(state)}
                value={value.unit}
              />
              {
                (value.unit)?<Text>Celsius</Text>:<Text>Fahrenheit</Text>
              }
            </View>
            <View style={{ flexDirection:'row', padding:5 }}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isTheme ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(state) => value.toggleTheme(state)}
                value={value.theme}
              />
              {
                (value.theme)?<Text>Light</Text>:<Text>Dark</Text>
              }
            </View>
          </View>
        }
      </Consumer>
    );
  }
}


// <Stack.Navigator>
//   <Stack.Screen name="UserProfile" component={UserProfile} options={{ title: "User Profile"}}/>
//   <Stack.Screen name="LocationProfile" component={LocationProfile} options={{ title: "Location Profile"}}/>
// </Stack.Navigator>

// <TouchableOpacity onPress={() => navigation.navigate("UserProfile") }>
//   <Text>Profile</Text>
// </TouchableOpacity>
// <TouchableOpacity onPress={() => navigation.navigate("LocationProfile") }>
//   <Text>Location</Text>
// </TouchableOpacity>
