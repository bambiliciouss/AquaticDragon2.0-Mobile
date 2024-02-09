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
var { width } = Dimensions.get("window");
const BranchList = (item, index) => {
  return (
    // <View
    //   style={[
    //     styles.container,
    //     {
    //       backgroundColor: index % 2 == 0 ? "white" : "gainsboro",
    //     },
    //   ]}>
    //   <Text style={styles.item}>{item.item.branchNo || "N/A"}</Text>

    //   <Text style={styles.item}>{item.item.deliverFee || "N/A"}</Text>
    // </View>

    <View style={styles.card}>
      {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
      <View style={styles.cardBody}>
        <Text style={styles.price}>Branch No. {item.item.branchNo || "N/A"}</Text>
        <Text style={styles.address}>{item.item.streetName  || "N/A"}, {item.item.purokNum  || "N/A"}, {item.item.barangay  || "N/A"}, {item.item.city  || "N/A"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    width: width,
    marginBottom: 5,
  },
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
    fontWeight: 'bold',
    marginBottom: 5
  },
  address: {
    fontSize: 16,
    marginBottom: 5
  },
  image: {
    borderRadius: 10,
    width: width / 3,
    aspectRatio: 1,
    margin: 7,
  },
  item: {
    flex: 1,
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

export default BranchList;
