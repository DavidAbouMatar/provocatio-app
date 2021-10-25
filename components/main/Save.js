import React from 'react';
import { View } from 'react-native';

export default function Save(){
    const [caption, setCaption] = useState("")
    // console.log(props.mediaTypes)
    const uploadImage = () => {
        //6-15
        const uri =  sprops.route.params.image;
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
            placeholder="write a Caption"
            onChangeText={(caption) => setCaption(caption)}
            />
            <Button title="save" onpress={() => iploadImage()} />
        </View>
        

    )
}