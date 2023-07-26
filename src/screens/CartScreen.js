import { StyleSheet, FlatList, View, Text, Pressable } from "react-native";
import React from "react";
import CartItem from "../components/CartItem";
import cart from "../data/cart";

const PriceDetailsContainer = () => {
  const subtotal = 100;
  const deliveryFee = 50;
  const total = 1000;

  return (
    <View style={styles.priceContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>${subtotal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>${deliveryFee} </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>${total}</Text>
      </View>
    </View>
  );
};

const CartScreen = () => {
  return (
    <>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartItem item={item} />}
        ListFooterComponent={PriceDetailsContainer}
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Checkout</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: "red",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default CartScreen;
