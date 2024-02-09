// import { View, Text } from "react-native";
// import React from "react";
// import Button from "../../Components/Button";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";
// const Cart = () => {
//   const navigation = useNavigation();

//   return (
//     <View>
//       <Button
//         title="Shipping"
//         filled
//         style={{
//           marginTop: 4,
//           marginBottom: 10,
//         }}
//         onPress={() => navigation.navigate("Checkout")}
//       />
//     </View>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as actions from "../../Redux/Actions/cartActions";
import {
  Container,
  Text,
  Box,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Divider,
  Center,
  Heading,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { Ionicons } from "@expo/vector-icons";
var { height, width } = Dimensions.get("window");
import Button from "../../Components/Button";

const Cart = () => {
  const [price, setPrice] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const navigation = useNavigation();

  var total = 0;
  const cartItems = useSelector((state) => state.cartItems);

  cartItems.forEach((cart) => {
    return (total += cart.price);
  });
  dispatch = useDispatch();
  useEffect(() => {
   
    setTotalAmount(total);
    // console.log(totalAmount);
  });

  const checktoCheckout = () => {
    let order = {
      price,
      totalAmount,
    };
    console.log("shiptotal", order);
    navigation.navigate("Checkout");
  };
  const renderItem = ({ item, index }) => (
    <TouchableHighlight
      onPress={() => console.log("You touched me")}
      _dark={{
        bg: "coolGray.800",
      }}
      _light={{
        bg: "white",
      }}>
      <Box pl="4" pr="5" py="2" bg="white" keyExtractor={(item) => item.id}>
        <HStack alignItems="center" space={3}>
          <Avatar
            size="48px"
            source={{
              uri: item.image || "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
          />
          <VStack>
            <Text
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              bold>
              {item.type}
            </Text>
          </VStack>
          <Spacer />
       
          <Text
            fontSize="xs"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            
            alignSelf="flex-start">
            ₱ {item.price}
          </Text>

        </HStack>
      </Box>
    </TouchableHighlight>
  );

  const renderHiddenItem = (cartItems) => (
    <TouchableOpacity
      onPress={() => dispatch(actions.removeFromCart(cartItems.item))}>
      <VStack alignItems="center" style={styles.hiddenButton}>
        <View>
          <Ionicons name="trash" color={"white"} size={30} bg="red" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </View>
      </VStack>
    </TouchableOpacity>
  );

  // console.log(cartItems)

  return (
    <>
      {cartItems.length > 0 ? (
        <Box bg="white" safeArea flex="1" width="100%">
          <SwipeListView
            data={cartItems}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            disableRightSwipe={true}
            leftOpenValue={75}
            rightOpenValue={-150}
            previewOpenValue={-100}
            previewOpenDelay={3000}
            closeOnRowBeginSwipe
          />
        </Box>
      ) : (
        <Box style={styles.emptyContainer}>
          <Text>No items in cart</Text>
        </Box>
      )}

      <VStack
        style={styles.bottomContainer}
        w="100%"
        justifyContent="space-between">
        <HStack justifyContent="space-between">
          <Text style={styles.price}>₱ {total.toFixed(2)}</Text>
        </HStack>
        <HStack>
          <Button
            title={"Clear"}
            style={{
              marginTop: 10,
              marginBottom: 10,
              width: 80,
            }}
            onPress={() => dispatch(actions.clearCart())}></Button>

          <Button
            title="Checkout"
            filled
            style={{
              marginTop: 10,
              marginBottom: 10,
              width: 120,
            }}
            onPress={() => checktoCheckout()}
          />
        </HStack>
      </VStack>
    </>
  );
};
const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: "red",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    // width: 'lg'
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default Cart;
