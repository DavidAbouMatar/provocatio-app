import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";

import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity, Alert, Pressable } from "react-native";
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing,
} from "../../redux/actions/index";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import Modal from "react-native-modalbox";
import { TextInput } from "react-native-gesture-handler";

// import { fetchUser, fetchUserPosts, fetchUserFollowing } from '../redux/actions/index'

function Profile(props) {
  const navigation = props.navigation;
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState('');
  const [following, setfollowing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://kittyinpink.co.uk/wp-content/uploads/2016/12/facebook-default-photo-male_1-1.jpg"
  );

  // const{  currentUser, posts } = props;
  // const dispatch = useDispatch();
  // useEffect(() => {

  //     dispatch(fetchUserPosts());
  // },[])

  const { currentUser } = props;
  useEffect(() => {
    setfollowing([
      {
        id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        id: 5,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 4,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);

    // setrightMessages([
    //     {
    //       _id: 2,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 4,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },

    //     },
    //     {
    //       _id: 2,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ]);
  }, []);



  useEffect(() => {
    // check if current user has user id
    // const{ currentUser, posts } = props;

    

    if (props.route.params.uid === currentUser.id) {
      console.log("currentUser", user);
      fetchUserProfile(currentUser.id)
  
    } else {
      console.log("sdgggggggggggg",props.route.params.uid)
      fetchUserProfile(props.route.params.uid)

    }
  }, [props.route.params.uid]);

  // }, [ props.route.params.uid, props.posts])
  const fetchUserProfile = async (id) => {
    const res= await axios.get("http://127.0.0.1:8000/api/get_user_profile/" + id, { headers: { "content-Type": "application/json",
        "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNTUxOTIwMiwiZXhwIjoxNjM1NTIyODAyLCJuYmYiOjE2MzU1MTkyMDIsImp0aSI6IkU3ZmZZTGx0YVIyYWg4aFAiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.W3RuclaHyscXBHUjyN_Njnt_uWjulsEzP8t868FMDz8" } })

               setUser(res.data[0]);
    
                console.log("ssssssss",res);

  };

  const onfollow = () => {
    //post follow
    // axios.post(url, params,{
    //     "headers": {
    //     "content-type": "application/json",
    //     },
    //     })
    //     .then(function(response) {
    // setUser(response)
    //     console.log(response);
    //     })
    //     .catch(function(error) {
    //     console.log(error);
    //     });
    //     };
  };
  

  const onUnfollow = () => {
    //post unfollow
    // axios.post(url, params,{
    //     "headers": {
    //     "content-type": "application/json",
    //     },
    //     })
    //     .then(function(response) {
    // setUser(response)
    //     console.log(response);
    //     })
    //     .catch(function(error) {
    //     console.log(error);
    //     });
    //     };
  };

  const challenge = () => {
    // axios.post
    setModalVisible(false)
  }
  console.log('usssss',user)
  if (user === null) {
    return <View></View>;
  }

  return (

    <View style={styles.container}>
       <Modal
       isOpen={modalVisible}>
        <View style={{ flex: 1/2, alignItems:'center' }}>
          <TextInput
          style={{
            width:"90%",
            borderRadius:10,
            border:1,
            padding: 5

          }}
          placeholder="Add discription here"
          multiline={true}
          numberOfLines={3}

          />
          <View style={{ flexDirection: "row", alignItems: "center"}}>
          <TouchableOpacity style={{
            borderRadius:5,
            width:120,
            height:40,
            margin: 7,
            backgroundColor:"blue",
            textAlign: "center",
            alignItems: 'center',
            textAlignVertical: 'center',
            alignSelf: "flex-start",
          }} 
         onPress={() => challenge() }>
            <Text style={{color:'white'}}> Send Challenge </Text> 
          </TouchableOpacity>
          <TouchableOpacity
          style={{
            borderRadius:5,
            width:50,
            height:40,
            backgroundColor:"red",
            margin: 7,
            textAlign: "center",
            alignItems: 'center',
            textAlignVertical: 'center',
            alignSelf: "flex-end",
          }} 
           onPress={() => setModalVisible(false) }>
            <Text style={{color:'white'}}> cancel </Text> 
          </TouchableOpacity>
          </View>
        </View>
</Modal>
      <View style={{ padding: 20, flexDirection: "row" }}>
        <View style={styles.profileImage}>
        {user.profile_picture_path !== null ? (
              <Image style={styles.profileImage} source={{ uri: user.profile_picture_path }} />
            ) : (
              
             <Image style={styles.profileImage} source={{ uri: profileImage }} />
            )}

          
          <Text>
            {user.first_name} {user.last_name}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
        >
          <View style={{ width: "100%", flexDirection: "row",paddingLeft:30 }}>
            {/* <View style={{ flex: 1, alignItems: "center" }}>
              <Text>39</Text>
              <Text>Posts</Text>
            </View> */}
            <View style={{ alignItems: "center" }}>
              <Text>{user.followers_count}</Text>
              <Text>followers</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{user.followed_count}</Text>
              <Text>following</Text>
            </View>
          </View>
          {/* <View
            style={{
              flex: 1,
              marginTop: 5,
              // borderWidth: 1,
              width: "100%",
            //   height: 50,
            //   marginLeft: 1,
            //   alignItems: "left",
            }}
          > */}
            {/* <View style={{ width: "100%", flexDirection: "row",paddingLeft:30 }}> */}
            {props.route.params.uid !== currentUser.id ? (
              // <View style={{
              //   flexDirection: "row",
              //   // justifyContent:'space-between',
              //   // alignItems: "left",
              // }}>
              <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
              style={styles.buttonEdit}
              onPress={() => navigation.navigate("Edit Profile")}
            >
              <Text style={{
                color:"white",
                fontWeight: "bold"
              }}>Follow</Text>
            </TouchableOpacity>
            </View>
              <View style={{ flex: 1, alignItems: "center" }}>
             <TouchableOpacity
               style={styles.button}
               onPress={() => setModalVisible(true)}
              //  onPress={onPress}
             >
               <Text>Challenge</Text>
             </TouchableOpacity>
             </View>
             </View>
            ) : (
              // <View
              // style={{
              //   flexDirection: "row",
              //   // justifyContent:'space-between',
              //   // alignItems: "left",
              // }}>
              <View style={{ width: "100%", flexDirection: "row",paddingRight:30 }}>
              <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
              style={styles.buttonEdit}
              onPress={() => navigation.navigate("Edit Profile")}
            >
              <Text style={{
                color:"white",
                fontWeight: "bold"
              }}>Edit Profile</Text>
            </TouchableOpacity>
            </View>
             <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.button}
              // onPress={onPress}
            >
              <Text style={{
                color:"white",
                fontWeight: "bold"
              }}>Challenges</Text>
            </TouchableOpacity>
            </View>
            </View>
            )}

            {/* <Text>Edit Profile</Text> */}
          </View>
        </View>
      {/* </View> */}

      {/* <View style={styles.gridImgContainer}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: profileImage }}
        />
      </View> */}

      <View style={styles.containerInfo}>
        {/* <Text>{user.first_name}</Text> */}
        {/* <Text>{user.email}</Text>
              <Text>david</Text> */}

        {/* {props.route.params.uid !== currentUser.id ?(
                <View>
                    {following ? (
                        <Button 
                        tittle="Following"
                        // onPress{() => onUnfollow()}
                        />
                    ):
                    (
                        <Button 
                        tittle="Follow"
                        // onPress{() => onfollow()}
                        />

                    )}
                </View>

            ) : null } */}
      </View>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          // horizontal={false}

          data={user.posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              {/* <Text
                    style={styles.image}>item.text</Text> */}
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
    marginTop: 40,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
    // flexDirection: 'column',
    // margin: 1
  },
  image: {
    backgroundColor: "#000",
    height: 100,
    aspectRatio: 1 / 1,
  },
  // container: {
  //     flex: 1,
  //     backgroundColor: "#fff"
  //   },
  buttonEdit:{
    backgroundColor: "#0066FF",
    width:90,
    height:30,
    marginLeft:20,
    borderRadius:5,
    justifyContent: 'center',
    alignItems: "center",
  },
  button:{
    backgroundColor: "#e5593f",
    height:30,
    width:90,
    marginLeft:30,
    borderRadius:5,
    justifyContent: 'center',
    alignItems: "center",
  },
  gridImgContainer: {
    padding: 1,
    backgroundColor: "#CCC",
  },
  profileImage: {
    width: 80,
    height: 80,
    // backgroundColor: "#000",
    borderRadius: 50,
    borderWidth: 1,
    marginRight: 10,
  },
  
  //   image: {
  //     height:width,
  //     width:width
  //   }
});

const mapStateToProps = (store) => ({
  posts: store.userState.posts,
  currentUser: store.userState.currentUser,

  following: store.userState.following,
});

export default connect(mapStateToProps, null)(Profile);
