import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Slider from "../components/Slider";

import { useDispatch } from "react-redux";
import { addProductToCart } from "../store/slices/cartSlice";

const ProductScreen = ({ route, navigation }) => {
  const { product, storeName } = route.params;

  const dispatch = useDispatch();

  const handleAddToCartButton = () => {
    dispatch(addProductToCart({ product, storeName }));
  };
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <Slider />

        <View style={styles.informations}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>{product.price}$</Text>

          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Button
            style={styles.button}
            title="Add to cart"
            onPress={handleAddToCartButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  root: {
    padding: 20,
    paddingTop: 80,
  },
  informations: {},
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
    color: "red",
  },
  description: {
    fontSize: 18,
    marginVertical: 22,
  },
});