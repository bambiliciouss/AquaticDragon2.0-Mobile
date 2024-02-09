import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import {
  Text,
  HStack,
  VStack,
  Avatar,
  Spacer,
  Center,
  Image,
} from "native-base";

import * as actions from "../../../Redux/Actions/cartActions";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../../assets/common/baseurl";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../../Components/Button";
var { width, height } = Dimensions.get("window");
import AuthGlobal from "../../../Context/store/AuthGlobal";

const Confirm = (props) => {
  const [token, setToken] = useState();

  const context = useContext(AuthGlobal);

  const finalOrder = props.route.params;
  // console.log("order", finalOrder)
  const dispatch = useDispatch();
  let navigation = useNavigation();

  var total = 0;
  const cartItems = useSelector((state) => state.cartItems);

  cartItems.forEach((cart) => {
    return (total += cart.price);
  });

  const [userProfile, setUserProfile] = useState("");

  const confirmOrder = () => {
    const cartContent =
      finalOrder.order.orderAndStatuAndClaimAndStore.orderAndStatuAndClaim
        .orderAndStatus.orderItems;
    const itemsPrice = cartContent.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const deliveryFee = parseFloat(
      finalOrder.order.orderAndStatuAndClaimAndStore.storeDetails.deliverFee
    );
    const totalPrice = itemsPrice + deliveryFee;
    //console.log(totalPrice)

    const order = {
      orderItems:
        finalOrder.order.orderAndStatuAndClaimAndStore.orderAndStatuAndClaim
          .orderAndStatus.orderItems,
      //notes,
      containerStatus:
        finalOrder.order.orderAndStatuAndClaimAndStore.orderAndStatuAndClaim
          .orderAndStatus.selectedContainerStatus,
      orderclaimingOption:
        finalOrder.order.orderAndStatuAndClaimAndStore.orderAndStatuAndClaim
          .selectedClaimMethod,
      storeBranch: {
        store: finalOrder.order.orderAndStatuAndClaimAndStore.selectedStore,
        branchNo:
          finalOrder.order.orderAndStatuAndClaimAndStore.storeDetails.branchNo,
        address: ` ${finalOrder.order.orderAndStatuAndClaimAndStore.storeDetails.houseNo}, ${finalOrder.order.orderAndStatuAndClaimAndStore.storeDetails.purokNum}, ${finalOrder.order.orderAndStatuAndClaimAndStore.storeDetails.streetName}, ${finalOrder.order.orderAndStatuAndClaimAndStore.storeDetails.barangay}, ${finalOrder.order.orderAndStatuAndClaimAndStore.storeDetails.city} `,
        deliveryFee:
          finalOrder.order.orderAndStatuAndClaimAndStore.storeDetails
            .deliverFee,
      },
      paymentInfo: finalOrder.order.selectedPayment,
      totalPrice: totalPrice,
      deliveryAddress: {
        houseNo: userProfile.houseNo,
        streetName: userProfile.streetName,
        purokNum: userProfile.purokNum,
        barangay: userProfile.barangay,
        city: userProfile.city,
      },
    };

    console.log("FINAL ORDER", order);
    //console.log("USER",context);
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${baseURL}/order/new`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Completed",
            text2: "",
          });

          setTimeout(() => {
            dispatch(actions.clearCart());
            navigation.navigate("My Cart");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  useEffect(() => {
    console.log(finalOrder);
    const fetchData = async () => {
      try {
        if (
          context.stateUser.isAuthenticated === false ||
          context.stateUser.isAuthenticated === null
        ) {
          navigation.navigate("Login");
        }

        const jwt = await AsyncStorage.getItem("jwt");
        const response = await axios.get(`${baseURL}me`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });

        setUserProfile(response.data.user);

        // Log the user data here
        //console.log("User Data", response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      // Cleanup code if needed
      setUserProfile("");
      console.log("Data Cleared");
    };
  }, [
    context.stateUser.isAuthenticated,
    context.stateUser.user.id,
    navigation,
  ]);

  cartItems.forEach((cart) => {
    return (total += cart.price);
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../../../assets/logo2.0.png")}
            resizeMode="contain"
            alt="gege"
          />
          <Text style={styles.headerText}>Order Summary</Text>
        </View>
        {props.route.params ? (
          <View>
            <Text style={styles.label}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>
                {userProfile.houseNo}, {userProfile.purokNum},{" "}
                {userProfile.streetName}, {userProfile.barangay},{" "}
                {userProfile.city}
              </Text>
            </View>

            <Text style={styles.label}>Delivery Fee:</Text>
            <Spacer />
            <Text textAlign={"right"}>
              ₱
              {
                finalOrder.order.orderAndStatuAndClaimAndStore.storeDetails
                  .deliverFee
              }
              .00
            </Text>

            {/* <Text style={styles.label}>totalPrice:</Text>
            <Spacer />
            <Text textAlign={"right"}>₱{total}</Text> */}

            <Text style={styles.itemsHeader}>Items:</Text>

            {finalOrder.order.orderAndStatuAndClaimAndStore.orderAndStatuAndClaim.orderAndStatus.orderItems.map(
              (item) => (
                <HStack
                  space={[2, 3]}
                  justifyContent="space-between"
                  key={item.gallon}>
                  <Avatar
                    size="48px"
                    source={{
                      uri:
                        item.image ||
                        "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                    }}
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold>
                      {item.type}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start">
                    ₱ {item.price}.00
                  </Text>
                </HStack>
              )
            )}
          </View>
        ) : null}

        <View style={{ width: "100%", alignItems: "center", paddingTop: 30 }}>
          <Button
            title="Place order"
            filled
            style={{
              width: 300,
            }}
            onPress={confirmOrder}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
  },

  itemsHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },

  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default Confirm;
