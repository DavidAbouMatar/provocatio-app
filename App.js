import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
import AddScreen from "./components/main/Add";
import ChatScreen from "./components/main/Chat";
import EditProfileScreen from "./components/main/EditProfile";
import ChallengesScreen from "./components/main/Challenges";
// import testhcreen from "./components/main/test";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-paper-toast';
import CommentScreen from "./components/main/Comment";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers/index.js";
import thunk from "redux-thunk";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();
export default function App(props) {
  const [loaded, setLoaded] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);

  const change = (value) => {
    setLoggedIn(value);
  };

  const registerForPushNotifications = async () => { 
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }

  if (loggedIn == false) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <Provider store={store}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={DefaultTheme}>
        <ToastProvider>
      <NavigationContainer>
        {/* navigation={this.props.navigation} */}
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{
              title: "Provocatio",
              headerStyle: {
                backgroundColor: "#0066FF"
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold"
              }
            }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            navigation={props.navigation}
          />
          <Stack.Screen name="Add" component={AddScreen} />
       
          <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
          <Stack.Screen name="Challenges" component={ChallengesScreen} />
          <Stack.Screen
            name="Comment"
            component={CommentScreen}
            options={{
              headerStyle: {
                backgroundColor: "#0066FF"
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ToastProvider>
      </PaperProvider>
    </SafeAreaProvider>
    </Provider>
  );
}
