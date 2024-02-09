// import { View, Text } from 'react-native'
// import React from 'react'

// const Checkout = () => {
//   return (
//     <View>
//       <Text>Checkout</Text>
//     </View>
//   )
// }

// export default Checkout

import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

import { useSelector } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import Toast from "react-native-toast-message";
import Button from "../../../Components/Button";
import AuthGlobal from "../../../Context/store/AuthGlobal";

const Checkout = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cartItems);
  const context = useContext(AuthGlobal);
  const [user, setUser] = useState("");

  const [orderItems, setOrderItems] = useState([]);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setOrderItems(cartItems);

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      let addressDetails = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setHouseNo(addressDetails[0].name);
      setStreet(addressDetails[0].street);
      setCity(addressDetails[0].city);
      setRegion(addressDetails[0].region);
      setCountry(addressDetails[0].country);

      console.log("latitude:", latitude);
      console.log("longitude:", longitude);
      console.log("houseNo:", houseNo);
      console.log("street:", street);
      console.log("City:", city);
      console.log("Region:", region);
      console.log("Country:", country);
    };

    getLocation();

    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.userId);
    } else {
      navigation.navigate("User", { screen: "Login" });
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please Login to Checkout",
        text2: "",
      });
    }
    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    console.log("orders", orderItems);
    let order = {
      orderItems,
    
      latitude,
      longitude,
      houseNo,
      street,
      city,
      region,
      country,
      user,
    };
    console.log("ship", order);
    navigation.navigate("Store", { order: order });
  };
  console.log(orderItems);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 60, paddingBottom: 100 }}>
      <View style={styles.container}>
        <Text>Your Location</Text>
        {/* <Text>Latitude: {latitude}</Text>
        <Text>Longitude: {longitude}</Text> */}
        <Text>City: {city}</Text>
        <Text>Region: {region}</Text>
        <Text>Country: {country}</Text>

        {initialRegion && (
          <MapView style={styles.map} initialRegion={initialRegion}>
            {currentLocation && (
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title="Your Location"
              />
            )}
          </MapView>
        )}
        {/* Rest of your code */}
        <View style={{ width: "100%", alignItems: "center" }}>
          <Button
            title="Confirm Address"
            filled
            style={{
              width: 300,
            }}
            onPress={() => checkOut()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Checkout;
