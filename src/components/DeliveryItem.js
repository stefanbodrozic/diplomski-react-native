import { Image, StyleSheet, Text, View } from "react-native";

const DeliveryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      {item.isDelivered ? (
        <Image
          style={styles.image}
          source={require("../../assets/completed.png")}
        />
      ) : (
        <Image
          style={styles.image}
          source={require("../../assets/delivery-truck.webp")}
        />
      )}

      <View style={styles.content}>
        <Text style={styles.address}>{item.orderDetails?.address}</Text>
      </View>
    </View>
  );
};

export default DeliveryItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  image: {
    width: "40%",
    aspectRatio: 1,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  address: {
    fontWeight: "500",
    fontSize: 18,
  },
});
