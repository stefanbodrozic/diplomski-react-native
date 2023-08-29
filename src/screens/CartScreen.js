import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartPriceDetailsContainer from "../components/CartPriceDetailsContainer";
import { getCart, getCartData, resetCart } from "../store/slices/cart";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import uuid from "react-native-uuid";
import { getUserData } from "../store/slices/user";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const navigation = useNavigation();

  const data = useSelector(getCartData);
  const cart = useSelector(getCart);

  const user = useSelector(getUserData);

  const dispatch = useDispatch();

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
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => <CartItem item={item} />}
        ListFooterComponent={CartPriceDetailsContainer}
      />
      {user.role !== "Seller" && (
        <Pressable onPress={handleCheckout} style={styles.button}>
          <Text style={styles.buttonText}>Checkout</Text>
        </Pressable>
      )}
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
