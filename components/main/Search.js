import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity
} from "react-native";
import { ListItem, SearchBar, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";

function Search(props) {
  const [user, setUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const { token } = props;

  const fetchUsers = (search) => {
    setSearch(search);
    // console.log(search);
    fetch("http://127.0.0.1:8000/api/search/" + search, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        "content-Type": "application/json",
        Authorization: "Bearer " + token
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        let users = Object.keys(responseData).map(function (key) {
          // let user = users[key];

          const data = responseData[key];

          const id = data.id;
          // console.log("res", responseData[key]);
          return { id, ...data };
        });
        setUsers(users);

        // console.log("user", users);

        //     let users =data.map((responseData) => {
        // //    let users = responseData.services.map(doc => {
        //        const data = doc.data();
        //        const id = doc.id;
        //        return {id, ...data }
        //    });
      });
    //postint with axios to login
    // axios.post(url, params,{

    //     "headers": {

    //     "content-type": "application/json",

    //     },

    //     })
    //     .then(function(response) {

    //     console.log(response);

    //     })

    //     .catch(function(error) {

    //     console.log(error);

    //     });

    //     };
  };
  return (
    <View>
      <SearchBar
        containerStyle={{ backgroundColor: "#0066FF" }}
        placeholder="Search"
        onChangeText={(search) => fetchUsers(search)}
        value={search}
        lightTheme
        round
        // lightTheme={true}
      />

      {/* <TextInput 
            // placeholder="Search"
            // onChangeText={(search) => fetchUsers(search)} /> */}

      <FlatList
        numColumns={1}
        horizantal={false}
        data={user}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Profile", { uid: item.id })
            }
          >
            <ListItem bottomDivider>
              <Avatar
                source={{ uri: item.profile_picture_path  }}
                rounded
              />
              <ListItem.Content>
                <ListItem.Title>{`${item.first_name} ${item.last_name}`}</ListItem.Title>
                <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
          // </View>
        )}
      />
    </View>
  );
}
const mapStateToProps = (store) => ({
  // usersPosts: store.userState.usersPosts,
  currentUser: store.userState.currentUser,
  token: store.userState.token

  // following: store.userState.following,
});

export default connect(mapStateToProps, null)(Search);
