import { Pressable, StyleSheet, Text, View } from "react-native";

import styles from "../config/styles";

import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import TextInputField from "../components/form/TextInputField";

import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../config/schema";

const LoginScreen = () => {
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "test@mail.com",
      password: "12345",
    },
  });

  const handleLogin = async (data) => {
    // console.log(data);
    navigation.navigate("Home");
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={screenStyles.root}>
      <View>
        <Text style={styles.text}>Welcome! Please login: </Text>
      </View>

      <TextInputField name="email" placeholder="Email" control={control} />

      <TextInputField
        name="password"
        placeholder="Password"
        control={control}
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
