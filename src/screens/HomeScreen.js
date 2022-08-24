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
import { useSelector } from "react-redux";
import CategoryItem from "../components/CategoryItem";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
  const user = useSelector((state) => state.user);

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
        <Text>Categories</Text>
        {/* categories.map... */}
        <Text>Category ONE</Text>

        <ScrollView horizontal={true}>
          {/* show 4 products and show more button */}
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <TouchableOpacity
            style={styles.showMoreContainer}
            onPress={handleShowMore}
          >
            <Ionicons name="add-outline" size={30} style={styles.addIcon} />
            <Text>Show more</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    paddingTop: 80,
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
});
