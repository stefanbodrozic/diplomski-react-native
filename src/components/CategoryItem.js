import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const CategoryItem = (item) => {
  const { title, image, price } = item;

  const handleItem = () => {
    console.log("redirect to product screen");
  };

  return (
    <TouchableOpacity onPress={handleItem}>
      <View style={styles.root}>
        <View>
          <Text style={styles.title}>Item Title {title}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://reactnative.dev/docs/assets/p_cat2.png",
            }}
          />
        </View>
        <View>
          <Text style={styles.price}>$100 {price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;
const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 30,
  },
  imageContainer: {
    marginTop: 10,
    backgroundColor: "red",
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    color: "red",
    marginTop: 50,
  },
});
