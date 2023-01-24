import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Item from "../components/Item";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect } from "react";
import {
  fetchProducts,
  getProducts,
  getProductsStatus,
} from "../store/slices/productsSlice";
import {
  getCategories,
  getCategoriesStatus,
} from "../store/slices/categoriesSlice";
import StoreContainer from "../components/StoreContainer";
import {
  fetchStores,
  getStores,
  getStoresStatus,
} from "../store/slices/storesSlice";

const HomeScreen = () => {
  // const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const categoriesStatus = useSelector(getCategoriesStatus);
  console.log("categories status HOME SCREEN: ", categoriesStatus);

  const categories = useSelector(getCategories);

  const storesStatus = useSelector(getStoresStatus);
  const stores = useSelector(getStores);

  useEffect(() => {
    if (storesStatus === "idle") {
      dispatch(fetchStores());
    }
  }, [storesStatus, dispatch]);

  const handleSearchTextChange = (text) => {
    console.log("text: ", text);
  };

  const handleShowMore = () => {
    console.log("show more");
  };

  return (
    // search bar
    //

    <SafeAreaView style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            onChangeText={(text) => handleSearchTextChange(text)}
          />
        </View>

        <ScrollView horizontal={true} style={styles.scrollView}>
          {/* show 4 products and show more button */}
          {categories.map((category) => {
            return <Item name={category.name} key={category.id} />;
          })}

          <TouchableOpacity
            style={styles.showMoreContainer}
            onPress={handleShowMore}
          >
            <Ionicons name="add-outline" size={30} style={styles.addIcon} />
            <Text>Show more</Text>
          </TouchableOpacity>
        </ScrollView>

        {stores.map((store) => {
          return (
            <StoreContainer
              key={store.id}
              id={store.id}
              name={store.storeName}
              products={store.products}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    // paddingTop: 80,
  },
  searchInput: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 35,
    fontSize: 30,
  },
  showMoreContainer: {
    paddingTop: 50,
    paddingLeft: 20,
  },
  addIcon: {
    paddingLeft: 20,
  },
  scrollView: {
    paddingTop: 20,
  },
});
