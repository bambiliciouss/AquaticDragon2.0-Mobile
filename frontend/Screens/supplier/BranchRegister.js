import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import baseURL from "../../assets/common/baseurl";
import axios from "axios";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../Constants/colors";
import Button from "../../Components/Button";

import AuthGlobal from "../../Context/store/AuthGlobal";

const BranchRegister = () => {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();

  const [user, setUser] = useState("");
  const [branchNo, setBranchNo] = useState("");
  const [streetName, setStreetName] = useState("");
  const [purokNum, setPurokNum] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [deliverFee, setDeliverFee] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.userId);
    }
  }, [context.stateUser.isAuthenticated]);

  const RegisterBranch = () => {
    let branchStore = {
      branchNo: branchNo,
      user: user,
      streetName: streetName,
      purokNum: purokNum,
      barangay: barangay,
      city: city,
      deliverFee: deliverFee,
    };
    console.log(branchStore);

    axios
      .post(`${baseURL}supplier/registersupplierbranch`, branchStore)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Branch Store Registered",
            text2: "",
          });

          setTimeout(() => {
            navigation.navigate("Store Branches", { screen: "Branch" });
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
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
              Register Store Branch
            </Text>
          </View>

          {/* BranchNo */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}>
              Branch No
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
                placeholder="Enter Branch No."
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "100%",
                }}
                onChangeText={(text) => setBranchNo(text)}
              />
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}>
              Purok No.
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
                placeholder="Enter your Purok No."
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "100%",
                }}
                onChangeText={(text) => setPurokNum(text)}
              />
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

          {/* STREET NAME */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}>
              Delivery Fee
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
                placeholder="Enter Delivery Fee"
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={{
                  width: "100%",
                }}
                onChangeText={(text) => setDeliverFee(text)}
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
            onPress={() => RegisterBranch()}
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

export default BranchRegister;
