import React from "react";
import { StyleSheet, View, Image, Button } from "react-native";
import { useDispatch } from "react-redux";

import { auth } from "../../../firebase/firebase-config";
import { signOut } from "firebase/auth";

import { logout } from "../../store/slices/usersSlice";

import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // check if user is logged in
      if (auth.currentUser) {
        await signOut(auth); // response will be undefined if user is successfully signed out
        dispatch(logout);

        navigation.navigate("Login");
      }
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
