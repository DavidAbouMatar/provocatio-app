import React, {useState} from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";


export default function Search(props){
    const [user, setUsers] =  useState([])

    const fetchUsers = (search) =>{
        console.log(search)
        fetch("http://127.0.0.1:8000/api/search/"+search, {
      method: 'post',
      headers: new Headers({"Content-Type": "application/json",
      "content-Type": "application/json",
      "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNTAxODEyMiwiZXhwIjoxNjM1MDIxNzIyLCJuYmYiOjE2MzUwMTgxMjIsImp0aSI6IjNMY1E0MmNHYWRDa2xZNEciLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.s8AbhE2z6gI1rluKJfZNnpJUSDv2S52OGaufCojw-3E"
       }),}
    ).then(response => response.json())
    .then((responseData) => {
        
        let users = Object.keys(responseData).map(function(key) {
            // let user = users[key];
            
            const data = responseData[key];
            
            const id  = data.id;
            console.log("res",responseData[key])
            return {id, ...data }
            
          });
          setUsers(users)
        
          console.log("user",users)
     
    //     let users =data.map((responseData) => {
    // //    let users = responseData.services.map(doc => {
    //        const data = doc.data();
    //        const id = doc.id;
    //        return {id, ...data }
    //    });
      
    })
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
            <TextInput 
            placeholder="Search"
            onChangeText={(search) => fetchUsers(search)} />

            <FlatList
            numColumns={1}
            horizantal={false}
            data={user}
            renderItem={({item})=> (
                <TouchableOpacity
                onPress={() => props.navigation.navigate("Profile", {uid:item.id})}>
                   
                 <Text>{item.first_name} {item.last_name}</Text>
                {/* <Text>name</Text> */}
                </TouchableOpacity>
            )} />
        </View>
    )
}