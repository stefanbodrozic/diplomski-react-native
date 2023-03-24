import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useDispatch, useSelector } from "react-redux";
import {
  setProductQuantityInCart,
  removeProductFromCart,
  getProductsFromCart,
} from "../store/slices/cartSlice";

const CheckoutItem = ({ name, price }) => {
  const dispatch = useDispatch();

  const products = useSelector(getProductsFromCart);
  const product = products.find((product) => product.name === name);

  const increaseQuantity = () => {
    dispatch(setProductQuantityInCart({ name, type: "increase" }));
  };
  const decreaseQuantity = () => {
    dispatch(setProductQuantityInCart({ name, type: "decrease" }));
  };

  const removeItem = () => {
    dispatch(removeProductFromCart(name));
  };

  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://reactnative.dev/docs/assets/p_cat2.png",
          }}
        />
      </View>
      <View style={styles.itemInfoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}$</Text>
      </View>
      <View style={styles.itemActionsContainer}>
        <Ionicons
          key={1}
          name="trash"
          size={20}
          style={styles.trash}
          onPress={removeItem}
        />
        <View style={styles.quantityContainer}>
          <Ionicons
            key="remove"
            name="remove-outline"
            size={20}
            style={styles.counter}
            onPress={decreaseQuantity}
          />
          <Text style={styles.quantity}>{product.quantity}</Text>
          <Ionicons
            key="add"
            name="add-outline"
            size={20}
            style={styles.counter}
            onPress={increaseQuantity}
          />
        </View>
      </View>
    </View>
  );
};

export default CheckoutItem;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 15,
    borderRadius: 30,
  },
  imageContainer: {
    backgroundColor: "red",
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  itemInfoContainer: {
    paddingLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    color: "red",
    marginTop: 50,
  },
  itemActionsContainer: {},
  trash: {
    paddingLeft: 10,
    color: "red",
    height: 40,
    width: 30,
  },
  quantityContainer: {
    marginTop: 20,
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: "green",
  },
  quantity: {
    margin: 10,
  },
  counter: {
    backgroundColor: "yellow",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
  },
});
