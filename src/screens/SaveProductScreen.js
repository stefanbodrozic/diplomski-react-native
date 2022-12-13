import {
  Button,
  StyleSheet,
  TextInput,
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
import { db } from "../../firebase/firebase-config";
import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import uuid from "react-native-uuid";

import { useSelector } from "react-redux";

const SaveProductScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  const user = useSelector((state) => state.user);

  const productId = uuid.v4();

  const product = {
    id: productId,
    title,
    description,
    price,
    category,
    user: {},
    images: [],
    timestamp: serverTimestamp(),
  };

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

  const updateProduct = async (docId, imageUrl) => {
    const subcollection = "stores";
    const productsRef = doc(db, "products", subcollection);
    const storeRef = collection(
      productsRef,
      "prodavnica 123 i njeni proizvodi" // ovo ce biti od prodavca - naziv prodavnice
    );

    const productRef = doc(storeRef, docId);

    await updateDoc(productRef, {
      images: arrayUnion(imageUrl),
    });
  };

  const updateProductWithImgURLs = (docId) => {
    images.map((image) => uploadImageAsync(image, docId));
  };

  const uploadImageAsync = async (image, docId) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    console.log("dosao do upload async");

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    // izvuci podatke iz store o prodavcu (naziv prodavnice) kada se korisnik uloguje

    const storage = getStorage();
    const storageRef = ref(
      storage,
      `prodavnica 123 i njeni proizvodi/${title}/img_${productId}`
      // naziv prodavnice / naziv proizvoda / naziv slike
    );

    const upload = await uploadBytes(storageRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    let imageURL = null;

    if (upload) {
      console.log("Uploaded a blob or file!");

      const imageURL = await getDownloadURL(
        ref(
          storage,
          `prodavnica 123 i njeni proizvodi/${title}/img_${productId}`
        )
      );

      await updateProduct(docId, imageURL); // pronadji product i dodaj samo jedan url cim se slika uploaduje
    }
  };

  const handleSaveButton = async () => {
    try {
      // sacuvati slike i iz response-a uzeti linkove do slika

      const subcollection = "stores";
      const productsRef = doc(db, "products", subcollection);
      const storeRef = collection(
        productsRef,
        "prodavnica 123 i njeni proizvodi" // ovo ce biti od prodavca - naziv prodavnice
      );
      const docRef = await addDoc(storeRef, product, productId);
      if (docRef) {
        // u ovom trenutku je dokument kreiran i mozemo da ga update-ujemo sa image urls
        await updateProductWithImgURLs(docRef.id);
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  const handleCancelButton = () => {
    console.log("user: ", user);
  };

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