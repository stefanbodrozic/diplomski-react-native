import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const CategoryItem = ({ name }) => {
  const handleItem = () => {
    console.log("redirect to product screen", name);
  };

  return (
    <TouchableOpacity onPress={handleItem}>
      <View style={styles.root}>
        <View>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://reactnative.dev/docs/assets/p_cat2.png",
            }}
          />
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
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    color: "red",
    marginTop: 50,
  },
});
