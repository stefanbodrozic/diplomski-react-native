import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ScrollItem from "../components/ScrollItem";
import Search from "../components/Search";
import SingleStoreContainer from "../components/StoreContainer";
import { fetchCategories, getCategories } from "../store/slices/categories";
import { fetchStores, getStores } from "../store/slices/stores";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const categories = useSelector(getCategories);
  const stores = useSelector(getStores);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchStores());
  }, []);

  return (
    // if user is customer - render list of stores

    // if user is seller - render seller Store screen (owner of store)
    // <StoreScreen />

    // if user is deliverer - render list of deliveries (todo/done)

    <SafeAreaView style={screenStyles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <Search />
        <ScrollView horizontal={true} style={screenStyles.scrollView}>
          {categories.map((category) => (
            <ScrollItem key={category.id} item={category} />
            // <Text>{category.name}</Text>
          ))}
        </ScrollView>

        {stores.map((store) => (
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
