import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getCartDetails, resetCart } from "../store/slices/cart";
import { getUserData } from "../store/slices/user";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

const CartPriceDetailsContainer = () => {
  const details = useSelector(getCartDetails);
  const user = useSelector(getUserData);
  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleCheckout = async () => {
    try {
      const tempCart = { ...cart };
      tempCart.createdAt = new Date().toLocaleString();

      await addDoc(collection(db, "orders"), {
        id: uuid.v4(),
        ...tempCart,
      });

      dispatch(resetCart());

      navigation.navigate("Order History");
    } catch (error) {
      console.log("Error: ", e);
    }
  };

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

      {user.role !== "Seller" && cart.order.length >= 1 && (
        <Pressable onPress={handleCheckout} style={styles.button}>
          <Text style={styles.buttonText}>Checkout</Text>
        </Pressable>
      )}
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
  button: {
    backgroundColor: "black",
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default CartPriceDetailsContainer;
