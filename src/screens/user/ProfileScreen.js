import React from "react";
import { StyleSheet, View, Image, Button, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../../firebase/firebase-config";
import { signOut } from "firebase/auth";

import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import {
  getLoggedInUser,
  getLoggedInUserStatus,
} from "../../store/slices/usersSlice";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loggedInUserStatus = useSelector(getLoggedInUserStatus);
  console.log("loggedInUserStatus", loggedInUserStatus);

  const user = useSelector(getLoggedInUser);
  useEffect(() => {
    console.log("promenjen status eo ga user: ", user);
  }, [loggedInUserStatus]);

  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log("Unable to logout");
      });
  };

  const handleOrders = () => {
    navigation.navigate("Orders");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://reactnative.dev/docs/assets/p_cat2.png",
          }}
        />
        <View>
          <Text>TEKST {loggedInUserStatus}</Text>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        <Button
          style={styles.optionsItem}
          title="Orders History"
          onPress={handleOrders}
        />
        <Button
          style={styles.optionsItem}
          title="Logout"
          onPress={handleLogout}
        />
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
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 50,
  },
});
