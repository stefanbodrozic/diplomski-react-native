import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../store/slices/cart";
import { getUserData } from "../store/slices/user";

const ProductDetailsScreen = ({ route }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const { product, store } = route.params;

  const dispatch = useDispatch();

  const user = useSelector(getUserData);

  let isOwner = false;

  if (user?.role === "Seller") {
    isOwner = true;
  } else if (
    user?.storeName !== undefined &&
    store?.storeName === user?.storeName
  ) {
    isOwner = true;
  }

  const handleAddToCart = () => {
    dispatch(addProductToCart({ product, store, user }));
    navigation.navigate("Cart");
  };

  return (
    <View>
      <ScrollView>
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <View style={{ padding: 20 }}>
          <Text style={screenStyles.title}>{product.name}</Text>

          <Text style={screenStyles.price}>${product.price}</Text>

          <Text style={screenStyles.description}>{product.description}</Text>
        </View>

        {!isOwner && (
          <Pressable onPress={handleAddToCart} style={screenStyles.button}>
            <Text style={screenStyles.buttonText}>Add to cart</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

const screenStyles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
  },
  button: {
    backgroundColor: "black",
    width: "90%",
    alignSelf: "center",
    padding: 20,
    marginBottom: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ProductDetailsScreen;
