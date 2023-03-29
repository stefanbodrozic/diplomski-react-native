import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import DeliveryItem from "./DeliveryItem";

const Deliveries = ({ deliveries }) => {
  deliveries.map((element) => {
    console.log("deliveries component", element);
  });

  return (
    <View style={styles.root}>
      <FlatList
        data={deliveries}
        renderItem={({ delivery }) => <DeliveryItem delivery={delivery} />}
      />
    </View>
  );
};

export default Deliveries;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingTop: 20,
    padding: 50,
  },
  text: {
    padding: 200,
    color: "red",
  },
});
