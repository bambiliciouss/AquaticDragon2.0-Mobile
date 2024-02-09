import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../Components/Button";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/Actions/Auth.actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Error from "../../constants/Error";


const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordShown, setIsPasswordShown] = useState(true);

  const context = useContext(AuthGlobal);
  const navigation = useNavigation();

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };


  useEffect(() => {
    AsyncStorage.getItem("email").then((value) => setEmail(value || ""));
    AsyncStorage.getItem("password").then((value) => setPassword(value || ""));
    console.log("login",context);

    if (context.stateUser.isAuthenticated === true) {
      navigation.navigate("Profile");
      console.log("Login Successfully");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    setError("");
    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setError("Please fill in your email address");
      setEmailError(true);
    } else if (password === "") {
      setError("Please fill in your password");
      setPasswordError(true);
    } else {
      loginUser(user, context.dispatch);
      console.log("User Profile", context);
    }
  };

  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      stores.map((result, i, store) => {
        // console.log({ [store[i][0]]: store[i][1] });
        return true;
      });
    });
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <KeyboardAwareScrollView>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 22 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}>
              <Image
                source={require("../../assets/logo2.0.png")}
                style={{ width: 200, height: 200 }}
              />
            </View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.black,
                textAlign: "center",
              }}>
              Hi Welcome Back
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
                textAlign: "center",
              }}>
              Aquatic Dragon
            </Text>
          </View>

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
                borderColor: emailError ? "red" : COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}>
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={emailError ? "red" : COLORS.black}
                keyboardType="email-address"
                style={{
                  width: "100%",
                }}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => {
                  setEmail(text.toLowerCase());
                  setEmailError(false);
                }}
              />
            </View>
            {emailError ? <Error message={error} /> : null}
          </View>

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
                borderColor: passwordError ? "red" : COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={passwordError ? "red" : COLORS.black}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%",
                }}
                name={"password"}
                id={"password"}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError(false);
                }}
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
            {passwordError ? <Error message={error} /> : null}
          </View>
          <View>
            {/* {error ? <Error message={error} /> : null} */}
            <Button
              title="Login"
              filled
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
              onPress={() => handleSubmit()}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}>
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Don't have an account ?
            </Text>
            <Pressable onPress={navigateToRegister}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: "bold",
                  marginLeft: 6,
                }}>
                Register
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
