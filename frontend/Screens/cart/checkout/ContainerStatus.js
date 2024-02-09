import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Pressable,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  Container,
  Text,
  Radio,
  Right,
  Left,
  Picker,
  Box,
  HStack,
  VStack,
  Heading,
  Divider,
  CheckCircleIcon,
  Select,
  CheckIcon,
} from "native-base";

import Button from "../../../Components/Button";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";

const methods = [
  { name: "Walk In", value: "Walk In" },
  { name: "Pick Up", value: "Pick Up" },
];

const ContainerStatus = () => {
  const cartItems = useSelector((state) => state.cartItems);
  console.log("order", cartItems);
  const [selectedContainerStatus, setselectedContainerStatus] = useState("");

  const navigation = useNavigation();
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    setOrderItems(cartItems);
  });

  const checktoConfirm = () => {
    console.log("orders", cartItems);
    let order = {
      orderItems,
      selectedContainerStatus,
    };
    console.log("orderAndStatus", order);
    navigation.navigate("Order Claim", { order: order });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>Select Container Status:</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Radio.Group
            name="myRadioGroup"
            value={selectedContainerStatus}
            onChange={(value) => {
              setselectedContainerStatus(value);
            }}>
            {console.log(selectedContainerStatus)}
            {methods.map((item, index) => {
              return (
                <Radio
                  key={index}
                  value={item.value}
                  my="1"
                  colorScheme="blue"
                  size="22"
                  style={{ float: "right" }}
                  icon={<CheckCircleIcon size="22" mt="0.5" color="#95a5a6" />}>
                  {item.name}
                </Radio>
              );
            })}
          </Radio.Group>
        </View>
      </View>

      <View style={{ width: "100%", alignItems: "center" }}>
        <Button
          title="Proceed"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
            width: 300,
          }}
          onPress={() => checktoConfirm()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },

  content: {
    marginLeft: 10,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  /******** card **************/
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
    textAlign: "left",
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
    // color: "#696969",
    textAlign: "justify",
  },

  iconRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "right",
  },
});
export default ContainerStatus;
