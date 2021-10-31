import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState(null);
  const [profileImage, setProfileImage] = useState(
    "https://kittyinpink.co.uk/wp-content/uploads/2016/12/facebook-default-photo-male_1-1.jpg"
  );
  // const { usersPosts } = props;

  const stories = [
    {
      id: "4",
      source:
        "https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg",
      user: "Mustafa",
      avatar:
        "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg"
    },
    {
      id: "4",
      source:
        "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
      user: "Mustafa",
      avatar:
        "https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg"
    },
    {
      id: "5",
      source:
        "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
      user: "Emre Yilmaz",
      avatar:
        "https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg"
    },
    {
      id: "3",
      source:
        "https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg",
      user: "Cenk Gun",
      avatar:
        "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg"
    }
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/get_posts", {
      headers: {
        "content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNTU1MzcwOCwiZXhwIjoxNjM1NTU3MzA4LCJuYmYiOjE2MzU1NTM3MDgsImp0aSI6Ik1TMlh5RGl4ZkNnZ0JRc2ciLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.NonQ2GUdVllPKcGmdW-V3LXtAt1vxcbDJiojfk_RKLQ"
      }
    });

    setPosts(res.data);

    console.log("ssssssss", res.data);
  };

  // useEffect(() => {
  //     // let posts = [];
  //     if(props.usersFollowingLoaded == props.following.length){
  //         for (let i = 0; i< props.following.length; i++){
  //             const user = props.users.find(el => el.uid === props.following)
  //             if(user != undefined){
  //                 posts = [...posts, ...user.posts]
  //             }

  //         }
  //         posts.sort(function(x,y){
  //             return x.creation - y.creation;
  //         })

  //         setPosts(posts)
  //     }
  // }, [props.usersFollowingLoaded])

  if (posts === null) {
    return <View></View>;
  }

  return (
    <View style={styles.container}>
      {/* <Text styles ={styles.text}> Stories</Text> */}
      <View style={{ marginTop: 0, marginVertical: 0 }}>
        <Story
          unPressedBorderColor="#87ceeb"
          pressedBorderColor="#87ceeb"
          stories={stories}
        />
      </View>
      <FlatList
        numColumns={1}
        horizontal={false}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        data={posts}
        renderItem={({ item, index }) => (
          <View style={styles.contentView}>
            <View style={[styles.post, { marginTop: 0 }]}>
              <View style={styles.postHeader}>
                {/* 'https://images.pexels.com/photos/4761916/pexels-photo-4761916.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', */}

                {/* 'https://randomuser.me/api/portraits/men/46.jpg', */}
                {item.user.profile_picture_path !== null ? (
                  <Image
                    style={styles.postUserImage}
                    source={{ uri: item.user.profile_picture_path }}
                  />
                ) : (
                  <Image
                    style={styles.postUserImage}
                    source={{ uri: profileImage }}
                  />
                )}
                {/* <Image
                    style={styles.postUserImage}
                    source={{
                      uri: item.user.profile_picture_path
                    }}
                  /> */}
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
                    <Icon
                      name="heart"
                      type="font-awesome-5"
                      size={30}
                      background={"red"}
                    />
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
                  {"Liked by"}
                  <Text style={{ fontWeight: "bold" }}>{" johndoe "}</Text>
                  {"and "}
                  <Text style={{ fontWeight: "bold" }}>
                    {item.likes_count}
                    {" others"}
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
        )}
      />
    </View>

    // <View style={styles.containerGallery}>
    //     <FlatList
    //     numColumns={1}
    //     horizontal={false}
    //     data={posts}
    //     renderItem={({ item }) => (
    //         <View
    //         style={styles.containerImage}>
    //         <Text style={styles.container}>{item.user.name} </Text>
    //         <Image
    //             style={styles.image}
    //             source={{uri: item.url}}
    //         />
    //         <Text
    //         onPress={()=>
    //             props.navigation.navigate('Comment',
    //             {postId: item.id})
    //         }>
    //         View comment </Text>
    //          </View>
    //     )}
    //     />
    //     <View>
    //         <TextInput
    //         placeholder='comment'
    //         onChangeText={(text) => setTtext(text)}
    //         />
    //         <Button

    //         onPress={() => onCommentSend()}
    //         title="send"
    //          />
    //     </View>

    //         </View>
    //  </View>
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

// const mapStateToProps = (store) => ({
//     currentUser: store.userState.currentUser,
//     following: store.userState.following,
//     users: store.userState.users,
//     usersFollowingLoaded: store.userState.usersFollowingLoaded,

// })

// export default connect(mapStateToProps, null)(Feed);
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
  // usersPosts: store.userState.usersPosts,
  // feed: store.usersState.feed,
  // usersFollowingLoaded: store.usersState.usersFollowingLoaded,
});
export default connect(mapStateToProps, null)(Feed);
