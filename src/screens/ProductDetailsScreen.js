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
import stores from "../data/stores";

const ProductDetailsScreen = ({ route }) => {
  const { width } = useWindowDimensions();

  const { productId, storeName } = route.params;

  const handleAddToCart = () => {};

  const store = stores.find((store) => store.name === storeName);
  const product = store.products.find((product) => product.id === productId);

  console.log(product);

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

        <Pressable onPress={handleAddToCart} style={screenStyles.button}>
          <Text style={screenStyles.buttonText}>Add to cart</Text>
        </Pressable>
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
    // position: "absolute",

    backgroundColor: "black",
    // bottom: 50,
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
