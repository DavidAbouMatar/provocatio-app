
import React,  { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {connect } from 'react-redux'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/index';
// import rootReducer from '../../redux/reducers'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux';

import { createStore, applyMiddleware } from 'redux'

const Login = (props) => {
    // const store = createStore(rootReducer, applyMiddleware(thunk))
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // constructor(props){
    //     super(props);

    //     this.state={
    //         email: '',
    //         passworrd: '',
       
    //     }
    //     this.onLogin = this.onLogin.bind(this)
    // }


    const Login = () => {
        // const { email, password} =this.state;
        // store.
        //postint with axios to login
        // axios.post(url, params,{

        //     "headers": {
            
        //     "content-type": "application/json",
            
        //     },
            
        //     })
        //     .then(function(response) {
            
        //     console.log(response);
            
        //     })
            
        //     .catch(function(error) {
            
        //     console.log(error);
            
        //     });
            
        //     };

    }

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
                    onPress={() =>login({ email, password })} 
                    title = "Login"
                />
            </View>
        )
    }
    const mapStateToProps = (store) => ({
        currentUser: store.userState.currentUser,

    
    })

      const mapDispatchToProps = dispatch => ({
        // you will use this to pass it to the props of your component
        login: () => dispatch(login()),
      });
      const mapDispatchProps = (dispatch) => bindActionCreators({login, fetchUserPosts, fetchUserFollowing}, dispatch);
      

export default connect(mapStateToProps, mapDispatchToProps)(Login)