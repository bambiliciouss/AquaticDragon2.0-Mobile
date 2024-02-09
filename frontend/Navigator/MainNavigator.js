import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import { Ionicons } from "@expo/vector-icons";

import HomePage from "../Screens/HomePage";
import UserStack from "./UserStack";
import GallonStack from "./GallonStack";

import CartStack from "./CartStack";
import CartIcon from "../Shared/CartIcon";
const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#00bbff",
      }}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons
                name="home"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="User"
        component={UserStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons
                name="person"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name=" Gallon"
        component={GallonStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons
                name="water"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return (
              <>
                <Ionicons
                  name="cart"
                  style={{ position: "relative" }}
                  color={color}
                  size={30}
                />
                <CartIcon />
              </>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
