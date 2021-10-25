import React, { Component } from 'react'
import {view, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect } from 'react-redux'
import {bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts, fetchUserFollowing } from '../redux/actions/index'

import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import Searchcreen from './main/Search'
import ChatScreen from './main/Chat'

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
    return(null)
}

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
        // this.props.fetchUserPosts();
        // await this.this.props.fetchUserPost/s();
  
        
    // this.props.fetchUserFollowing();

    }

    // componentWillMount(){
    //     this.props.fetchUser();
    //     this.props.fetchUserPosts();
  
        
    // // this.props.fetchUserFollowing();

    // }
 
    render() {
        const { currentUser } = this.props;
        const { posts } = this.props;
       


        console.log("posts",this.posts)
        console.log("currentUser",currentUser)
       
    
        // console.log("ffff", currentUser.gender);
        // store.getState();
        if(currentUser =='undefind' ){

            return(
                <View></View>
            )
        }
       
       
        return (
      
            <Tab.Navigator initialRouteName="Feed" labeled={false}>
            <Tab.Screen name="Feed" component={FeedScreen}
                options={{
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
            }} />
            <Tab.Screen name="Search" component={Searchcreen} navigation={this.props.navigation}
                options={{
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                    ),
            }} />   

            <Tab.Screen name="AddContainer" component={EmptyScreen}
            listeners={({ navigation }) =>({
                tabPress: event => {
                    event.preventDefault();
                    navigation.navigate("Add")
                }
            })}
                options={{
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                    ),
            }} />
            <Tab.Screen name="Chat" component={ChatScreen}
            listeners={({ navigation }) =>({
                tabPress: event => {
                    event.preventDefault();
                    navigation.navigate("Chat")
                }
            })}
                options={{
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                    ),
            }} />

             <Tab.Screen name="Profile" component={ProfileScreen}
              listeners={({ navigation }) =>({
                tabPress: event => {
                    event.preventDefault();
                    navigation.navigate("Profile", {uid: currentUser.id})
                }
           })}
                
                options={{
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                    ),
            }} />
          </Tab.Navigator>
        )
    }

}

// const mapStateToProps = (store) => ({
//     currentUser: store.userstate
    
// })
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    // posts: store.userState.posts,
    following: store.userState.following,
    users: store.userState.users,
    usersFollowingLoaded: store.userState.usersFollowingLoaded,

})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUserPosts,fetchUser, fetchUserFollowing}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
