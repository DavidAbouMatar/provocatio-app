import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from "redux-persist";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add'
import saveScreen from './components/main/Save'
import CommentScreen from './components/main/Comment'
import {Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers/index.js'
import thunk from 'redux-thunk'

const persistConfig = {
  key: "user",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(rootReducer, applyMiddleware(thunk))


const Stack = createStackNavigator();
export default function App() {
  const [loaded, setLoaded] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);
 
  if(loggedIn == false){
    // console.log("llllllllllllllllllllllllllllll")
  return (

    <NavigationContainer>
     
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
 
  );
}
  return (
    <Provider store={store}>
      <NavigationContainer>
      {/* navigation={this.props.navigation} */}
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Add" component={AddScreen} />
        <Stack.Screen name="save" component={saveScreen}  />
        <Stack.Screen name="Comment" component={CommentScreen}  />

      </Stack.Navigator>

    </NavigationContainer>
    </Provider>
  
   );
}



