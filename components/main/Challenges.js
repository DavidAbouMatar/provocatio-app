import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity
} from "react-native";
import { ListItem, Icon, Avatar } from "react-native-elements";
import axios from "axios";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modalbox";
import { Camera } from "expo-camera";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const Challenges = (props) => {
  const [challenges, setChallenges] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(false);
  const { token } = props;

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/get_challenges", {
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });

    setChallenges(res.data[0].challenge);
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
        fetchChallenges();
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
    <View style={styles.container}>
      <Modal
        isOpen={modalVisible}
        style={{
          height: 100
        }}
        backdropPressToClose={false}
        swipeToClose={false}
        position="center"
        coverScreen={false}
        swipeArea={60}
      >
        <Card>
          <Card.Content>
            <Title>Discription</Title>
            <Paragraph> {description[0]}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => setModalVisible(false)}>Cancel</Button>
            <Button onPress={() => pickImage()}>Done</Button>
          </Card.Actions>
        </Card>
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
              friction={90}
              tension={100}
              activeScale={0.95}
              style={{
                paddingTop: 4
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
                <ListItem.Title style={{ fontWeight: "bold", color: "white" }}>
                  {item.first_name}
                </ListItem.Title>
                <ListItem.Content
                  style={{
                    color: "white"
                  }}
                >
                  {item.pivot.discription}
                </ListItem.Content>
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

    backgroundColor: "#ffffff"
  }
});

const mapStateToProps = (store) => ({
  token: store.userState.token
});

export default connect(mapStateToProps, null)(Challenges);
