import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import ProductPreview from "../components/ProductPreview";

const StoreScreen = ({ route }) => {
  const { store } = route.params;

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.storeName}>{store.name}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={store.products}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductPreview product={item} store={store} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  scrollView: {
    paddingTop: 20,
  },
  productsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  storeName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default StoreScreen;
