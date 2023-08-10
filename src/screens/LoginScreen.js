import { Pressable, StyleSheet, Text, View } from "react-native";

import styles from "../config/styles";

import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import TextInputField from "../components/form/TextInputField";

import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../config/schema";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Status, getFirebaseUserError } from "../util";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, getUserStatus } from "../store/slices/user";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const fetchUserDetailsStatus = useSelector(getUserStatus);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (fetchUserDetailsStatus === Status.IDLE)
        dispatch(fetchUserDetails(user.email));
      else if (fetchUserDetailsStatus === Status.FULLFILED) {
        navigation.navigate("Home");
      }
    } else {
      console.log("login");
    }
  });

  const navigation = useNavigation();

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "stefan1@mail.com",
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
