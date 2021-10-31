import React, { useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native'

export default function Save(props){
    const [caption, setCaption] = useState("")
    console.log( props.route.params.image)
    // console.log(props.mediaTypes)
    const uploadImage = () => {
        //6-15
        const uri =  props.route.params.image;
        
        // const blob = await response.blob();
          //postint with axios to login
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
    return (
        <View>
        <Image source={{ uri: props.route.params.image}}/>
        <TextInput
            multiline={true}
            numberOfLines={3}
            placeholder="write a Caption"
            onChangeText={(caption) => setCaption(caption)}
            />
            <Button title="save" onpress={() => iploadImage()} style={{width:60, borderRadius:25 }}/>
        </View>
        

    )
}