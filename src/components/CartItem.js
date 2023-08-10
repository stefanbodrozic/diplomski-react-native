import { FontAwesome5 } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import {
  removeProductFromCart,
  updateProductQuantity,
} from "../store/slices/cart";
import { ActionType } from "../util";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    dispatch(
      updateProductQuantity({ product: item, actionType: ActionType.INCREASE })
    );
  };

  const decreaseQuantity = () => {
    dispatch(
      updateProductQuantity({ product: item, actionType: ActionType.DECREASE })
    );
  };

  const removeProduct = () => {
    dispatch(removeProductFromCart({ product: item }));
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.images[0] }} style={styles.image} />

      <View style={styles.contentContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.size}>
          {item.description.split(" ").slice(0, 10).join(" ")}...
        </Text>

        <View style={styles.footer}>
          <Pressable onPress={decreaseQuantity}>
            <FontAwesome5 name="minus-circle" size={24} />
          </Pressable>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <Pressable onPress={increaseQuantity}>
            <FontAwesome5 name="plus-circle" size={24} />
          </Pressable>

          <Text style={styles.itemTotal}>$ {item.price * item.quantity}</Text>
          <Pressable onPress={removeProduct}>
            <FontAwesome5 name="trash" size={18} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: "40%",
    aspectRatio: 1,
  },
  name: {
    fontWeight: "500",
    fontSize: 18,
  },
  size: {
    fontSize: 16,
    color: "gray",
  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "gray",
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  itemTotal: {
    fontSize: 16,
    marginLeft: "auto",
    fontWeight: "500",
    marginRight: 5,
  },
});

export default CartItem;
