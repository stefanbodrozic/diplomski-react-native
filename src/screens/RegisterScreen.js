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
import { addDoc, collection } from "firebase/firestore";
import uuid from "react-native-uuid";
import { auth, db } from "../config/firebase";
import { Status, getFirebaseUserError } from "../util";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  getCategories,
  getCategoriesStatus,
} from "../store/slices/categories";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const categories = useSelector(getCategories);
  const fetchCategoriesStatus = useSelector(getCategoriesStatus);

  let categoriesDropdown = [];
  categories.forEach((category) =>
    categoriesDropdown.push({
      key: category.id,
      value: category.name,
    })
  );

  useEffect(() => {
    if (fetchCategoriesStatus === Status.IDLE) {
      dispatch(fetchCategories());
    }
  }, [fetchCategoriesStatus, categories, dispatch]);

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
        const user = {
          id: uuid.v4(),
          uid: response.user.uid,
          firstname: getValues("firstname"),
          lastname: getValues("lastname"),
          username: `${getValues("firstname")}.${getValues("lastname")}`,
          email: getValues("email"),
          role: getValues("role"),
          address: getValues("address"),
          timestamp: new Date().toLocaleString(),
        };

        if (user.role === "Seller") {
          const storeName = getValues("storeName");
          const category = getValues("category");
          user.storeName = storeName;

          const docRef = await addDoc(collection(db, "stores"), {
            id: uuid.v4(),
            category,
            userId: user.id,
            storeName: user.storeName,
            address: user.address,
            timestamp: new Date().toLocaleString(),
          });

          user.storeRefId = docRef.id;
        }

        await addDoc(collection(db, "users"), user);
        navigation.navigate("Main");
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

      {role === "Seller" && categories.length > 0 && (
        <>
          <TextInputField
            name="storeName"
            placeholder="Store name"
            control={control}
          />

          <Dropdown
            name="category"
            control={control}
            data={categoriesDropdown}
          />
        </>
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
