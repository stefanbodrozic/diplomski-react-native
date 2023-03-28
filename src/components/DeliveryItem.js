import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DropShadow from "react-native-drop-shadow";

const DeliveryItem = () => {
  return (
    <DropShadow
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
      }}
    >
      <View>
        <Text>DeliveryItem</Text>
      </View>
    </DropShadow>
  );
};

export default DeliveryItem;

const styles = StyleSheet.create({});
