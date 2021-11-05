import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "react-native-elements";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Add({ navigation }) {
  const [hasGalleryPermission, setHasGallaryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNjEyODcyMiwiZXhwIjoxNjM2MTMyMzIyLCJuYmYiOjE2MzYxMjg3MjIsImp0aSI6IldRQ3dXR2dCcFNxaXV2b3YiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.jgC4jTU_DiWNUHXJ_F5t0yIOGa-7L0m778JfDkv1DX0"


  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGallaryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({ allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true
      });
      // base64: true,
      setImage(data.base64);
      console.log("base64", data);
    }
    setType(1);
    setIsPreview(true);
    // console.log("base64",data )
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    axios.post("http://127.0.0.1:8000/api/upload_media", {
      image:result.base64,
      type: 0,
      caption: 'caption'
      
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
    setType(0);
    setImage(result.base64);
    console.log("base64", result.base64);
  };
  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={{ flex: 1, justifyContent: "space-between" }}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <View style={styles.cameraButton}>
        {/* flip-camera-android */}
        {/* <Button
          tittle="flip Image"
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        ></Button> */}

        {/* <Button title="Take Picture" onPress={() => takePicture() }/> */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            marginBottom: 30,
            alignItems: "flex-start"
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => navigation.navigate("Save", { image, type })}
          >
            <MaterialCommunityIcons
              name="content-save"
              style={{ color: "#ADD8E6", fontSize: 50 }}
            ></MaterialCommunityIcons>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => takePicture()}
          >
            <MaterialCommunityIcons
              name="circle-outline"
              style={{ color: "#ADD8E6", fontSize: 100 }}
            ></MaterialCommunityIcons>
            {/* <Icon name="ios-images" style={{ color: 'blue ', fontSize: 36 }} /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pickImage()}>
            <MaterialCommunityIcons
              name="image-album"
              style={{ color: "#ADD8E6", fontSize: 36, marginBottom: 10 }}
            ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
        {/* <Button title="Pic image from gallery" onPress={() => pickImage()} />
        <TouchableOpacity
          onPress={() => takePicture()}
          style={[styles.postActionIcon, { paddingLeft: 0 }]}
        >
          <Icon name="camera" type="MaterialIcons" size={30} />
        </TouchableOpacity>
        <Button
          title="Save"
          onPress={() => navigation.navigate("save", { image })}
        /> */}
      </View>
      <View style={styles.container}></View>
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row"
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  },
  cameraButton: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
