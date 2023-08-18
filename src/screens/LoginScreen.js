import { Pressable, StyleSheet, Text, View } from "react-native";

import styles from "../config/styles";

import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import TextInputField from "../components/form/TextInputField";

import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { loginSchema } from "../config/schema";
import { getFirebaseUserError } from "../util";

const LoginScreen = () => {
  const navigation = useNavigation();

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      // email: "admin@mail.com",
      email: "customer@mail.com",
      // email: "seller2@mail.com",
      // email: "deliverer@mail.com",
      password: "password12345",
    },
  });

  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        getValues("email"),
        getValues("password")
      );

      if (response) {
        // TODO: handle role navigation
        navigation.navigate("Home");
      }
    } catch (error) {
      const errorMessage = getFirebaseUserError(error);
      console.log("error: ", errorMessage);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={screenStyles.root}>
      <View>
        <Text style={styles.text}>Welcome! Please login: </Text>
      </View>

      <TextInputField
        name="email"
        placeholder="Email"
        control={control}
        autoCapitalize="none"
      />

      <TextInputField
        name="password"
        placeholder="Password"
        control={control}
        isPassword={true}
      />

      <View style={styles.buttonsContainer}>
        <Pressable onPress={handleSubmit(handleLogin)} style={styles.button}>
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
