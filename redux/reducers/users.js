import { State } from "react-native-gesture-handler"
import { USERS_DATA_STATE_CHANGE } from "../constants/index"
// import { USERS_POSTS_STATE_CHANGE } from "../constants/index"

const initialState = {
    users: [],
    usersFollowingLoaded: 0,
}

// export const users = (state = initialState, action) => {
//     switch(action.type){
//         case USERS_DATA_STATE_CHANGE:
//             return {
//                 ...State,
//                 users: [...state.users, action.user]
//             }
//         case USERS_POSTS_STATE_CHANGE:
//             return {
//                 ...State,
//                 usersFollowingLoaded: state.usersFollowingLoaded + 1,
//                 users: state.users.map(user => user.uid === action.uid ?
//                     {...user, posts: action.posts}:
//                     user)
//             }
          
//         default:
//         return state;

//     }
// }