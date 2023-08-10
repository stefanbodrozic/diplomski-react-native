import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProductPreview = ({ product, store }) => {
  const navigation = useNavigation();

  const handleProduct = () => {
    navigation.navigate("Product Details", {
      product,
      store,
    });
  };

  return (
    <TouchableOpacity onPress={handleProduct}>
      <View style={styles.root}>
        <Text style={styles.product}>{product.name}</Text>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: product.images[0],
            }}
            style={{ width: 100, height: 100 }}
          />
        </View>
        <View style={styles.informations}>
          <Text style={styles.price}>${product.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductPreview;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    padding: 15,
    margin: 15,
    borderRadius: 30,
  },
  imageContainer: {
    marginTop: 10,
    borderRadius: 10,
    width: 100,
    height: 100,
  },

  price: {
    color: "red",
  },
  product: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    color: "red",
    marginTop: 50,
  },
});
