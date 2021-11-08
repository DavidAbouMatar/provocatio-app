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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNjM2MjU5NCwiZXhwIjoxNjM2MzY2MTk0LCJuYmYiOjE2MzYzNjI1OTQsImp0aSI6ImJYS1Y0MjhFa1BjSXZaYjIiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.CVAk0nRp-nsaUU6j64NchhmlY4u0w0WZXUj-GST2MmA"
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

// export function fetchUser(){
//     return((dispatch) = {
//         try{
//             const res = await axios.get(`http://jsonplaceholder.typicode.com/users`)
//             dispatch( {
//                 type: GET_USERS,
//                 payload: res.data
//             })
//         }
//         catch(e){
//             dispatch( {
//                 type: USERS_ERROR,
//                 payload: console.log(e),
//             })
//         }
//         axios.get(URL, { headers: { Authorization: AuthStr } })
//         .then(response => {
//             // If request is good...
//             console.log(response.data);
//          })
//         .catch((error) => {
//             console.log('error ' + error);
//          });

//     })
// }

export const fetchUserFollowing = () => async (dispatch) => {
  // 11-10
  // return((dispatch) = {

  const res = await axios
    .get("http://127.0.0.1:8000/api/get_user_profile", {
      headers: {
        "content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNDk4MjE5MCwiZXhwIjoxNjM0OTg1NzkwLCJuYmYiOjE2MzQ5ODIxOTAsImp0aSI6IlNvTWFlWlMzeDF2SDNqa2EiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.JTAsaG4q_F7bRgI2OegZqoNvlimW9ImGDen7MyWWwC8"
      }
    })
    .then((response) => {
      //    dispatch( {
      //         type: USER_FOLLOWING_STATE_CHANGE,
      //         following: res.data
      //     })

      console.log(response.data);
    })
    .catch((error) => {
      console.log("error " + error);
    });
  //    dispatch( {
  //         type: USER_FOLLOWING_STATE_CHANGE,
  //         following: res.data
  //     })

  // })
};

//fetch posts and other users
// export function fetchUsersData(uid){
//     return((dispatch, getState) => {

//         const found = getState().usersState.users.some(el => el.uid === uid)
//         if(!found){
//             // 12 - 8
//             //fetch users posts
//             //         axios.get('Web URL')
// // .then(function(response) {
// //     // handle response
// // }).catch(function(error) {
// //     // handle error
// // }).finally(function() {
// //     // always executes at the last of any API call
// // });
//         //FETCH USER DATA USING AXIOS

//         }
//     })
// }

//fetch posts and other users
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

// export const login = (loginInput) => {
//   const data = {
//     email: loginInput["email"]["email"],
//     password: loginInput["password"]["password"]
//   };
//   console.log(loginInput["email"]["email"]);
//   // const { email, password } = loginInput;
//   // return (dispatch) => {  // don't forget to use dispatch here!
//   console.log(data);

//   let res = fetch("http://127.0.0.1:8000/api/login", {
//     method: "POST",
//     headers: {
//       // these could be different for your API call
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   })
//   .then((response) => {
//     console.log(response)
//     });
//   dispatch({
//     type: SET_LOGIN_STATE,
//     isLoggedIn: true
//   });
//   NavigationContainer.navigate("Main");

// };
export const login = (loginInput) => async (dispatch) => {
// export function login(loginInput) {

  console.log("PPOSSSYTTT")
  // return (dispatch) => {
 
    axios.post("http://127.0.0.1:8000/api/login", {
      email: loginInput["email"]["email"],
      password: loginInput["password"]["password"]
      
    }, {headers: {
      "content-Type": "application/json",
    
    }})
    .then(function (response) {
      dispatch({
        type: SET_LOGIN_STATE,
        isLoggedIn: true
      });
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  // };
  };

