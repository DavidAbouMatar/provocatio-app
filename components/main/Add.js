import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { Camera } from "expo-camera";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
// import { TextInput } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import { useToast } from "react-native-paper-toast";
import { Card, Button, Title, Paragraph } from "react-native-paper";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

function Add(props) {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [type, setType] = useState("");
  const [gallery, setGallery] = useState("");

  const { token } = props;
  const toaster = useToast();

  useEffect(() => {
    onHandlePermission();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true
    });
    setImage(result.base64);
    setIsPreview(true);
    setType(0);
  };
  const uploadImage = () => {
    setIsPreview(false);
    axios
      .post(
        "http://127.0.0.1:8000/api/upload_media",
        {
          image: image,
          type: type,

          caption: caption
        },
        {
          headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        }
      )

      .then(function (response) {
        toaster.show({
          message: "Image Saved",
          duration: 2000,
          type: "normal",
          position: "middle"
        });
        cancelPreview();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onHandlePermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;

      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        setType(1);

        let base64Img = data.uri;

        console.log(base64Img);

        setImage(base64Img);
      }
    }
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        onCameraReady={onCameraReady}
        useCamera2Api={true}
      />
      <View style={styles.container}>
        {isPreview && (
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={cancelPreview}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <AntDesign name="close" size={32} color="#fff" />
            </TouchableOpacity>
            <View
              style={{
                position: "absolute",
                flexDirection: "column",
                width: "100%",
                top: 400,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Card style={styles.caption}>
                <Card.Content>
                  <TextInput
                    multiline={true}
                    placeholderTextColor="#ffffff"
                    placeholder="Caption..."
                    theme={{ colors: { text: "#ffffff" } }}
                    style={{
                      width: "100%",
                      color: "white",
                      backgroundColor: "#000",
                      borderColor: "white",
                      borderWidth: 1
                    }}
                    onChangeText={(caption) => setCaption(caption)}
                  ></TextInput>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => uploadImage()} color={"white"}>
                    Save
                  </Button>
                </Card.Actions>
              </Card>
            </View>
          </View>
        )}
        {!isPreview && (
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
              <MaterialIcons name="flip-camera-ios" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!isCameraReady}
              onPress={onSnap}
              style={styles.capture}
            />
            <TouchableOpacity
              onPress={() => pickImage()}
              // style={{
              //   borderWidth: 3,
              //   // border: '2 solid',
              //   height: 30,
              //   width: 90,
              //   borderColor: "#0066FF",
              //   marginLeft: 30,
              //   borderRadius: 5,
              //   justifyContent: "center",
              //   alignItems: "center"
              // }}
            >
              <Text
                style={{
                  color: "blue",
                  fontWeight: "bold",
                  borderColor: "blue"
                }}
              >
                {"Upload"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  text: {
    color: "#fff"
  },
  bottomButtonsContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 28,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  closeButton: {
    position: "absolute",
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5A45FF",
    opacity: 0.7
  },
  capture: {
    backgroundColor: "#5A45FF",
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30
  },
  save: {
    borderRadius: 25,
    borderColor: "blue"
  },
  caption: {
    backgroundColor: "#000",
    opacity: 0.5
  }
});
const mapStateToProps = (store) => ({
  token: store.userState.token
});

export default connect(mapStateToProps, null)(Add);
