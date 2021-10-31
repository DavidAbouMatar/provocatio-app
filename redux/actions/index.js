import { Alert } from "react-native";
import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE
} from "../constants/index";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
//3 -17

export function fetchUserPosts() {
  // console.log("PPOSSSYTTT")
  // 9-12
  return (dispatch) => {
    axios
      .get("http://127.0.0.1:8000/api/get_user_Posts", {
        headers: {
          "content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNTU1MzcwOCwiZXhwIjoxNjM1NTU3MzA4LCJuYmYiOjE2MzU1NTM3MDgsImp0aSI6Ik1TMlh5RGl4ZkNnZ0JRc2ciLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.NonQ2GUdVllPKcGmdW-V3LXtAt1vxcbDJiojfk_RKLQ"
        }
      })
      .then((response) => {
        let posts = response.data.map((dat) => {
          const users = dat.posts;

          const id = dat.id;

          return { id, ...users };
        });

        dispatch({
          type: USER_POSTS_STATE_CHANGE,
          posts: posts
        });
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
    axios
      .get("http://127.0.0.1:8000/api/current_user", {
        headers: {
          "content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNTU1MzcwOCwiZXhwIjoxNjM1NTU3MzA4LCJuYmYiOjE2MzU1NTM3MDgsImp0aSI6Ik1TMlh5RGl4ZkNnZ0JRc2ciLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.NonQ2GUdVllPKcGmdW-V3LXtAt1vxcbDJiojfk_RKLQ"
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
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNTU1MzcwOCwiZXhwIjoxNjM1NTU3MzA4LCJuYmYiOjE2MzU1NTM3MDgsImp0aSI6Ik1TMlh5RGl4ZkNnZ0JRc2ciLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.NonQ2GUdVllPKcGmdW-V3LXtAt1vxcbDJiojfk_RKLQ"
        }
      })

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

export const login = (loginInput) => {
  const data = {
    email: loginInput["email"]["email"],
    password: loginInput["password"]["password"]
  };
  console.log(loginInput["email"]["email"]);
  // const { email, password } = loginInput;
  // return (dispatch) => {  // don't forget to use dispatch here!
  console.log(data);

  let res = fetch("http://127.0.0.1:8000/api/login", {
    method: "POST",
    headers: {
      // these could be different for your API call
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  dispatch(
    initialState({
      type: USER_STATE_CHANGE,
      currentUser: res.data
    })
  );
  NavigationContainer.navigate("Main");
  // .then((response) => response.json())

  // .then((json) => {
  //   if (json) { // response success checking logic could differ
  //     // dispatch(setLoginState({ ...json, userId: username })); // our action is called here
  //     res = json

  //     console.log(loginInput);
  //   } else {

  //     Alert.alert('Login Failed', 'Username or Password is incorrect');
  //   }
  // })
  // .catch((err) => {
  //     console.log("fffffffff");
  //   Alert.alert('Login Failed', 'Some error occured, please retry');
  //   console.log(err);
  // });
};
