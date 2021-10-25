import { NavigationContainer } from "@react-navigation/native";
import React, {useState, useEffect} from "react";

import {StyleSheet, View, Text, Image, FlatList, Button } from "react-native";
import { fetchUser, fetchUserPosts, fetchUserFollowing } from '../../redux/actions/index'
import { connect, useDispatch } from 'react-redux';
// import { fetchUser, fetchUserPosts, fetchUserFollowing } from '../redux/actions/index'


function Profile(props){
 
    const[ userPosts, setUserPosts ] = useState([]);
    const[ user, setUser ] = useState(null);
    const [following, setfollowing] = useState(false);
    const [profileImage, setProfileImage] = useState("https://kittyinpink.co.uk/wp-content/uploads/2016/12/facebook-default-photo-male_1-1.jpg");

    // const{  currentUser, posts } = props;
    // const dispatch = useDispatch();
    // useEffect(() => {
   
    //     dispatch(fetchUserPosts());
    // },[])
    const { posts } = props;
    const { currentUser } = props;
    useEffect(() => {
        setfollowing([
          {
            id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
            
          },
          {
            id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
            
          },
          {
            id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
            
          },
          {
            id: 5,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 4,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
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
      }, [])
  
    useEffect(() => {
        fetchUserPosts();
        setUserPosts(posts);
      },[]);
    
    useEffect(() => {
        // check if current user has user id
        // const{ currentUser, posts } = props;

        // console.log({currentUser, posts});
        
        if(props.uid === currentUser.id){
            setUser(currentUser)
            fetchUserPosts
            // console.log("userState",currentUser.id)
        }
        else{
            setUser(currentUser)
            fetchUserPosts
            // console.log("ssssssss",currentUser.id)
             //get user posts
           
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
        }
        //comes from redux store
        // if(props.following.indexOf(props.route.params.id) > -1){
        //     setfollowing(true);
        // } else{
        //     setfollowing(false);
        // }
        // props.route.params.uid, props.following

    }, [ props.route.params.uid, props.posts])
    const  fetchUserPosts= (id) => {
        console.log("PPOSSSYTTT")
        // 9-12
        return ((dispatch)=>{
        axios.get("http://127.0.0.1:8000/api/get_user_Posts", { headers: { "content-Type": "application/json",
        "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNTAzMDA4MywiZXhwIjoxNjM1MDMzNjgzLCJuYmYiOjE2MzUwMzAwODMsImp0aSI6IlFZQklVcVZwYldqWGZMNEUiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.Eh5yiBL-KFocsn2XEc5OjYydp6x5afaUjMNqdbPlZGA" }
         }).then(response => {
           
                setUserPosts(response.data)
            })
          
          
            console.log("fetchUserPosts",posts);
    
            console.log("response",posts);
            })
        // .catch((error) => {
        //     console.log('error ',error);
        //     })
        
        }
    
   
    
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

    }
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

   }

 
    if(user === undefined){
 
        return <View></View>
    }
    console.log("props",following)
  
    return (
        <View style={styles.container}>

        <View style={{ padding: 20, flexDirection: "row" }}>
        <View style={styles.profileImage} >
        <Image
        style={styles.profileImage}
        source={{uri: profileImage}}
      />
    </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 5
          }}
        >
          <View style={{ width: "100%", flexDirection: "row",  }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>39</Text>
              <Text>Posts</Text>
            </View>
            <View style={{  alignItems: "center" }}>
              <Text>339</Text>
              <Text>followers</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>393</Text>
              <Text>following</Text>
            </View>
          </View>
          <View
            style={{
            marginTop: 5,
            borderWidth: 1,
            width: "100%",
            height: 30,
            marginLeft: 1,
            alignItems: "center"
            }}
          >
            

            {props.route.params.uid !== currentUser.id ?(
                <View>
                    {following ? (
                        <Button 
                        tittle=">Edit Profile"
                        // onPress{() => onUnfollow()}
                        />
                    ):
                    (
                        <Button 
                        tittle="challenge"
                        // onPress{() => onfollow()}
                        />

                    )}
                </View>

            ) : null }

            <Text>Edit Profile</Text>
          </View>
        </View>
      </View>

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
            <Text>david@gmail.com</Text>

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
            
            data={following}
            renderItem={({ item }) => (
                <View
                style={styles.containerImage}>
                    {/* <Text
                    style={styles.image}>item.text</Text> */}
                <Image
                    style={styles.image}
                    source={{uri:profileImage}}
                />
                 </View>
            )}
            />
           

        </View>
        </View>
    )
}
const width = '20%';
const height= '80%';
const styles= StyleSheet.create({
    container:{
        flex:1,
        marginTop: 40
    },
    containerInfo:{
        margin: 20
    },
    containerGallery:{
        flex: 1,
       
 
        
    },
    containerImage:{
      
        flex:1/3
        // flexDirection: 'column',
        // margin: 1
    },
    image:{
        backgroundColor: '#000',
        height:100,
        aspectRatio: 1/1
    },
    // container: {
    //     flex: 1,
    //     backgroundColor: "#fff"
    //   },
    
      gridImgContainer: {
        padding: 1,
        backgroundColor: "#CCC"
      },
      profileImage: {
        width: 80,
        height: 80,
        // backgroundColor: "#000",
        borderRadius:50,
        borderWidth: 1,
        marginRight: 10
      },
    //   image: {
    //     height:width,
    //     width:width
    //   }
})


const mapStateToProps = (store) => ({
    posts: store.userState.posts,
    currentUser: store.userState.currentUser,
    
    following: store.userState.following
})

export default connect(mapStateToProps, null)(Profile);