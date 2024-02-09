import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const HomePage = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.name}>Welcome to Aquatic Dragon!</Text>
          </View>
          <Image
            source={require("../assets/logo2.0.png")}
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
            }}
          />
          <View style={styles.cardContent}>
            <Text style={styles.description}>
              With the Aquatic Dragon application, ordering water is now easier
              than ever. This application provides a seamless experience,
              allowing you to place an order from the comfort of your home or
              office.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.name}>About Us</Text>
          </View>
          <Text style={styles.nameafter}>Refill.Rehydrate.Repeat.</Text>
          <View style={styles.cardContent}>
            <View style={styles.iconRow}>
              <Image
                source={require("../assets/onboarding_2.png")}
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: "center",
                  borderRadius: 100,
                  backgroundColor: "#4a94d9",
                }}
              />

              <Text
                style={[styles.description, { width: "65%", paddingLeft: 15 }]}>
                Aquatic Dragon Water Refilling Station is your go-to location
                for clean, pure, and sustainable refreshment. At Aquatic Dragon
                Water Refilling Station, we believe that access to safe and
                refreshing drinking water should be convenient, environmentally
                responsible, and affordable for everyone.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.name}>Contact Us</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.iconRow}>
              <Ionicons name="call" size={25} color="black" />
              <Text style={styles.description}> 0908-866-1978</Text>
            </View>
            <View style={styles.iconRow}>
              <Ionicons name="location-outline" size={25} color="black" />
              <Text style={[styles.description, { width: "80%" }]}>
                Blk-15 Lot 7 Chavez St., Cor. Estante St. Purok-3, Central
                Bicutan, Taguig City
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("User", { screen: "Login" })}>
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("User", { screen: "Register" })}>
            <Text style={styles.login}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c9ebff",
    padding: 20,
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor: "white",
    marginHorizontal: 5,
    borderRadius: 30,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 12.5,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  name: {
    fontSize: 18,
    color: "#696969",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  nameafter: {
    fontSize: 15,
    color: "#696969",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    fontStyle: "italic",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 14,
    color: "#696969",
    textAlign: "justify",
  },

  iconRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  loginButton: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  registerButton: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});
export default HomePage;
