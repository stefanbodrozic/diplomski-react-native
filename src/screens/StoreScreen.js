import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

import stores from "../data/stores";
import ProductPreview from "../components/ProductPreview";

const StoreScreen = ({ route }) => {
  const { storeId, storeName } = route.params;
  console.log("storescreen id", storeId);

  const selectedStore = stores.find((store) => store.name === storeName);

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.storeName}>{storeName}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={selectedStore.products}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductPreview product={item} storeName={storeName} />
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
