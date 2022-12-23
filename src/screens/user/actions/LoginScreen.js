import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from "react-native";
import { auth, db } from "../../../../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useDispatch } from "react-redux";
import { getUserInfo } from "../../../store/slices/usersSlice";

import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { fetchCategories } from "../../../store/slices/categoriesSlice";

const LoginScreen = () => {
  // const [email, setEmail] = useState("user@user.com"); // admin
  // const [password, setPassword] = useState("123456789");

  // const [email, setEmail] = useState("prodavac@gmail.com"); // prodavac
  // const [password, setPassword] = useState("prodavac12345");

  const [email, setEmail] = useState("test6@gmail.con"); // prodavac
  const [password, setPassword] = useState("Qwertyuiop");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleLoginButton = async () => {
    // check credentials and redirect to home screen
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (response) {
        dispatch(getUserInfo());
        dispatch(fetchCategories());

        navigation.navigate("MainScreen");
        // navigation.navigate("SaveProduct");
        // navigation.navigate("Categories");
      }
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === "auth/invalid-email") showToast("Invalid email!");
      else if (errorCode === "auth/wrong-password")
        showToast("Wrong password!");
      else if (errorCode === "auth/user-not-found")
        showToast("User not found!");
      else if (errorCode === "auth/user-disabled")
        showToast("User is blocked!");
    }
  };

  const handleRegisterButton = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.root}>
      <Text>Login screen</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLoginButton} />
        <Button title="Register" onPress={handleRegisterButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    paddingTop: 150,
  },
  inputContainer: {
    backgroundColor: "white",
    width: "100%",
    borderColor: "e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
});

export default LoginScreen;
