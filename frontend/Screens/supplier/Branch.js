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
import React, { useState, useCallback, useContext } from "react";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import baseURL from "../../assets/common/baseurl";
import AsyncStorage from "@react-native-async-storage/async-storage";

var { height, width } = Dimensions.get("window");

import AuthGlobal from "../../Context/store/AuthGlobal";
import Button from "../../Components/Button";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import BranchList from "./BranchList";
const Branch = () => {
  const [branchList, setBranchList] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const context = useContext(AuthGlobal);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      axios.get(`${baseURL}supplier`).then((res) => {
        // console.log(res.data)
        setBranchList(res.data);
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
              .get(`${baseURL}supplier/`, {
                headers: { Authorization: `Bearer ${res}` },
              })
              .then((res) => {
                //console.log(res.data);
                setBranchList(res.data);
                setLoading(false);
                console.log("Gallon List:", branchList);
              });
          })
          .catch((error) => console.log(error));
        return () => {
          setBranchList();
          setLoading(true);
        };
      }
    }, [context.stateUser.isAuthenticated])
  );

 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View>
          <Button
            title="Register Store"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
            onPress={() =>
              navigation.navigate("Store Branches", {
                screen: "BranchRegister",
              })
            }
          />
        </View>

    

        <FlatList
          contentContainerStyle={styles.propertyListContainer}
          data={branchList}
          renderItem={({ item, index }) => (
            <BranchList item={item} index={index} />
          )}
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

export default Branch;
