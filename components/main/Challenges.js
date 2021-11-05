import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
// import TouchableScale from 'react-native-touchable-scale';
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modalbox";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const Challenges = (props) => {
  const [challenges, setChallenges] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(false);
  const { token } = props;

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/get_challenges", {
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });

    setChallenges(res.data[0].challenges);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true
    });
    setImage(result.base64);
    axios
      .post(
        "http://127.0.0.1:8000/api/challenge_done",
        {
          image: result.base64,
          uid: description[2]
        },
        {
          headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        }
      )
      .then(function (response) {
        setModalVisible(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const passToModal = (description, name, uid) => {
    setModalVisible(false);
    setDescription([description, name, uid]);
    setModalVisible(true);
  };
  return (
    <View>
      <Modal isOpen={modalVisible}>
        <View style={{ flex: 1 / 2, alignItems: "center" }}>
          <Text
            style={{
              width: "90%",
              borderRadius: 10,
              border: 1,
              padding: 5
            }}
          >
            {description[0]}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                borderRadius: 5,
                width: 120,
                height: 40,
                margin: 4,
                backgroundColor: "blue",
                textAlign: "center",
                alignItems: "center",
                textAlignVertical: "center",
                alignSelf: "flex-start"
              }}
              onPress={() => pickImage()}
            >
              <Text style={{ color: "white" }}> Done </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 5,
                width: 50,
                height: 40,
                backgroundColor: "red",
                margin: 7,
                textAlign: "center",
                alignItems: "center",
                textAlignVertical: "center",
                alignSelf: "flex-end"
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "white" }}> cancel </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              passToModal(item.pivot.discription, item.name, item.pivot.id)
            }
          >
            <ListItem
              bottomDivider
              style={{
                paddingTop: 3
              }}
              linearGradientProps={{
                colors: ["#08c8f6", "#4d5dfb"],
                start: { x: 1, y: 0 },
                end: { x: 0.2, y: 0 }
              }}
              ViewComponent={LinearGradient} // Only if no expo
            >
              <Avatar
                source={{ uri: "https://placeimg.com/140/140/any" }}
                rounded
              />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "bold" }}>
                  {item.first_name}
                </ListItem.Title>
                <ListItem.Content>{item.pivot.discription}</ListItem.Content>
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
  token: store.userState.token
});

export default connect(mapStateToProps, null)(Challenges);
