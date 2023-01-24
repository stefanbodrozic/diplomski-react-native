import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Item from "./Item";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const StoreContainer = ({ id, name, products }) => {
  const navigation = useNavigation();

  const handleShowMore = () => {
    navigation.navigate("Store", {
      id,
      storeName: name,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.storeName}>
        <Text> {name}</Text>
      </View>
      <ScrollView horizontal={true} style={styles.scrollView}>
        {/* koristiti ListView zbog performansi */}
        {/* koristiti products umesto dummy data, products ce biti limitiran */}
        <Item name="test" />
        <Item name="test" />

        <Item name="test" />

        <Item name="test" />
        <TouchableOpacity
          style={styles.showMoreContainer}
          onPress={handleShowMore}
        >
          <Ionicons name="add-outline" size={30} style={styles.addIcon} />
          <Text>Show more</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoreContainer;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 30,
  },
  scrollView: {
    paddingTop: 20,
  },
  showMoreContainer: {
    marginTop: 75,
    // paddingTop: 20,
    paddingLeft: 20,
  },
  addIcon: {
    paddingLeft: 20,
  },
});
