import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Item from "./Item";

const StoreContainer = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.storeName}>
        <Text>Store Name</Text>
      </View>
      <ScrollView horizontal={true} style={styles.scrollView}>
        <Item name="test" />
        <Item name="test" />

        <Item name="test" />

        <Item name="test" />
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
});
