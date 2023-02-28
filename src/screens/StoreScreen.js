import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { getProductsStatus } from "../store/slices/productsSlice";
import {
  fetchProducts,
  getStoreProducts,
  getStoreProductsStatus,
} from "../store/slices/storesSlice";
import { useEffect } from "react";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f632",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d723",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f635",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d726",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba7",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f638",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d729",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72910",
    title: "Third Item",
  },
];

const StoreScreen = ({ route, navigation }) => {
  const { id, storeName } = route.params; // proslediti samo id product-a i pronaci ga iz store-a

  // pustiti query za dobavljanje podataka
  const dispatch = useDispatch();

  const productsStatus = useSelector(getStoreProductsStatus);
  const products = useSelector(getStoreProducts);

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts(id, storeName));
    }
  }, [productsStatus, dispatch]);

  useEffect(() => {
    console.log("products..", products);
  }, [productsStatus, products]);

  return (
    <SafeAreaView style={styles.root}>
      <Text>{storeName}</Text>
      {/* FlatList renders items lazily, when they are about to appear, and removes items that scroll way off screen to save memory and processing time. */}
      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={products} // DATA ce biti iz baze
        numColumns={2}
        renderItem={({ item }) => (
          <Product name={item.name} price={item.price} storeName={storeName} />
        )}
      />
    </SafeAreaView>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    paddingTop: 80,
  },
  scrollView: {
    paddingTop: 20,
  },
  productsContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
