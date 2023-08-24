import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ScrollItem from "../components/ScrollItem";
import Search from "../components/Search";
import SingleStoreContainer from "../components/StoreContainer";
import { fetchCategories, getCategories } from "../store/slices/categories";
import {
  fetchStores,
  getAllStores,
  getAllStoresStatus,
} from "../store/slices/stores";
import { Status } from "../util";

const HomeScreen = () => {
  const [filteredStores, setFilteredStores] = useState([]);
  const dispatch = useDispatch();

  const categories = useSelector(getCategories);
  const stores = useSelector(getAllStores);

  const storesStatus = useSelector(getAllStoresStatus);

  useEffect(() => {
    if (storesStatus === Status.IDLE) {
      dispatch(fetchStores());
    } else if (storesStatus === Status.FULLFILED) {
      setFilteredStores(stores);
    }

    dispatch(fetchCategories());
  }, [dispatch, storesStatus]);

  const handleCategoryFilter = (category) => {
    const filter = stores.filter((store) => store.category === category);

    setFilteredStores(filter);
  };

  return (
    <SafeAreaView style={screenStyles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <Search />
        <ScrollView horizontal={true} style={screenStyles.scrollView}>
          {categories.map((category) => (
            <ScrollItem
              key={category.id}
              item={category}
              isCategory={true}
              handleCategoryFilter={handleCategoryFilter}
            />
          ))}
        </ScrollView>

        {filteredStores?.length < 1 && <Text>No data!</Text>}

        {filteredStores?.length >= 1 &&
          filteredStores.map((store) => (
            <SingleStoreContainer key={store.id} store={store} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const screenStyles = StyleSheet.create({
  root: {
    backgroundColor: "#EBFBFF",
    // height: "100%",
  },
  scrollView: {
    margin: 20,
  },
});

export default HomeScreen;
