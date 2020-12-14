import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import UserProfile from "./UserProfile";
import LocationProfile from "./LocationProfile";

// const Stack = createStackNavigator();
// const MainNavigation = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{
//           headerStyle: {
//             backgroundColor: '#f4511e',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold'
//           },
//         }}
//       >
//         <Stack.Screen
//           name="HomeScreen"
//           component={HomeScreen}
//           options={{ title: "Wallet"}}
//         />
//         <Stack.Screen
//           name="ProfileScreen"
//           component={ProfileScreen}
//           options={{ title: "Profile"}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

const Tab = createBottomTabNavigator();

const MainTabNavigation = () => {
  return(
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size}) => {
            let iconName;

            if(route.name === 'Home') {
              iconName = 'ios-information-circle';
            }else if (route.name === 'Profile') {
              iconName = 'ios-list';
            }
            return <Ionicons name={iconName} size={size} color={color}/>;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Weather" ,
          }}/>
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarLabel: "Profile"}}/>
      </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

const MainNavigation = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName={HomeScreen} screenOptions={{ headerShown:false }}>
        <Stack.Screen name="Weather" component={HomeScreen} options={{ title: "Home" }}/>
        {
        // <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }}/>
        // <Stack.Screen name="UserProfile" component={UserProfile} options={{ title: "User Profile" }}/>
        // <Stack.Screen name="LocationProfile" component={LocationProfile} options={{ title: "Location" }}/>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const getHeaderTitle = ({route}) => {
  if(route === "Home") {
    return "Home";
  }else if(route === "Profile") {
    return "Profile";
  }
}



export { MainNavigation };
