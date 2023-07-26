import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import ScrollItem from "../components/ScrollItem";
import Search from "../components/Search";
import SingleStoreContainer from "../components/StoreContainer";
import categories from "../data/categories";
import stores from "../data/stores";
import { Text } from "react-native";

const HomeScreen = () => {
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
