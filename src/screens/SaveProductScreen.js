import {
  Button,
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import SelectCategory from "../components/SelectCategory";

import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const SaveProductScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  };

  const handleChangeCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleSaveButton = async () => {};

  const handleCancelButton = () => {};

  const handleDeleteImage = (index) => {
    console.log("click delete", index);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="price"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
      </View>

      <SelectCategory onChangeCategory={handleChangeCategory} />

      <Button title="Pick an image from camera roll" onPress={pickImage} />

      <ScrollView horizontal={true} style={styles.imageContainer}>
        {images.map((image, index) => {
          return (
            <>
              <ImageBackground
                key={index}
                source={{ uri: image }}
                style={styles.image}
                progressiveRenderingEnabled={true}
              >
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => handleDeleteImage(index)}
                >
                  <Ionicons
                    key={index}
                    name="trash"
                    size={30}
                    style={styles.trash}
                  />
                </TouchableWithoutFeedback>
              </ImageBackground>
            </>
          );
        })}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSaveButton} />
        <Button title="Cancel" onPress={handleCancelButton} />
      </View>
    </SafeAreaView>
  );
};

export default SaveProductScreen;

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
  imageContainer: {
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
  trash: {
    color: "red",
    height: 40,
    width: 30,
  },
});
