import { Pressable, StyleSheet, Text, View } from "react-native";

import styles from "../config/styles";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import TextInputField from "../components/form/TextInputField";
import { registerSchema } from "../config/schema";

import Dropdown from "../components/form/Dropdown";
import roles from "../helpers/roles";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getFirebaseUserError } from "../util";
import uuid from "react-native-uuid";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const { control, handleSubmit, register, watch, getValues } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const role = watch("role");

  const handleRegister = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        getValues("email"),
        getValues("password")
      );

      if (response.user) {
        const storeName = getValues("storeName");

        const user = {
          id: uuid.v4(),
          uid: response.user.uid,
          firstname: getValues("firstname"),
          lastname: getValues("lastname"),
          username: `${getValues("firstname")}.${getValues("lastname")}`,
          email: getValues("email"),
          role: getValues("role"),
          address: getValues("address"),
          timestamp: serverTimestamp(),
        };

        if (user.role === "Seller") {
          user.storeName = storeName;

          const docRef = await addDoc(collection(db, "stores"), {
            id: uuid.v4(),
            userId: user.id,
            storeName: user.storeName,
            address: user.address,
            timestamp: serverTimestamp(),
          });

          user.docRefId = docRef.id;
        }

        await addDoc(collection(db, "users"), user);
        navigation.navigate("Home");
      }
    } catch (error) {
      const errorMessage = getFirebaseUserError(error);
      console.log("error: ", errorMessage);
    }
  };
  const onInvalid = (errors) => console.error(errors);

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
        autoCapitalize="none"
        isPassword={true}
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
        <Pressable
          onPress={handleSubmit(handleRegister, onInvalid)}
          style={styles.button}
        >
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
