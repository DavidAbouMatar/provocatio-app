import { State } from "react-native-gesture-handler"
import { SET_LOGIN_STATE } from "../constants/index"
import { USER_STATE_CHANGE,USER_POSTS_STATE_CHANGE } from "../constants"
// import {  } from "../constants/index"
// import { USER_FOLLOWING_STATE_CHANGE } from "../constants/index"

const initialState = {
    isLoggedIn: false,
    // userId: '',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNjcyNDk0NCwiZXhwIjoxNjM2NzI4NTQ1LCJuYmYiOjE2MzY3MjQ5NDUsImp0aSI6IldPdVZ0ZHpuQjRuM0N6VFIiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.pwZSz22ayx95RFWPcKKdbjGQloxi0kQaYOskh70s0ks',
    currentUser: null,
    usersPosts: null,

}


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