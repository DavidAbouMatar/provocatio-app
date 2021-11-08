import React, { Component } from 'react'
import {View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect } from 'react-redux'
import {bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts, fetchUsersData } from '../redux/actions/index'

import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import Searchcreen from './main/Search'
import testhcreen from './main/test'

import ChatListScreen from './main/ChatList'


const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
    return(null)
}

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchUsersData();
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
        const { usersPosts } = this.props;
       


        console.log("posts",this.props)
        console.log("currentUser",currentUser)
        console.log("currentUser",usersPosts)
       
    
        // console.log("ffff", currentUser.gender);
        // store.getState();
        if(currentUser =='undefind' ){

            return(
                <View></View>
            )
        }
       
       
        return (
            <View style={{ flex: 1 }}>
            <Tab.Navigator initialRouteName="Feed" labeled={false} >
            <Tab.Screen name="Feed" component={FeedScreen}
                options={{
                   
                 
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name="home"   activeColor="#f0edf6"
                        inactiveColor="#3e2465" color={color} size={26}/>
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
            <Tab.Screen name="Chat List" component={ChatListScreen}
            listeners={({ navigation }) =>({
                tabPress: event => {
                    event.preventDefault();
                    navigation.navigate("Chat List")
                }
            })}
                options={{
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name="message" color={color} size={26}/>
                    ),
            }} />

             <Tab.Screen name="Profile" component={ProfileScreen}
             options={{ title: 'My home' }}
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
          </View>
        )
    }

}

// const mapStateToProps = (store) => ({
//     currentUser: store.userstate
    
// })
// const mapStateToProps = (store) => ({
//     currentUser: store.userState.currentUser,
//     // posts: store.userState.posts,
//     following: store.userState.following,
//     users: store.userState.users,
//     usersFollowingLoaded: store.userState.usersFollowingLoaded,

// })
// const mapDispatchProps = (dispatch) => bindActionCreators({fetchUserPosts,fetchUser, fetchUserFollowing}, dispatch);

// export default connect(mapStateToProps, mapDispatchProps)(Main);
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    usersPosts: store.userState.usersPosts,
  
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts, fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
