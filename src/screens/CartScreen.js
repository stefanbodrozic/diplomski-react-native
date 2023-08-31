import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartPriceDetailsContainer from "../components/CartPriceDetailsContainer";
import { getCartData } from "../store/slices/cart";
import { getUserData } from "../store/slices/user";

const CartScreen = () => {
  const data = useSelector(getCartData);

  const user = useSelector(getUserData);

  return (
    <View>
      {user.role === "Seller" ? (
        <Text>Available for customers only!</Text>
      ) : (
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => <CartItem item={item} />}
            ListFooterComponent={CartPriceDetailsContainer}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default CartScreen;
