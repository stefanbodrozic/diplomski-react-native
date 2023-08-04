import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "react-native";

const ScrollItem = ({ item }) => {
  const handleItem = () => {};

  return (
    <TouchableOpacity onPress={handleItem}>
      <View style={styles.root}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: item.image || item.images[0],
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 30,
    margin: 10,
  },
  imageContainer: {
    marginTop: 10,
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ScrollItem;
