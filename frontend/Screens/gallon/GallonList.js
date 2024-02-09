import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import Button from "../../Components/Button";
import { useSelector, useDispatch } from "react-redux";
var { width } = Dimensions.get("window");

import * as actions from "../../Redux/Actions/cartActions";
import Toast from "react-native-toast-message";
const GallonList = ({ item, index }) => {
  const { type, gallonAge, gallonImage } = item;
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <Image
          source={{
            uri: gallonImage ? gallonImage.url : null,
          }}
          resizeMode="contain"
          style={styles.image}
        />

        <Text style={styles.price}>Gallon Type: {type || "N/A"}</Text>
        <Text style={styles.address}>Gallon Age: {gallonAge || "N/A"}</Text>

        <View>
          <Button
            title={"Add to Cart"}
            onPress={() => {
              dispatch(
                actions.addToCart({
                  item,
                  quantity: 1,
                  price: 30,
                })
              );
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: `Added to Cart`,
                text2: "Go to your cart to complete the order",
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardBody: {
    marginBottom: 10,
    padding: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    marginBottom: 5,
  },
  container: {
    flexDirection: "row",
    padding: 5,
    width: width,
    marginBottom: 5,
  },
  image: {
    borderRadius: 10,
    width: width / 3,
    aspectRatio: 1,
    margin: 7,
  },
  item: {
    flexWrap: "wrap",
    marginVertical: 3,
    width: width / 3,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
});

export default GallonList;
