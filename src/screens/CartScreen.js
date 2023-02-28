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

import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  getProductsFromCart,
  getTotalPrice,
} from "../store/slices/cartSlice";

const CartScreen = () => {
  const dispatch = useDispatch();

  const products = useSelector(getProductsFromCart);
  const totalPrice = useSelector(getTotalPrice);

  const handleOrderNow = () => {
    dispatch(confirmOrder());
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.checkoutItems}>
          {products.map((product, index) => {
            return (
              <CheckoutItem
                key={index}
                name={product.name}
                price={product.price}
              />
            );
          })}
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Total Price</Text>
          <Text style={styles.priceValue}>{totalPrice}$</Text>
        </View>
        <Button title="Order now" onPress={handleOrderNow} />
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

export default CartScreen;
