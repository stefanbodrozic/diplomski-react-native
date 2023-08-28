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
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, getUserData } from "../store/slices/user";

const LoginScreen = () => {
  const navigation = useNavigation();
  const userDetails = useSelector(getUserData);
  const dispatch = useDispatch();

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      // email: "admin@mail.com",
      // email: "customer@mail.com",
      email: "seller5@mail.com",
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
        dispatch(fetchUserDetails(getValues("email")));

        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
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
        <Pressable
          onPress={handleSubmit(handleLogin)}
          style={screenStyles.button}
        >
          <Text style={screenStyles.buttonText}>Login</Text>
        </Pressable>

        <Pressable onPress={handleRegister} style={screenStyles.button}>
          <Text style={screenStyles.buttonText}>Register</Text>
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
  button: {
    backgroundColor: "black",
    width: "45%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default LoginScreen;
