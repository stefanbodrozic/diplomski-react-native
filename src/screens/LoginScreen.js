import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import styles from "../config/styles";

import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = async () => {
    navigation.navigate("Home");
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={screenStyles.root}>
      <View>
        <Text style={styles.text}>Welcome! Please login:</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="email"
          value={email}
          onChange={(text) => setEmail(text)}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

const screenStyles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    alignItems: "center",
    padding: 20,
    paddingTop: 150,
  },
});

export default LoginScreen;
