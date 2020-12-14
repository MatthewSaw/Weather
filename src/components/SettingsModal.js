import React, { Component } from "react";
import { View, Switch, Platform, Dimensions, TouchableOpacity, Text, I18nManager, StyleSheet, SafeAreaView, TextInput } from "react-native";
import { Consumer, Events } from "@services";
import Modal from 'react-native-translucent-modal';
import Icon from "react-native-vector-icons/Ionicons";
const { width, height } = Dimensions.get("window");
export default class SettingsModal extends Component{

  constructor(props){
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount(){
    Events.onOpenSettingsModal(this.open);
  }

  open = () => {
    this.setState({
      visible:true,
    });
  }

  close = () => {
    this.setState({
      visible:false,
    });
  }

  render(){
    return(
      <Consumer>
      {
        value =>
        <Modal
          animationType="slide"
          animationDuration={100}
          visible={this.state.visible}
          backdropOpacity={Platform.OS === "android" ? 0.9 : 0.5}
          position="top"
          backdropPressToClose={false}
          swipeToClose={false}
          style={[
            typeof type !== "undefined"
              ? styles.modalReadlater
              : styles.modalBoxWrap,
          ]}
          >
          <View style={{flex:1,borderWidth:1,borderColor:'red'}}>
            <View style={{ alignItems:'flex-end', padding:40,paddingRight:10}}>
              <TouchableOpacity onPress={()=>this.close()}>
                <Icon
                  name="close-circle-outline"
                  size={30}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.wrap, { marginBottom:20,paddingBottom:20}]}>
              <View style={{ flexDirection:'row', padding:5 }}>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={value.unit ? "#f5dd4b" : "#f4f3f4"}
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
                  thumbColor={value.theme ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(state) => value.toggleTheme(state)}
                  value={value.theme}
                />
                {
                  (value.theme)?<Text>Light</Text>:<Text>Dark</Text>
                }
              </View>
            </View>
          </View>
        </Modal>
      }
      </Consumer>
    );
  }
}
const styles = StyleSheet.create({
    wrap: {
      flex:1,
      zIndex: 9999,
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255, 1)",
      borderRadius: 6,
    },
    modalBoxWrap: {
      position: "absolute",
      borderRadius: 6,
      top: (height * 6) / 100,
      width: 100,//(width * 99) / 100,
      height: 200,//(height * 77) / 100,
      flex: 1,
      backgroundColor: "transparent",
      zIndex: 10,
      right: I18nManager.isRTL ? 0 : null,
    },
    modalReadlater: {
      position: "absolute",
      borderRadius: 6,
      width: width - 20,
      top: (height * 2) / 100,
      flex: 1,
      backgroundColor: "transparent",
      zIndex: 9999,
      right: I18nManager.isRTL ? 0 : null,
    },
});
