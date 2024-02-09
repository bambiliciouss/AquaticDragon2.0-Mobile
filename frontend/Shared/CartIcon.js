import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";
import { useSelector } from "react-redux";

const CartIcon = (props) => {
  const cartItems = useSelector((state) => state.cartItems);
  return (
    <>
      {cartItems.length ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{cartItems.length}</Text>
        </Badge>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: 30,
    height: 30,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -4,
    right: 10,
    backgroundColor: "#00bbff",
    borderRadius: 15,
  },
  text: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default CartIcon;
