import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
// import TouchableScale from 'react-native-touchable-scale';
import { LinearGradient } from "expo-linear-gradient";

const ChatList = (props) => {
  const [chats, setChats] = useState("");
  const { token } = props;
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/getallchat", {
      headers: {
        "content-Type": "application/json",
        Authorization:
          "Bearer " + token
      }
    });

    setChats(res.data);

    console.log("ssssssss", res.data);
  };
  return (
    <View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Chat", { uid: item.pivot.id })
            }
          >
            <ListItem
              bottomDivider
              // Component={TouchableScale}
              // friction={90} //
              // tension={100} // These props are passed to the parent component (here TouchableScale)
              // activeScale={0.95} //
              // linearGradientProps={{
              //   colors: ['#08c8f6', '#4d5dfb'],
              //   start: { x: 1, y: 0 },
              //   end: { x: 0.2, y: 0 },
              // }}
              // ViewComponent={LinearGradient} // Only if no expo
            >
              <Avatar
                source={{ uri: item.profile_picture_path }}
                rounded
              />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "bold" }}>
                  {item.first_name}
                </ListItem.Title>
                <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="white" />
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff"
  }
});
const mapStateToProps = (store) => ({
  token: store.userState.token,
});

export default connect(mapStateToProps, null)(ChatList);
