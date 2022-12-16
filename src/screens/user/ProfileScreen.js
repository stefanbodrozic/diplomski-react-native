import React from "react";
import { StyleSheet, View, Image, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../../firebase/firebase-config";
import { signOut } from "firebase/auth";


import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state) => state.users.user);
  console.log("user sa profile screen-aAAA", user);

  const handleLogout = async () => {
    try {
      // logout user
    } catch (error) {
      console.error("logout error", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://reactnative.dev/docs/assets/p_cat2.png",
          }}
        />
      </View>
      <View style={styles.optionsContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <View style={styles.optionsContainer}></View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 150,
    height: 150,
  },
  optionsContainer: {
    paddingTop: 50,
  },
});
