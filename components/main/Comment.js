import React, { useState, useEffect } from 'react'
import {view, text, FlatList, Button, TextInput, View } from 'react-native'

export default function Comment(props) {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")

useEffect(() => {

    if(props.route.params.postId !== postId){
        
    }
    //axios get comments for the post

}, [props.route.params.postId])
    return (
       <View>
           <FlatList
           numColumns={1}
           horizontal={false}
           data={comments}
           renderItem={({item}) =>(
               <View>
                   <Text>{item.text}</Text>
               </View>
           )}
           />
       </View>
    )
}
