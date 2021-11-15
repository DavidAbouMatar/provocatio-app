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

  //get all users similar to input
  const fetchUsers = (search) => {
    setSearch(search);
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
          const data = responseData[key];

          const id = data.id;
          return { id, ...data };
        });
        setUsers(users);
      });
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
      />

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
              <Avatar source={{ uri: item.profile_picture_path }} rounded />
              <ListItem.Content>
                <ListItem.Title>{`${item.first_name} ${item.last_name}`}</ListItem.Title>
                <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  token: store.userState.token
});

export default connect(mapStateToProps, null)(Search);
