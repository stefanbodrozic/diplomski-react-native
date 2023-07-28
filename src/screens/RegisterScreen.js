import { Pressable, StyleSheet, Text, View } from "react-native";

import styles from "../config/styles";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import TextInputField from "../components/form/TextInputField";
import { registerSchema } from "../config/schema";

import Dropdown from "../components/form/Dropdown";
import roles from "../helpers/roles";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const role = watch("role");

  const handleRegister = async () => {
    navigation.navigate("Home");
  };

  return (
    <View style={screenStyles.root}>
      <View>
        <Text style={styles.text}>Please register: </Text>
      </View>

      <TextInputField
        name="firstname"
        placeholder="Firstname"
        control={control}
      />

      <TextInputField
        name="lastname"
        placeholder="Lastname"
        control={control}
      />

      <TextInputField name="email" placeholder="Email" control={control} />

      <TextInputField
        name="password"
        placeholder="Password"
        control={control}
      />

      <TextInputField name="address" placeholder="Address" control={control} />

      <Dropdown name="role" control={control} data={roles} />

      {role === "Seller" && (
        <TextInputField
          name="storeName"
          placeholder="Store name"
          control={control}
        />
      )}

      <View style={styles.buttonContainer}>
        <Pressable onPress={handleSubmit(handleRegister)} style={styles.button}>
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
  },
});

export default RegisterScreen;
