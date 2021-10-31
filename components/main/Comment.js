import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Text,
  TextInput
} from "react-native";
import axios from "axios";

export default function Comment(props) {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");

  const addComment = async () => {
    axios
      .post("http://127.0.0.1:8000/api/add_comment", {
        post_id: props.route.params.postId,
        comment: text
      }, {headers: {
        "content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNTU1NTQ1MCwiZXhwIjoxNjM1NTU5MDUwLCJuYmYiOjE2MzU1NTU0NTAsImp0aSI6InA2ZkUwYldDOWFpVGplQXQiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.sVQxsE28uHvawfybKf6V3Gm-RqIuPQ3vPKCqpFP-qYc"
      }})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchPosts = async (pid) => {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/get_comment/" + pid,
      {
        headers: {
          "content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNTU1NTQ1MCwiZXhwIjoxNjM1NTU5MDUwLCJuYmYiOjE2MzU1NTU0NTAsImp0aSI6InA2ZkUwYldDOWFpVGplQXQiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.sVQxsE28uHvawfybKf6V3Gm-RqIuPQ3vPKCqpFP-qYc"
        }
      }
    );

    setComments(res.data);

    console.log("ttttttttttt", res.data[0]);
  };

  useEffect(() => {
    console.log("comment", props.route.params.postId);
    fetchPosts(props.route.params.postId);
  }, [props.route.params.postId]);

  if (comments === null) {
    return <View></View>;
  }
  return (
    <View>
      <View style={{ paddingBottom: 80 }}>
        <FlatList
          style={styles.root}
          data={comments}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={(item) => {
            const comment = item.item;
            return (
              <View style={styles.commentContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: comment.users.profile_picture_path }}
                />

                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <Text style={styles.name}>{comment.users.first_name}</Text>
                  </View>
                  <Text rkType="primary3 mediumLine">{comment.comment}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{ width: "100%", position: "fixed", bottom: 0, height: 20 }}
      ></View>
      <View
        style={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          backgroundColor: "#fff"
        }}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            multiline={true}
            numberOfLines={3}
            placeholder="Add a comment.."
            onChangeText={text => setText(text)}
           
          />
          <View style={styles.inputTextContainer}>
            <Text onPress={() => addComment()  }
                    style={styles.inputText}>Post</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 10
  },
  commentContainer: {
    paddingRight: 16,
    paddingVertical: 12,

    flexDirection: "row",
    alignItems: "flex-start"
  },
  content: {
    marginLeft: 16,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    flex: 1
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },

  name: {
    fontWeight: "bold"
  }
});
