import { View, Text } from "react-native";
import React, { useContext } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Login from "../Screens/user/Login";
import Profile from "../Screens/user/Profile";
import Register from "../Screens/user/Register";
const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        option={{
          headerTransparent: true,
        }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        option={{
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
