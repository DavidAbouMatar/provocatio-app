import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Text,
  TextInput
} from "react-native";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { Card, ListItem, Input, Icon, Avatar } from "react-native-elements";
function Comment(props) {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState(null);
  const input = React.createRef();

  const { token } = props;

  const addComment = async () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/add_comment",
        {
          post_id: props.route.params.postId,
          comment: text
        },
        {
          headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        }
      )
      .then(function (response) {
        input.current.clear();

        setComments((comments) => [...comments, response.data.comment[0]]);
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
          Authorization: "Bearer " + token
        }
      }
    );

    setComments(res.data);
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
          <Input
            ref={input}
            style={styles.input}
            multiline={true}
            numberOfLines={3}
            placeholder="Add a comment.."
            onChangeText={(text) => setText(text)}
          />
          <View style={styles.inputTextContainer}>
            <Text onPress={() => addComment()} style={styles.inputText}>
              Post
            </Text>
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
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  content: {
    marginLeft: 16,

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
  },
  inputContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    width: 70,
    pressedBorderColor: "blue"
  },
  inputText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "blue",
    paddingRight: 5
  }
});
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  token: store.userState.token
});

export default connect(mapStateToProps, null)(Comment);
