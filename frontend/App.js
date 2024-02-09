import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./Navigator/MainNavigator";
import Auth from "./Context/store/Auth";
import Toast from "react-native-toast-message";
import store from "./Redux/Store";
import { Provider } from "react-redux";

import { NativeBaseProvider, extendTheme } from "native-base";

const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};
const theme = extendTheme({ colors: newColorTheme });

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer>
            <MainNavigator />
            <Toast />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </Auth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
