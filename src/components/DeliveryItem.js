import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DeliveryItem = ({ delivery }) => {
  console.log("delivery: ", delivery);
  return (
    <View>
      {/* <Text>
        {delivery.user?.firstname} {delivery.user?.lastname}
      </Text>
      <Text>{delivery.totalPrice}</Text> */}
    </View>
  );
};

export default DeliveryItem;

const styles = StyleSheet.create({});
