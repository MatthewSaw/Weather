import React, { Component } from "react";
import { View, Switch, TouchableOpacity, Text, FlatList, StyleSheet, SafeAreaView, ScrollView, Alert, TextInput, ImageBackground } from "react-native";
import { SettingsModal } from "@components";
import backgroundImage from "../images/images.jpeg";
import { Consumer, Events, Utils, API } from "@services";
import Icon from "react-native-vector-icons/Ionicons";

const cities = [
  {
    city: "Kuala Lumpur",
    lat: 3.1412,
    lon: 101.686531,
  },
  {
    city: "Tokyo",
    lat: 35.689499,
    lon: 139.691711,
  },
  {
    city: "Seoul",
    lat: 37.56826,
    lon: 126.977829,
  },
  {
    city: "London",
    lat: 51.50853,
    lon: -0.12574,
  },
  {
    city: "Melbourne",
    lat: 36.059509,
    lon: -91.908478,
  },
  {
    city: "New York",
    lat: 40.714272,
    lon: -74.005966,
  },
  {
    city: "Los Angeles",
    lat: 9.0125,
    lon: 125.608063,
  },
  {
    city: "Moscow",
    lat: 55.761665,
    lon: 37.606667,
  },
  {
    city: "Mont Kiara",
    lat: 3.166040,
    lon: 101.652580,
  },
];
var dailyWeather = [];
class HomeScreen extends Component{

  constructor(props){
    super(props);

    this.state = {
      searchCity: "",
      city: "Kuala Lumpur",
      temp: "",
      description: "",
      sunrise: "",
      sunset: "",
      humidity: "",
      feels_like: "",
      dailyWeatherArray: [],
      searchBarSwitch:false,
    };

    this.getWeatherForecast(this.state.city);
  }

  getWeatherForecast(city) {
    dailyWeather = [];
    var lat="",lon="";

    for(let i=0; i<cities.length; i++) {
      if(city.toLowerCase() === cities[i].city.toLowerCase()){
        lat = cities[i].lat;
        lon = cities[i].lon;
      }
    }

    API.GetWeatherForecast(lat, lon,
      (response) => {
        if(response!=undefined) {
          this.setState({
            city: city,
            temp: response.current.temp,
            description: response.current.weather[0].description,
            sunrise: response.current.sunrise,
            sunset: response.current.sunset,
            humidity: response.current.humidity,
            feels_like: response.current.feels_like,
            searchBarSwitch: false,
          });

          for(let i=0; i<response.daily.length; i++) {
            dailyWeather.push({
              dt: response.daily[i].dt,
              feels_like_day: response.daily[i].feels_like.day,
              feels_like_eve: response.daily[i].feels_like.eve,
              feels_like_morn: response.daily[i].feels_like.morn,
              feels_like_night: response.daily[i].feels_like.night,
              humidity: response.daily[i].humidity,
              rain: response.daily[i].rain,
              sunrise: response.daily[i].sunrise,
              sunset: response.daily[i].sunset,
              temp_day: response.daily[i].temp.day,
              temp_eve: response.daily[i].temp.eve,
              temp_morn: response.daily[i].temp.morn,
              temp_night: response.daily[i].temp.night,
              temp_max: response.daily[i].temp.max,
              temp_min: response.daily[i].temp.min,
              description: response.daily[i].weather[0].description,
            });
          }
          this.setState({
            dailyWeatherArray: dailyWeather,
          });

        }else{
          Alert.alert(response.message);
        }
      }
    );
  }

  renderCityList(item,theme){
    return(
      <View style={{ paddingTop:10,marginLeft:10,height:50,width:'90%'}}>
        <TouchableOpacity onPress={()=>{this.getWeatherForecast(item.city)}}>
          <Text style={styles.textStyle(theme,20)}>{item.city}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderDailyWeather(item,unit,theme){
    return(
      <View style={{
        flex:0.5, width:'11%',justifyContent:'center',alignItems:'center',marginLeft:5,marginRight:5, borderRadius:15,padding:10,
      }}>
        <Text style={styles.textStyle(theme,20)}>{Utils.unixToDay(item.dt)}</Text>
        <Text style={styles.textStyle(theme,15)}>{Utils.unixToDate(item.dt)}</Text>
        <Text style={styles.textStyle(theme,15)}>{"Temp: "}{this.getTemp(unit,item.temp_max)}{this.tempUnitSwitch(unit)}</Text>
        <Text style={styles.textStyle(theme,15)}>{"Feels like: "}{this.getTemp(unit,item.feels_like_day)}{this.tempUnitSwitch(unit)}</Text>
        <Text style={styles.textStyle(theme,15)}>{"Humidity: "}{item.humidity}{"\u0025"}</Text>
        <Text style={styles.textStyle(theme,15)}>{"Clouds: "}{item.description}</Text>
      </View>
    );
  }

  getTemp(unit,temp){
    if(unit) {
      return Utils.kelvinToCelsius(temp);
    }else{
      return Utils.kelvinToFahrenheit(temp);
    }
  }

  tempUnitSwitch(unit) {
    if(unit){
      return "\u2103";
    }else{
      return "\u2109";
    }
  }

  openSearchBar(){
    (this.state.searchBarSwitch)?this.setState({ searchBarSwitch: false }):this.setState({ searchBarSwitch: true })
  }

  render() {
    const { description, isTheme, temp, city, sunrise, sunset, humidity, feels_like, searchBarSwitch } = this.state;

    return(
      <Consumer>
      {
        value =>
        <SafeAreaView style={styles.mainContainer}>
          <ImageBackground source={backgroundImage} style={styles.backgroundImageContainer}>

          <View style={styles.topCurrentWeatherContainer}>
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={{width:'80%'}}>
              {
                (searchBarSwitch)?
                <View style={styles.searchBarContainer}>
                  <TextInput
                    style={styles.searchTextInput}
                    placeholder={"Search"}
                    onChangeText={(text)=> this.setState({ searchCity: text })}
                  />
                  <TouchableOpacity style={styles.searchButton} onPress={() => this.getWeatherForecast(this.state.searchCity)}>
                    <Icon
                      name="search"
                      size={20}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View> : null
              }
              </View>
              <View style={{width:'10%',padding:5}}>
                {
                  (!searchBarSwitch)?
                  <TouchableOpacity onPress={() => this.openSearchBar()}>
                    <Icon
                      name="search"
                      size={30}
                      color="#000"
                    />
                  </TouchableOpacity>:
                  <TouchableOpacity onPress={()=>this.setState({ searchBarSwitch: false })}>
                    <Icon
                      name="close-circle-outline"
                      size={20}
                      color="#000"
                    />
                  </TouchableOpacity>
                }
              </View>
              <View style={{width:'10%',padding:5}}>
                <TouchableOpacity onPress={()=>Events.openSettingsModal()}>
                  <Icon
                    name="settings-sharp"
                    size={30}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ justifyContent:'center',alignItems:'center'}}>
              <Text style={styles.textStyle(value.theme,40)}>{this.getTemp(value.unit,temp)}{this.tempUnitSwitch(value.unit)}</Text>
              <Text style={styles.textStyle(value.theme,30)}>{city}</Text>
              <View style={{ flexDirection:'row'}}>
                <Icon
                  name="cloud-outline"
                  size={20}
                  color="#000"
                  style={{padding:5}}
                />
                <Text style={styles.textStyle(value.theme,20)}>{description}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={[styles.textStyle(value.theme,15),{padding:5}]}>{"Feels like: "}{this.getTemp(value.unit,feels_like)}{this.tempUnitSwitch(value.unit)}</Text>
                <View style={{ flexDirection:'row'}}>
                  <Icon
                    name="md-umbrella-outline"
                    size={20}
                    color="#000"
                    style={{padding:3}}
                  />
                  <Text style={[styles.textStyle(value.theme,15),{padding:5}]}>{humidity}{"\u0025"}</Text>
                </View>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={[styles.textStyle(value.theme,20),{padding:5}]}>{"Sunrise: "}{Utils.unixToTime(sunrise)}</Text>
                <Text style={[styles.textStyle(value.theme,20),{padding:5}]}>{"Sunset: "}{Utils.unixToTime(sunset)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.middleForecastContainer}>
            <View style={{justifyContent:'center',alignItems:'center',margin:20}}>
              <Text style={styles.textStyle(value.theme,20)}>Future Forecast</Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={this.state.dailyWeatherArray}
              renderItem={({item})=>this.renderDailyWeather(item,value.unit,value.theme)}
            />
          </View>
          <View style={styles.bottomFavouriteCities}>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
              <Text style={[styles.textStyle(value.theme,20),{alignSelf:'center'}]}>{"Favourite Cities"}</Text>
              <TouchableOpacity>
                <Icon
                  name="md-add-circle"
                  size={20}
                  color="#000"
                  style={{padding:3}}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={cities}
              renderItem={({item})=>this.renderCityList(item,value.theme)}
              showsVerticalScrollIndicator={false}
            />
          </View>
          </ImageBackground>
          <SettingsModal/>
        </SafeAreaView>
      }
      </Consumer>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    marginTop:35,
  },
  backgroundImageContainer:{
    width:'100%',
    height:'100%',
    resizeMode:'contain',
  },
  topCurrentWeatherContainer:{
    flex: 0.4,
  },
  middleForecastContainer:{
    flex:0.5,
    marginLeft:20,
    marginRight:20,
  },
  bottomFavouriteCities:{
    flex:0.4,
    marginTop:10,
  },
  searchButton:{
    marginLeft:10,
    marginRight:30,
    marginTop:5,
  },
  textStyle:(theme, size) => ({
    fontSize:size,
    color:(theme)?"black":"white",
  }),
  searchBarContainer:{
    width:'100%',
    marginLeft:10,
    marginRight:10,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingBottom:10,
    backgroundColor:'#d3dbe1',
    borderRadius:25,
    height:40,
    marginTop:10,
  },
  searchTextInput:{
    paddingLeft:30,
    paddingTop:5,
    height:40,
    width:'90%',
    // borderBottomWidth:1,
    // borderBottomColor:'black',
  },
});

export default HomeScreen;
