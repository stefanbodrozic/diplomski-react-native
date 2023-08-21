import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import TextInputField from "../components/form/TextInputField";
import { auth, db } from "../config/firebase";
import { profileSchema } from "../config/schema";
import styles from "../config/styles";
import { getUserData } from "../store/slices/user";
import { doc, updateDoc } from "firebase/firestore";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(getUserData);

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      address: user.address,
      username: user.username,
    },
  });

  const handleSave = async () => {
    console.log("save..");
    const newFirstname = getValues("firstname");
    const newLastname = getValues("lastname");
    const newAddress = getValues("address");
    const newUsername = getValues("username");

    const userRef = doc(db, "users", user.docId);

    await updateDoc(userRef, {
      firstname: newFirstname,
      lastname: newLastname,
      address: newAddress,
      username: newUsername,
    });
  };

  const handleLogout = () => {
    signOut(auth);
    navigation.navigate("Login");
  };

  const onInvalid = (errors) => console.error(errors);

  return (
    <View style={screenStyles.root}>
      <View style={screenStyles.textContainer}>
        <Text style={styles.text}>Firstname:</Text>
      </View>
      <TextInputField
        name="firstname"
        placeholder="Firstname"
        control={control}
      />

      <View style={screenStyles.textContainer}>
        <Text style={styles.text}>Lastname:</Text>
      </View>
      <TextInputField
        name="lastname"
        placeholder="Lastname"
        control={control}
      />

      <View style={screenStyles.textContainer}>
        <Text style={styles.text}>Address:</Text>
      </View>
      <TextInputField name="address" placeholder="Address" control={control} />

      <View style={screenStyles.textContainer}>
        <Text style={styles.text}>Username:</Text>
      </View>
      <TextInputField
        name="username"
        placeholder="Username"
        control={control}
      />

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleSubmit(handleSave, onInvalid)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>

        <Pressable onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.buttonContainer}></View>
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
  textContainer: {
    marginRight: 210,
  },
});

export default ProfileScreen;
