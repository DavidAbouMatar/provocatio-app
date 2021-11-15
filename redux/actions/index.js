import { Alert } from "react-native";
import {
  SET_LOGIN_STATE,
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE
} from "../constants/index";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
//3 -17
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNjcyNDk0NCwiZXhwIjoxNjM2NzI4NTQ1LCJuYmYiOjE2MzY3MjQ5NDUsImp0aSI6IldPdVZ0ZHpuQjRuM0N6VFIiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.pwZSz22ayx95RFWPcKKdbjGQloxi0kQaYOskh70s0ks"
export function fetchUserPosts() {
  // console.log("PPOSSSYTTT")
  // 9-12
  return (dispatch) => {
    axios
      .get("http://127.0.0.1:8000/api/get_user_Posts", {
        headers: {
          "content-Type": "application/json",
          Authorization:
            "Bearer " + token
        }
      })
      .then((response) => {
        let posts = response.data.map((dat) => {
          const users = dat.posts;

          const id = dat.id;

          return { id, ...users };
        });

        // dispatch({
        //   type: USER_POSTS_STATE_CHANGE,
        //   usersPosts: posts
        // });
        console.log("fetchUserPosts", posts);

        console.log("response", posts);
      })
      .catch((error) => {
        console.log("error ", error);
      });
  };
}

export function fetchUser() {
  console.log("PPOSSSYTTT");
  return (dispatch) => {
    console.log("PPOSSSYTT2");
   return  axios
      .get("http://127.0.0.1:8000/api/current_user", {
        headers: {
          "content-Type": "application/json",
          Authorization:
            "Bearer " + token
        }
      })
      .then((response) => {
        dispatch({
          type: USER_STATE_CHANGE,
          currentUser: response.data
        });
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };
}

export function fetchUsersData() {
  return (dispatch) => {
    axios
      .get("http://127.0.0.1:8000/api/get_posts", {
        headers: {
          "content-Type": "application/json",
          Authorization:
            "Bearer "+ token
      }})

      .then((response) => {
        dispatch({ type: USER_POSTS_STATE_CHANGE, usersPosts: response.data });
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };
}



export const fetchUserFollowing = () => async (dispatch) => {


  const res = await axios
    .get("http://127.0.0.1:8000/api/get_user_profile", {
      headers: {
        "content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNDk4MjE5MCwiZXhwIjoxNjM0OTg1NzkwLCJuYmYiOjE2MzQ5ODIxOTAsImp0aSI6IlNvTWFlWlMzeDF2SDNqa2EiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.JTAsaG4q_F7bRgI2OegZqoNvlimW9ImGDen7MyWWwC8"
      }
    })
    .then((response) => {

      console.log(response.data);
    })
    .catch((error) => {
      console.log("error " + error);
    });

};


export function fetchUsersFollowingPosts(uid) {
  return (dispatch, getState) => {
    // const found = getState().usersState.users.fi(el => el.uid === uid)
    // if(!found){
    // 12 - 8
    //fetch users posts
    //         axios.get('Web URL')
    // .then(function(response) {
    //     // handle response
    // }).catch(function(error) {
    //     // handle error
    // }).finally(function() {
    //     // always executes at the last of any API call
    // });
    //FETCH USER DATA USING AXIOS
    // }
  };
}


// export const login = (loginInput) => async (dispatch) => {
// // export function login(loginInput) {

//   console.log("PPOSSSYTTT")
//   // return (dispatch) => {
 
//     axios.post("http://127.0.0.1:8000/api/login", {
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

//   // };
//   };

