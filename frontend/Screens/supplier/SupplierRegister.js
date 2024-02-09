import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../Constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../../Components/Button";
import { useNavigation } from "@react-navigation/native";

import Toast from "react-native-toast-message";
import baseURL from "../../assets/common/baseurl";
import axios from "axios";

import mime from "mime";
import * as ImagePicker from "expo-image-picker";

const SupplierRegister = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [streetName, setStreetName] = useState("");
  const [purokNum, setPurokNum] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  const [image, setImage] = useState("");
  const [mainImage, setMainImage] = useState();

  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate("User", { screen: "Login" });}

  useEffect(() => {
    (async () => {
      setRole("admin");
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

  const register = (props) => {
    let formData = new FormData();
    const newImageUri = "file:///" + image.split("file:/").join("");
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("phone", phone);
    formData.append("houseNo", houseNo);
    formData.append("streetName", streetName);
    formData.append("purokNum", purokNum);
    formData.append("barangay", barangay);
    formData.append("city", city);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
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

    axios
      .post(`${baseURL}users/register`, formData, config)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });
          setTimeout(() => {
            navigateToLogin();
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          position: "bottom",
          bottomOffset: 20,
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
          {/* FIRST AND LAST NAME */}
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  marginBottom: 8,
                }}>
                First Name
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 10,
                }}>
                <TextInput
                  placeholder="Enter your first name"
                  placeholderTextColor="black"
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  onChangeText={(text) => setFname(text)}
                />
              </View>
            </View>

            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  marginBottom: 8,
                }}>
                Last Name
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 10,
                }}>
                <TextInput
                  placeholder="Enter your last name"
                  placeholderTextColor="black"
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  onChangeText={(text) => setLname(text)}
                />
              </View>
            </View>
          </View>

          {/* MOBILE NUMBER */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}>
              Mobile Number
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 15,
              }}>
              <TextInput
                placeholder="+63"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "12%",
                  borderRightWidth: 1,
                  borderLeftColor: COLORS.grey,
                  height: "100%",
                }}
              />

              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "80%",
                }}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
          </View>

          {/* PUROK NUM AND HOUSE NUM  */}
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  marginBottom: 8,
                }}>
                House No.
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 10,
                }}>
                <TextInput
                  placeholder="Enter your house no."
                  placeholderTextColor="black"
                  keyboardType="number-pad"
                  style={{
                    width: "100%",
                  }}
                  onChangeText={(text) => setHouseNo(text)}
                />
              </View>
            </View>

            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  marginBottom: 8,
                }}>
                Purok No.
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 10,
                }}>
                <TextInput
                  placeholder="Enter your purok no."
                  placeholderTextColor="black"
                  keyboardType="number-pad"
                  style={{
                    width: "100%",
                  }}
                  onChangeText={(text) => setPurokNum(text)}
                />
              </View>
            </View>
          </View>

          {/* STREET NAME */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}>
              Street Name
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
                placeholder="Enter your street name"
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={{
                  width: "100%",
                }}
                onChangeText={(text) => setStreetName(text)}
              />
            </View>
          </View>

          {/* BARANGAY AND CITY */}
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  marginBottom: 8,
                }}>
                Barangay
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 10,
                }}>
                <TextInput
                  placeholder="Enter your barangay"
                  placeholderTextColor="black"
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  onChangeText={(text) => setBarangay(text)}
                />
              </View>
            </View>

            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  marginBottom: 8,
                }}>
                City
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 10,
                }}>
                <TextInput
                  placeholder="Enter your city"
                  placeholderTextColor="black"
                  keyboardType="default"
                  style={{
                    width: "100%",
                  }}
                  onChangeText={(text) => setCity(text)}
                />
              </View>
            </View>
          </View>

          {/* EMAIL ADDRESS */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}>
              Email address
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
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: "100%",
                }}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>

          {/* PASSWORD */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}>
              Password
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
                placeholder="Enter your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%",
                }}
                onChangeText={(text) => setPassword(text)}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}>
                {isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: mainImage }} />
              <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                <Ionicons style={{ color: "white" }} name="camera" />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
            }}>
            <Checkbox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />

            <Text>I aggree to the terms and conditions</Text>
          </View>

          <Button
            title="Sign Up"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
            onPress={() => register()}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}>
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Already have an account
            </Text>
            <Pressable onPress={navigateToLogin}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: "bold",
                  marginLeft: 6,
                }}>
                Login
              </Text>
            </Pressable>
          </View>
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

export default SupplierRegister;
