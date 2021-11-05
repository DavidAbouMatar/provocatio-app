import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import Pusher from 'pusher-js/react-native';
import { connect, useDispatch } from "react-redux";
import axios from "axios";

export function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState([]);
  const [rightMessages, setrightMessages] = useState([]);

  const { token } = props;
  const { currentUser } = props;
  useEffect(() => {
    
    fetchMessages()
   

    // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;

      var pusher = new Pusher('850c7f177de91b1863d2', {
        cluster: 'eu'
      });

      var channel = pusher.subscribe('chat.' + props.route.params.uid);
      channel.bind('chat', function(data) {
        console.log(data['message'].id)
        const newArray = { _id: data['message'].id, createdAt: data['message'].created_at, text: data['message'].message, user: { _id: data['user'].id, name: data['user'].first_name }}
        setMessages(previousMessages => GiftedChat.append(previousMessages, newArray))
        console.log(JSON.stringify(data))
        // alert(JSON.stringify(data));
        // data['user'].first_name
});

    return (() => {
      pusher.unsubscribe('chat.'+ props.route.params.uid)
      pusher.unsubscribe('chat')
  })
},[]);


  const fetchMessages = async () => {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/messages/" + props.route.params.uid,
      {
        headers: {
          "content-Type": "application/json",
          Authorization:
            "Bearer " + token
        }
      }
    );
    let posts = res.data.map((dat) => {
      console.log(dat.user)
      const users = dat.posts;

      const id = dat.id;

      return { id, ...users };
    });

    console.log("ttttttttttt",res.data[0]);
    const newArray = res.data.map((message) => ({ _id: message.id, createdAt: message.created_at, text: message.message, user: { _id: message.user.id, name: message.user.first_name } }))
    // let posts = res.data.map((dat) => {
    //   const users = dat.posts;

    //   const id = dat.id;

    //   return { id, ...users };
    // });
    setMessages(newArray);

    
  };


  const onSend = useCallback((messages = []) => {
    console.log("kkkkkkkk",props.route.params.uid,messages)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    axios
    .post("http://127.0.0.1:8000/api/messages", {
      message: messages[0].text,
      uid : props.route.params.uid
    }, {headers: {
      "content-Type": "application/json",
      Authorization:
        "Bearer " + token
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
        _id: currentUser.id,
        name: 'Minecraft',
      }}
    />
  )
}

const mapStateToProps = (store) => ({
  token: store.userState.token,
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Chat);
// export default Chat;