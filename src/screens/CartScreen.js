import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartPriceDetailsContainer from "../components/CartPriceDetailsContainer";
import { getCartData } from "../store/slices/cart";

const CartScreen = () => {
  const data = useSelector(getCartData);

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => <CartItem item={item} />}
        ListFooterComponent={CartPriceDetailsContainer}
      />
      <Pressable style={styles.button}>
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
