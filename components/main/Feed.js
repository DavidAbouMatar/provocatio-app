import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect,useCallback  } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ToastAndroid,
  Button,
  TextInput,
  TouchableOpacity
} from "react-native";


import Story from "react-native-story";

import { connect } from "react-redux";
import { Dimensions } from "react-native";
import { FontAwesome as FAIcon } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import Modal from "react-native-modalbox";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function Feed(props) {
  const [likes, setLike] = useState([]);
  const [posts, setPosts] = useState(null);
  const [stories, setStories] = useState(null);
  const [likesRebder, setLikesRender] = useState('');

  const [profileImage, setProfileImage] = useState(
    "https://kittyinpink.co.uk/wp-content/uploads/2016/12/facebook-default-photo-male_1-1.jpg"
  );
  const { usersPosts } = props;
  const { token } = props;
  // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNjEyODcyMiwiZXhwIjoxNjM2MTMyMzIyLCJuYmYiOjE2MzYxMjg3MjIsImp0aSI6IldRQ3dXR2dCcFNxaXV2b3YiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.jgC4jTU_DiWNUHXJ_F5t0yIOGa-7L0m778JfDkv1DX0"
  useEffect(() => {
    fetchPosts();
    fetchStories();
  }, []);
  console.log("token", usersPosts);
  const fetchStories = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/get_stories", {
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });

    setStories(res.data);

  };
  const fetchPosts = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/get_posts", {
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });

    setPosts(res.data);

    var like = res.data.map(function (item) {
      if (item.is_auth_liked.length > 0) {
        // likes.push('heart')
        likes.push(true);
      } else {
        // likes.push('heart-o')
        likes.push(false);
      }
    });
  };
  function onLikePress(likeId, postId, index) {
   
    if (likes[index]) {
      // let newposts = likes;
      setLikesRender( Math.random() * 10)
     
      likes[index] = false;
      setLike(likes);
      axios
        .post(
          "http://127.0.0.1:8000/api/dislike_post",
          {
            post_id: postId
          },
          {
            headers: {
              "content-Type": "application/json",
              Authorization: "Bearer " + token
            }
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setLikesRender( Math.random() * 10)
      let newposts = likes;
      newposts[index] = true;
      setLike(newposts);

      axios
        .post(
          "http://127.0.0.1:8000/api/like_post",
          {
            post_id: postId
          },
          {
            headers: {
              "content-Type": "application/json",
              Authorization: "Bearer " + token
            }
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const renderItem= useCallback(
({ item, index }) => (
    <View style={styles.contentView}>
      <View style={[styles.post, { marginTop: 0 }]}>
        <View style={styles.postHeader}>
         
          {item.user.profile_picture_path !== null ? (
            <Image
              style={styles.postUserImage}
              source={{ uri: item.user.profile_picture_path }}
            />
          ) : (
            <Image
              style={styles.postUserImage}
              source={{ uri: "https://kittyinpink.co.uk/wp-content/uploads/2016/12/facebook-default-photo-male_1-1.jpg" }}
            />
          )}
       
          <Text style={styles.postUsernameText}>
            {" "}
            {item.user.first_name}
          </Text>
        </View>
        <View style={styles.postContent}>
          <Image
            style={styles.postImage}
            source={{
              uri: item.path
            }}
          />
        </View>

        <View style={styles.postActions}>
          <View style={styles.postActionsLeftView}>
            <TouchableOpacity
              style={[styles.postActionIcon, { paddingLeft: 0 }]}
            >
              {likes[index] ? (
                <Icon
                  name="heart"
                  type="font-awesome"
                  size={30}
                  color={"red"}
                  onPress={() =>
                    onLikePress(item.is_auth_liked[0], item.id, index)
                  }
                />
              ) : (
                <Icon
                  name="heart-o"
                  type="font-awesome"
                  size={30}
                  onPress={() =>
                    onLikePress(item.is_auth_liked[0], item.id, index)
                  }
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.postActionIcon}
              onPress={() =>
                props.navigation.navigate("Comment", {
                  postId: item.id,
                  uid: item.user.uid
                })
              }
            >
              <Icon name="comment" type="font-awesome-5" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.postDescView}>
          <Text>
            {"Liked by "}
            <Text style={{ fontWeight: "bold" }}>
              {item.likes_count}
             
            </Text>
          </Text>
          <View style={styles.postDescTextView}>
            <Text style={styles.postDescUsernameText}>
              {item.user.first_name}{" "}
              <Text style={styles.postDescText}>{item.caption}</Text>
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              onPress={() =>
                props.navigation.navigate("Comment", {
                  postId: item.id,
                  uid: item.user.uid
                })
              }
            >
              View Comments...
            </Text>
          </View>
        </View>
      </View>
    </View>
  ),[]);

  if (posts === null) {
    return <View></View>;
  }

  return (
    <View style={styles.container}>

      <Story

        unPressedBorderColor="#87ceeb"
        pressedBorderColor="#87ceeb"
        stories={stories}
      />

      {/* </View> */}

      <FlatList
        numColumns={1}
        horizontal={false}
        // keyExtractor={(item, index) => {
        //   return item.id;
        // }}
    
        keyExtractor={(item) => item.id}
        data={posts}
        extraData={likesRebder}
        renderItem={renderItem}
     
      />
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0
    // marginTop: 40
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
    flex: 1,
    aspectRatio: 1 / 1
  },
  contentView: {
    padding: 5
  },
  post: {
    borderWidth: 1,
    borderColor: "#f1f3f6"
  },
  postHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#dfe4ea",
    borderTopColor: "#dfe4ea",
    backgroundColor: "#fff"
  },
  postUserImage: {
    width: 40,
    height: 40,
    borderRadius: 100
  },
  postUsernameText: {
    flex: 1,
    marginLeft: 10
  },
  postContent: {
    backgroundColor: "#fafafa"
  },
  postImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    resizeMode: "contain"
  },
  postActions: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#dfe4ea",
    paddingVertical: 10,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  postActionsLeftView: {
    display: "flex",
    flexDirection: "row"
  },
  postActionIcon: {
    paddingHorizontal: 6
  },
  postDescView: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dfe4ea"
  },
  postDescText: {
    fontSize: 16,
    fontWeight: "300"
  },
  postDescUsernameText: {
    fontWeight: "bold",
    marginTop: 6,
    fontSize: 16
  },
  suggestionsView: {
    marginTop: 10
  },
  comment: {
    width: "90%",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "black"
  }
});


const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  token: store.userState.token,
  usersPosts: store.userState.usersPosts,
});
export default connect(mapStateToProps, null)(Feed);
