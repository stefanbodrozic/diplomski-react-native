import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { getCartDetails } from "../store/slices/cart";

const CartPriceDetailsContainer = () => {
  const details = useSelector(getCartDetails);

  return (
    <View style={styles.priceContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>${details.price}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>${details.deliveryFee} </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>
          ${details.price + details.deliveryFee}
        </Text>
      </View>
    </View>
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
});

export default CartPriceDetailsContainer;
