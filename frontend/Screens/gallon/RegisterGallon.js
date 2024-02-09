import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState, useContext, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../Constants/colors";
import Button from "../../Components/Button";

import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import baseURL from "../../assets/common/baseurl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../../Context/store/AuthGlobal";

import mime from "mime";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import { Picker } from "@react-native-picker/picker";

const RegisterGallon = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [type, setType] = useState("");
  const [gallonAge, setGallonAge] = useState("");
  const [image, setImage] = useState("");
  const [mainImage, setMainImage] = useState();

  const context = useContext(AuthGlobal);

  const dropdownItems = [
    { label: "Slim 5 Gallon", value: "Slim 5 Gallon" },
    { label: "Round 5 Gallon", value: "Round 5 Gallon" },

    // Add more options as needed
  ];

  useEffect(() => {
    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.userId);
    }
    console.log(dropdownItems);

    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets);
      setMainImage(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const registerGallon = () => {
    let formData = new FormData();
    const newImageUri = "file:///" + image.split("file:/").join("");

    formData.append("type", type);
    formData.append("gallonAge", gallonAge);
    formData.append("user", user);
    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    console.log(formData);
    axios
      .post(`${baseURL}gallon/registergallons`, formData, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Gallon Registered",
            text2: "",
          });

          setTimeout(() => {
            navigation.navigate("Gallons");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <KeyboardAwareScrollView>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.black,
              }}>
              Register Gallon
            </Text>
          </View>

          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: mainImage }} />
              <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                <Ionicons style={{ color: "white" }} name="camera" />
              </TouchableOpacity>
            </View>
          </View>

          {/* TYPE */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}>
              Type of Gallon Container
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 10,
              }}>
              {/* <TextInput
                ref={typeInputRef}
                placeholder="Enter your type of gallon"
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={{
                  width: "100%",
                }}
                onChangeText={(text) => setType(text)}
              /> */}
              <Picker
                selectedValue={type}
                onValueChange={(itemValue) => setType(itemValue)}
                style={{ height: 40, width: "100%", borderColor: 'red', borderWidth: 1 }}>
                <Picker.Item label="Choose here..." value={null} />
                {dropdownItems.map((item) => (
                  <Picker.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* AGE */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}>
              Age
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 10,
              }}>
              <TextInput
                placeholder="Enter your age"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "100%",
                }}
                onChangeText={(text) => setGallonAge(text)}
              />
            </View>
          </View>

          <Button
            title="Register"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
            onPress={() => registerGallon()}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderColor: "#E0E0E0",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

export default RegisterGallon;
