import { Pressable, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

const CartIcon = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("Cart")}
      style={{ flexDirection: "row" }}
    >
      <FontAwesome5 name="shopping-cart" size={18} color="gray" />
      <Text style={styles.text}>0</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 5,
    fontWeight: "500",
  },
});

export default CartIcon;
