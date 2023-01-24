import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const StoreItem = ({ storeName }) => {
  const navigation = useNavigation();

  const handleItem = () => {
    navigation.navigate("Product", {
      product: { name: "test random product name", price: 150 },
    });
  };

  return (
    <TouchableOpacity onPress={handleItem}>
      <View style={styles.root}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://reactnative.dev/docs/assets/p_cat2.png",
            }}
          />
        </View>
        <View style={styles.informations}>
          <Text style={styles.pricee}>100$</Text>
          <Text style={styles.product}>{storeName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StoreItem;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    padding: 15,
    margin: 15,
    borderRadius: 30,
  },
  imageContainer: {
    marginTop: 10,
    backgroundColor: "red",
    borderRadius: 10,
    width: 100,
    height: 100,
  },

  pricee: {
    color: "red",
  },
  product: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    color: "red",
    marginTop: 50,
  },
});
