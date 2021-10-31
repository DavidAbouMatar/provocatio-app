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
// import TouchableScale from 'react-native-touchable-scale'; 
import { LinearGradient } from 'expo-linear-gradient'; 

const ChatList = (props) => {
  const [chats, setChats] = useState("");

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/getallchat", {
      headers: {
        "content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNTcxMzIwMiwiZXhwIjoxNjM1NzE2ODAyLCJuYmYiOjE2MzU3MTMyMDIsImp0aSI6IjVhRDJLRXJadm5wRGxEZTkiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.X-KVtKG59LiM0otk1ccgsTUHotW5bR_YytgDCOMJMyA"
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
              <ListItem bottomDivider
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
                <Avatar source={{uri: "https://placeimg.com/140/140/any"}} rounded />
                <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold' }}>{item.first_name}</ListItem.Title>
                <ListItem.Subtitle >{item.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="white" />
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff"
  }
});
