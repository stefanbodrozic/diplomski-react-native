import { Image, StyleSheet, View, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("screen");

const SliderItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={item.img} resizeMode="contain" style={styles.image} />

      {/* <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View> */}
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    width,
    height: 500,
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
  },
  //   content: {
  //     flex: 0.4,
  //     alignItems: "center",
  //   },
  //   title: {
  //     fontSize: 24,
  //     fontWeight: "bold",
  //     color: "#333",
  //   },
  //   description: {
  //     fontSize: 18,
  //     marginVertical: 12,
  //     color: "#333",
  //   },
  //   price: {
  //     fontSize: 32,
  //     fontWeight: "bold",
  //   },
});
