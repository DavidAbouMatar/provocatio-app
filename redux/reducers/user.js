import { State } from "react-native-gesture-handler"
import { SET_LOGIN_STATE } from "../constants/index"
import { USER_STATE_CHANGE,USER_POSTS_STATE_CHANGE } from "../constants"
// import {  } from "../constants/index"
// import { USER_FOLLOWING_STATE_CHANGE } from "../constants/index"

const initialState = {
    isLoggedIn: false,
    // userId: '',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNjE0ODU2NiwiZXhwIjoxNjM2MTUyMTY2LCJuYmYiOjE2MzYxNDg1NjYsImp0aSI6ImYzMXYxOHpubUJhaG9paGQiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.vVj6Gqr4TbpCjsaoJftOjk60u-yfaHJuelwdI-YDiiI',
    currentUser: null,
    usersPosts: [],
    // following: [],
}


// export const user = (state = initialState, action) => {
//     console.log('USER_POSTS_STATE_CHANGE',action)

//     switch(action.type){
     
//         case USER_POSTS_STATE_CHANGE:
            
//                 return {
//                     ...State,
//                     usersPosts: action.usersPosts
//                 }
//         case USER_STATE_CHANGE:
           
            
//             return {
//                 ...State,
//                 currentUser: action.currentUser
//             }
       
//         case SET_LOGIN_STATE:
//             console.log(SET_LOGIN_STATE)
//             return {
//               ...state,
//               ...action.payload, // this is what we expect to get back from API call and login page input
//               isLoggedIn: true, // we set this as true on login
//             };
       
        
            
        
//             // case USER_FOLLOWING_STATE_CHANGE:
//             // return {
//             //     ...State,
//             //     following: action.following
//             // }

//         default:
//         return state;

//     }
// }
export const user = (state = initialState, action) => {
    console.log('USER_POSTS_STATE_CHANGE',action)
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case USER_POSTS_STATE_CHANGE:
            return {
                ...state,
                usersPosts: action.usersPosts
            }

     

        default:
            return state;
    }}

export default user