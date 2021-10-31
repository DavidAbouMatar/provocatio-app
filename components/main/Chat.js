import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import Pusher from 'pusher-js/react-native';
import axios from "axios";

export function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [rightMessages, setrightMessages] = useState([]);


  console.log("kkkkkkkk",props.route.params.uid)

  useEffect(() => {
    console.log("kkkkkkkk",props.route.params.uid)
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    //   {
    //     _id: 2,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 1,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ])
    // Enable pusher logging - don't include this in production
//       Pusher.logToConsole = true;

//       var pusher = new Pusher('850c7f177de91b1863d2', {
//         cluster: 'eu'
//       });

//       var channel = pusher.subscribe('chat');
//       channel.bind('chat', function(data) {
//         alert(JSON.stringify(data));
// });

    // return (() => {
    //   pusher.unsubscribe('chat')
      // pusher.unsubscribe(‘channel_name2’)
  // })
},[]);
  // useEffect(() => {
   
  
  //   const chatChannel = pusher.subscribe('chat');
  //   chatChannel.bind('pusher:subscription_succeeded', () => { // (3)
  //     chatChannel.bind('join', (data) => { // (4)
  //       handleJoin(data.name);
  //     }); });
  //     // chatChannel.bind('chat', function(data) {
  //     //     // alert(data);
  //     //     // setrightMessages(data)
  //     //     console.log("dd",data)
  //     // });
  
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
        
  //     },
  //     {
  //       _id: 5,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 4,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);

   
  // }, [])


  const fetchMessages = async () => {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/messages",
      {
        headers: {
          "content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNTcxMzIwMiwiZXhwIjoxNjM1NzE2ODAyLCJuYmYiOjE2MzU3MTMyMDIsImp0aSI6IjVhRDJLRXJadm5wRGxEZTkiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.X-KVtKG59LiM0otk1ccgsTUHotW5bR_YytgDCOMJMyA"
        }
      }
    );
    setMessages(res.data);

    console.log("ttttttttttt", res.data[0]);
  };


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    axios
    .post("http://127.0.0.1:8000/api/messages", {
      message: "hhhhhhhh",
  
    }, {headers: {
      "content-Type": "application/json",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNTYyODkwNywiZXhwIjoxNjM1NjMyNTA3LCJuYmYiOjE2MzU2Mjg5MDcsImp0aSI6IkJWOWNVS2F1amFHcTdLQVEiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.YfPgDzYTqkrXmumHTqEwwQrKMXjQExSKoYWSxk9aj0k"
    }})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
        name: 'Minecraft',
      }}
    />
  )
}

export default Chat;