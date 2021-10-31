import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
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
import ChatScreen from './components/main/Chat'
import EditProfileScreen from "./components/main/EditProfile";

// import saveScreen from './components/main/Save'
import SaveScreen from "./components/main/Save";
import CommentScreen from "./components/main/Comment";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers/index.js";
import thunk from "redux-thunk";

const persistConfig = {
  key: "user",
  storage: AsyncStorage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();
export default function App(props) {
  const [loaded, setLoaded] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);

  if (loggedIn == false) {
    // console.log("llllllllllllllllllllllllllllll")
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
          <Stack.Screen name="Chat" component={ChatScreen}  navigation={props.navigation}/>
          <Stack.Screen name="Add" component={AddScreen} />
          <Stack.Screen
            name="Save"
            component={SaveScreen}
            navigation={props.navigation}
          />
          <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
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
    </Provider>
  );
}

