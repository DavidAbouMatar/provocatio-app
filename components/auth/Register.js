
import React, {Component} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export class Register extends Component{
    constructor(props){
        super(props);

        this.state={
            email: '',
            passworrd: '',
            name: '',
            last_name: '',
        }
        this.onSignUp = this.onSignUp.bind(this)
    }


    onSignUp(){
        const { email, password, name, last_name} =this.state;
        //postint with axios to signup
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
    render(){
        return(
            <View>
                <TextInput
                    placeholder="name"
                    onChangeText={(name) => this.setstate({ name })}
                />
                <TextInput
                    placeholder="last name"
                    onChangeText={(name) => this.setstate({ last_name })}
                />
                  <TextInput
                    placeholder="email"
                    onChangeText={(name) => this.setstate({ email })}
                />
                  <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(name) => this.setstate({ password })}
                />

                <Button 
                    onPress={() => this.onSignUp()}
                    title = "Sign UP"
                />
            </View>
        )
    }
}

export default Register