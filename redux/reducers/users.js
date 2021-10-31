import { State } from "react-native-gesture-handler"
import { USERS_DATA_STATE_CHANGE } from "../constants/index"
import { USERS_POSTS_STATE_CHANGE } from "../constants/index"

const initialState = {
    usersPosts: null,
    feed: 0,
}

// export const users = (state = initialState, action) => {
//     switch(action.type){
        
      
//         case USERS_DATA_STATE_CHANGE:
//             console.log('USER_STATE_CHANGE')
//             return {
//                 ...State,
//                 usersPosts: action.usersPosts
//             }
        
//         default:
//         return state;

//     }
// }