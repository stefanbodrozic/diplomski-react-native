import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import React from "react";
import CheckoutItem from "../components/CheckoutItem";

const CheckoutScreen = () => {
  const handleCheckout = () => {};

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>CheckoutScreen</Text>

        <View style={styles.checkoutItems}>
          <CheckoutItem />
          <CheckoutItem />
          <CheckoutItem />
          <CheckoutItem />
          <CheckoutItem />
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Total Price</Text>
          <Text style={styles.priceValue}>$1000</Text>
        </View>
        <Button title="Check Out" onPress={handleCheckout} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
    paddingTop: 80,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  priceValue: {
    fontSize: 20,
    color: "red",
  },
});

export default CheckoutScreen;
