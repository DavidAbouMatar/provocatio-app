import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Pressable
} from "react-native";
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing
} from "../../redux/actions/index";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import Modal from "react-native-modalbox";
import { Card, Button, Title, Paragraph, TextInput } from "react-native-paper";
import { useToast } from "react-native-paper-toast";

function Profile(props) {
  const navigation = props.navigation;
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState("");
  const [descripton, setDiscription] = useState("");
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://kittyinpink.co.uk/wp-content/uploads/2016/12/facebook-default-photo-male_1-1.jpg"
  );
  const toaster = useToast();

  const { currentUser } = props;
  const { token } = props;

  useEffect(() => {
    // check if current user has user id
    if (props.route.params.uid === currentUser.id) {
      fetchUserProfile(currentUser.id);
    } else {
      fetchUserProfile(props.route.params.uid);
    }
  }, [props.route.params.uid]);

  const fetchUserProfile = async (id) => {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/get_user_profile/" + id,
      {
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      }
    );

    //set user user profile data
    setUser(res.data[0]);
    if (res.data[0].is_following.length > 0) setFollowing(true);
    setFollowers(res.data[0].followed_count);
  };

  const message = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/create_chat",
        {
          uid: props.route.params.uid
        },
        {
          headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        }
      )
      .then(function (response) {
        console.log("profile", response);
        navigation.navigate("Chat", { uid: response.data.uid });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onfollow = () => {
    // post follow
    axios
      .post(
        "http://127.0.0.1:8000/api/follow",
        {
          uid: props.route.params.uid
        },
        {
          headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        }
      )
      .then(function (response) {
        setFollowing(true);
        setFollowers(followers + 1);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onUnfollow = () => {
    //unfollow a user
    axios
      .post(
        "http://127.0.0.1:8000/api/unfollow",
        {
          uid: props.route.params.uid
        },
        {
          headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        }
      )
      .then(function (response) {
        setFollowing(false);
        setFollowers(followers - 1);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //send a challenge
  const challenge = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/challenge",
        {
          uid: props.route.params.uid,
          discription: descripton
        },
        {
          headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        }
      )
      .then(function (response) {
        toaster.show({
          message: "Challenge sent",
          duration: 2000,
          type: "success",
          position: "middle"
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setModalVisible(false);
  };

  if (user === null) {
    return <View></View>;
  }

  return (
    <View style={styles.container}>
      <Modal
        isOpen={modalVisible}
        style={{
          height: "40%"
        }}
        backdropPressToClose={false}
        swipeToClose={false}
        position="center"
        coverScreen={false}
        swipeArea={60}
      >
        <Card>
          <Card.Content>
            <Title>Send Challenge</Title>
            <TextInput
              style={{
                width: "90%",
                borderColor: "blue",
                borderWidth: 1,
                borderRadius: 5,
                marginTop: 20,
                borderRightColor: "#000",
                outline: "none",
                padding: 5
              }}
              placeholder="Add discription here"
              multiline={true}
              numberOfLines={5}
              onChangeText={(description) => setDiscription(description)}
            />
          </Card.Content>
          <Card.Actions style={{ alignSelf: "flex-end" }}>
            <Button onPress={() => setModalVisible(false)}>Cancel</Button>
            <Button onPress={() => challenge()}>Challenge</Button>
          </Card.Actions>
        </Card>
      </Modal>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          flexDirection: "row",
          paddingTop: 20
        }}
      >
        <View style={styles.profileImage}>
          {user.profile_picture_path !== null ? (
            <Image
              style={styles.profileImage}
              source={{ uri: user.profile_picture_path }}
            />
          ) : (
            <Image style={styles.profileImage} source={{ uri: profileImage }} />
          )}
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 5
          }}
        >
          <View
            style={{ width: "100%", flexDirection: "row", paddingLeft: 30 }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 17
                }}
              >
                {followers}
              </Text>
              <Text
                style={{
                  fontSize: 17
                }}
              >
                followers
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 17
                }}
              >
                {user.followers_count}
              </Text>
              <Text
                style={{
                  fontSize: 17
                }}
              >
                following
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingTop: 10
        }}
      >
        <Text
          style={{
            fontSize: 20
          }}
        >
          {user.first_name} {user.last_name}
        </Text>
      </View>
      <View
        style={{
          padding: 6
        }}
      >
        <Text
          style={{
            fontSize: 12,
            paddingLeft: 7,
            alignItems: "center"
          }}
        >
          {user.bio}
        </Text>
      </View>

      {props.route.params.uid !== currentUser.id ? (
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={{ flex: 1, heigth: 31, alignItems: "center" }}>
            {!following ? (
              <TouchableOpacity
                style={styles.buttonEdit}
                onPress={() => onfollow()}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  Follow
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonEdit}
                onPress={() => onUnfollow()}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  Unfollow
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ flex: 1, heigth: 31, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#0066FF"
                }}
              >
                Challenge
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, heigth: 31, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonEdit}
              onPress={() => message()}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold"
                }}
              >
                Message
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{ width: "100%", flexDirection: "row", alignItems: "center" }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonEdit}
              onPress={() => navigation.navigate("Edit Profile")}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold"
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Challenges")}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#0066FF"
                }}
              >
                Challenges
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.containerInfo}></View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          // horizontal={false}

          data={user.posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image style={styles.image} source={{ uri: item.path }} />
            </View>
          )}
        />
      </View>
    </View>
  );
}
const width = "20%";
const height = "80%";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  containerInfo: {
    margin: 20
  },
  containerGallery: {
    flex: 1
  },
  containerImage: {
    flex: 1 / 3
  },
  image: {
    backgroundColor: "#000",
    height: 100,

    aspectRatio: 1
  },

  buttonEdit: {
    backgroundColor: "#0066FF",
    width: "90%",
    height: 30,

    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    // backgroundColor: "#e5593f",
    borderWidth: 3,
    // border: '2 solid',
    height: 30,
    width: "90%",
    borderColor: "#0066FF",

    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  gridImgContainer: {
    padding: 1,
    backgroundColor: "#CCC"
  },
  profileImage: {
    width: 80,
    height: 80,
    // backgroundColor: "#000",
    borderRadius: 50,
    borderWidth: 1,
    marginRight: 10
  }

  //   image: {
  //     height:width,
  //     width:width
  //   }
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  token: store.userState.token
});

export default connect(mapStateToProps, null)(Profile);
