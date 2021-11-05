import React, { useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native'
import axios from "axios";

export default function Save(props){
    const [caption, setCaption] = useState("")

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNjEyODcyMiwiZXhwIjoxNjM2MTMyMzIyLCJuYmYiOjE2MzYxMjg3MjIsImp0aSI6IldRQ3dXR2dCcFNxaXV2b3YiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.jgC4jTU_DiWNUHXJ_F5t0yIOGa-7L0m778JfDkv1DX0"

    console.log( props.route.params.type)
    // console.log(props.mediaTypes)
    const uploadImage = () => {
        axios.post("http://127.0.0.1:8000/api/upload_media", {
            image:props.route.params.image,
            type: props.route.params.type,
            caption: caption
            
            }, {headers: {
            "content-Type": "application/json",
            Authorization:
                "Bearer " + token
            }})
            .then(function (response) {
            setModalVisible(false)
            })
            .catch(function (error) {
            console.log(error);
            });
      
        console.log('pppppppp')
        const uri =  props.route.params.image;
        const type =  props.route.params.type;
        console.log(type, uri)
    


    }
    return (
        <View>
        <Image source={{ uri: props.route.params.image}}/>
        <TextInput
            multiline={true}
            numberOfLines={3}
            placeholder="write a Caption"
            onChangeText={(caption) => setCaption(caption)}
            />
            <Button title="save" onPress={() => uploadImage()} style={{width:60, borderRadius:25 }}/>
        </View>
        

    )
}