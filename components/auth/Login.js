
import React,  { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {connect } from 'react-redux'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/index';
import {bindActionCreators } from 'redux'
import { SET_LOGIN_STATE } from "../../redux/constants/index"


// import rootReducer from '../../redux/reducers'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux';

import { createStore, applyMiddleware } from 'redux'

const Login = (props) => {
    // const store = createStore(rootReducer, applyMiddleware(thunk))
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    
    const handleClick = (input) => {
        dispatch(login(input));
    }
    // constructor(props){
    //     super(props);

    //     this.state={
    //         email: '',
    //         passworrd: '',
       
    //     }
    //     this.onLogin = this.onLogin.bind(this)
    // }

 
//     const login = (loginInput) => {
//     // export function login(loginInput) {

//   console.log("PPOSSSYTTT");
//   return (dispatch) => {
 
//     axios
//     .post("http://127.0.0.1:8000/api/login", {
//       email: loginInput["email"]["email"],
//       password: loginInput["password"]["password"]
      
//     }, {headers: {
//       "content-Type": "application/json",
    
//     }})
//     .then(function (response) {
//       dispatch({
//         type: SET_LOGIN_STATE,
//         isLoggedIn: true
//       });
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   };
//   };



    // }
    // const login = () => {
    //     change(true)
    // }

        return(
            <View>
       
                  <TextInput
                    placeholder="email"
                    onChangeText={(email) => setEmail({ email })}
                />
                  <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword({ password })}
                />

                <Button 
                    // onPress={() => this.onLogin()}
                    // onPress={() => useDispatch(login({'username': username, 'password': password }))} 
                    onPress={() => handleClick() } 
                    title = "Login"
                />
            </View>
        )
    }
//     const mapStateToProps = (store) => ({
//         isLoggedIn: store.userState.isLoggedIn,

    
//     })

//       const mapDispatchToProps = dispatch => ({
//         // you will use this to pass it to the props of your component
//         login: () => dispatch(login()),
//       });
//       const mapDispatchProps = (dispatch) => bindActionCreators({login}, dispatch);
      

// export default connect(mapStateToProps, mapDispatchToProps)(Login)



const mapStateToProps = (store) => ({
    isLoggedIn: store.userState.isLoggedIn,
  
})
const mapDispatchProps = (dispatch) => bindActionCreators({ login }, dispatch);


export default connect(mapStateToProps, mapDispatchProps)(Login);
