import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useCallback, useContext, useEffect } from "react";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import baseURL from "../../assets/common/baseurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GallonList from "./GallonList";
var { height, width } = Dimensions.get("window");

import AuthGlobal from "../../Context/store/AuthGlobal";
import Button from "../../Components/Button";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

const Gallons = () => {
  const [gallonList, setGallonList] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const context = useContext(AuthGlobal);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      axios.get(`${baseURL}gallon`).then((res) => {
        // console.log(res.data)
        setGallonList(res.data);
        setLoading(false);
      });
      setRefreshing(false);
    }, 2000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!context.stateUser.isAuthenticated) {
        navigation.navigate("User", { screen: "Login" });
      } else {
        console.log(context.stateUser.user);
        AsyncStorage.getItem("jwt")
          .then((res) => {
            axios
              .get(`${baseURL}my-gallons`, {
                headers: { Authorization: `Bearer ${res}` },
              })
              .then((res) => {
                //console.log(res.data);
                setGallonList(res.data.gallon);
                setLoading(false);
                console.log("Gallon List:", res.data);
              });
          })
          .catch((error) => console.log(error));
        return () => {
          setGallonList();
          setLoading(true);
        };
      }
    }, [context.stateUser.isAuthenticated])
  );

  const ListHeader = () => {
    return (
      <View style={styles.listHeader}>
        {/* <View style={styles.headerItem}></View>
        <View style={styles.headerItem}>
          <Text style={styles.headerItem}>Container Type</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerItem}>Gallon Age</Text>
        </View> */}
        <Text style={styles.headerItem}>Image</Text>

        <Text style={styles.headerItem}>Container Type</Text>

        <Text style={styles.headerItem}>Gallon Age</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View>
          <Button
            title="Register New Gallon"
            filled
            style={{
              marginTop: 4,
              marginBottom: 10,
            }}
            onPress={() => navigation.navigate("Register Gallon")}
          />
        </View>

        {/* <FlatList
          data={gallonList}
          ListHeaderComponent={ListHeader}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => (
            <GallonList item={item} index={index} />
          )}
          keyExtractor={(item) => item._id}
        /> */}

        <FlatList
          contentContainerStyle={styles.propertyListContainer}
          data={gallonList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => {
            console.log("Item in FlatList:ugkfvhjgjkhgjkhg",item); // Log the item
            return <GallonList item={item} index={index} />;
          }}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  propertyListContainer: {
    paddingHorizontal: 20,
  },
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "lightblue",
    width: width,
    marginBottom: 5,
  },
  headerItem: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  buttonContainer: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
  container1: {
    flex: 1,
  },
});

export default Gallons;
