import React, { useState } from "react";
import { View, Button, StyleSheet, TextInput } from "react-native";

import { auth, db } from "../../../../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";

import { useDispatch } from "react-redux";
import {
  loginRegisteredUser,
  getUserInfo,
} from "../../../store/slices/usersSlice";

import { useNavigation } from "@react-navigation/native";

import SelectUserRole from "../../../components/SelectUserRole";

import uuid from "react-native-uuid";

const RegisterScreen = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [storeName, setStoreName] = useState("");
  const [role, setRole] = useState("Customer");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleChangeRole = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleRegisterButton = async () => {
    let user = {
      id: uuid.v4(),
      firstname,
      lastname,
      username,
      email,
      role,
      address,
      timestamp: serverTimestamp(),
    };

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential) {
        user.email = userCredential.user.email;
        user.token = userCredential.user.stsTokenManager.accessToken; // proveriti da li je ovo potrebno
      }

      await addDoc(collection(db, "users"), user);

      dispatch(loginRegisteredUser(getUserInfo));

      navigation.navigate("MainScreen");
    } catch (e) {
      console.error("Error while creating new user: ", e);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="firstname"
          value={firstname}
          onChangeText={(text) => setFirstname(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="lastname"
          value={lastname}
          onChangeText={(text) => setLastname(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

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

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
      </View>

      <SelectUserRole onChangeRole={handleChangeRole} />

      {role === "Seller" && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="store name"
            value={storeName}
            onChangeText={(text) => setStoreName(text)}
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegisterButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    paddingTop: 80,
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
    justifyContent: "center",
    width: "70%",
  },
});

export default RegisterScreen;
