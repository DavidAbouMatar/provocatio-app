import { State } from "react-native-gesture-handler"
// import { SET_LOGIN_STATE } from "../constants/index"
import { USER_STATE_CHANGE,USER_POSTS_STATE_CHANGE } from "../constants"
// import {  } from "../constants/index"
// import { USER_FOLLOWING_STATE_CHANGE } from "../constants/index"

const initialState = {
    // isLoggedIn: false,
    // userId: '',
    // token: '',
    currentUser: null,
    usersPosts: null,
    // following: [],
}


export const user = (state = initialState, action) => {
    console.log(state)
    switch(action.type){
        case USER_POSTS_STATE_CHANGE:
            console.log('USER_POSTS_STATE_CHANGE')
                return {
                    ...State,
                    usersPosts: action.usersPosts
                }
        case USER_STATE_CHANGE:
           
            
            return {
                ...State,
                currentUser: action.currentUser
            }
       
        // case SET_LOGIN_STATE:
        //     return {
        //       ...state,
        //       ...action.payload, // this is what we expect to get back from API call and login page input
        //       isLoggedIn: true, // we set this as true on login
        //     };
       
        
            
        
            // case USER_FOLLOWING_STATE_CHANGE:
            // return {
            //     ...State,
            //     following: action.following
            // }

        default:
        return state;

    }
}

export default user