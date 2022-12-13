import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  SafeAreaView,
} from "react-native";

import uuid from "react-native-uuid";

import { db } from "../../firebase/firebase-config";
import {
  doc,
  collection,
  addDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

const CategoryScreen = () => {
  const [name, setName] = useState("");

  const id = uuid.v4();

  const category = {
    id,
    name,
    createdBy: "user",
    timestamp: serverTimestamp(),
  };

  const handleSaveButton = async () => {
    try {
      await addDoc(collection(db, "categories"), category);
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  const handleCancelButton = () => {
    console.log("cancel... go back");
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* ako bude postojao EDIT kategorije koristice se isti screen */}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Category Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSaveButton} />
        <Button title="Cancel" onPress={handleCancelButton} />
      </View>
    </SafeAreaView>
  );
};

export default CategoryScreen;

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
    justifyContent: "space-between",
    width: "70%",
  },
});
