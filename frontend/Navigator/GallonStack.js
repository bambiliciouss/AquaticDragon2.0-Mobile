import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import Gallons from "../Screens/gallon/Gallons";

const GallonStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}>
      <Stack.Screen
        name="Gallons"
        component={Gallons}
        option={{
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};
export default GallonStack;
