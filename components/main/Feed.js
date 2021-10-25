import { NavigationContainer } from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text, Image, FlatList, Button,TextInput } from "react-native";
import InstaStory from 'react-native-insta-story';
import { connect } from 'react-redux';


function Feed(props){
    const[ posts, setPosts ] = useState([]);
    const data = [
        {
            user_id: 1,
            user_image: 'https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg',
            user_name: "Ahmet Çağlar Durmuş",
            stories: [
                {
                    story_id: 1,
                    story_image: "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
                    onPress: () => console.log('story 1 swiped'),
                },
                {
                    story_id: 2,
                    story_image: "https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg",
                }]
        },
        {
            user_id: 2,
            user_image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
            user_name: "Test User",
            stories: [
                {
                    story_id: 1,
                    story_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU",
                    onPress: () => console.log('story 1 swiped'),
                },
                {
                    story_id: 2,
                    story_image: "https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg",
                    onPress: () => console.log('story 2 swiped'),
                }]
        }];
    

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

 
    const onCommentSend =() =>{
        // post comment via axios

    }
  
    return (
        <View style={styles.container}>
            <InstaStory 
            style={styles.container}
            data={data}
            duration={50}
            onStart={item => console.log(item)}
            onClose={item => console.log('close: ', item)}
            customSwipeUpComponent={<View>
                                <Text>Swipe</Text>
                            </View>}
            style={{marginBottom: 30}}/>
              
        {/* <View style={styles.containerGallery}>
            <FlatList
            numColumns={1}
            horizontal={false}
            data={posts}
            renderItem={({ item }) => (
                <View
                style={styles.containerImage}>
                <Text style={styles.container}>{item.user.name} </Text>
                <Image
                    style={styles.image}
                    source={{uri: item.url}}
                />
                <Text
                onPress={()=> 
                    props.navigation.navigate('Comment',
                    {postId: item.id})
                }> 
                View comment </Text>
                 </View>
            )}
            />
            <View>
                <TextInput 
                placeholder='comment'
                onChangeText={(text) => setTtext(text)}
                />
                <Button 
                
                onPress={() => onCommentSend()}
                title="send"
                 />
            </View>
           

        </View> */}
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        // marginTop: 40
    },
    containerInfo:{
        margin: 20
    },
    containerGallery:{
        flex: 1,
    },
    containerImage:{
        flex: 1/3
    },
    image:{
        flex: 1,
        aspectRatio: 1/1
    },
 
})


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.userState.users,
    usersFollowingLoaded: store.userState.usersFollowingLoaded,


})

export default connect(mapStateToProps, null)(Feed);