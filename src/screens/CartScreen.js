import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartPriceDetailsContainer from "../components/CartPriceDetailsContainer";
import { getCart, getCartData } from "../store/slices/cart";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import uuid from "react-native-uuid";

const CartScreen = () => {
  const data = useSelector(getCartData);
  const cart = useSelector(getCart);

  const handleCheckout = async () => {
    try {
      const tempCart = { ...cart };
      tempCart.createdAt = serverTimestamp();

      await addDoc(collection(db, "orders"), {
        id: uuid.v4(),
        ...tempCart,
      });
    } catch (error) {
      console.log("Error: ", e);
    }
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => <CartItem item={item} />}
        ListFooterComponent={CartPriceDetailsContainer}
      />
      <Pressable onPress={handleCheckout} style={styles.button}>
        <Text style={styles.buttonText}>Checkout</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default CartScreen;
