import { FontAwesome5 } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import styles from "../config/styles";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import { getUserData } from "../store/slices/user";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import uuid from "react-native-uuid";

const AddProductScreen = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("random description");
  const [price, setPrice] = useState();
  const [images, setImages] = useState([]);

  const user = useSelector(getUserData);

  const imgDirectory = FileSystem.documentDirectory + "images/";

  const validateImgDirectory = async () => {
    const directory = await FileSystem.getInfoAsync(imgDirectory);
    if (!directory.exists) {
      await FileSystem.makeDirectoryAsync(imgDirectory, {
        intermediates: true,
      });
    }
  };

  const selectImage = async (useLibrary) => {
    let image;

    if (useLibrary) {
      image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    } else {
      await ImagePicker.requestCameraPermissionsAsync();

      image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    }

    if (!image.canceled) {
      saveImage(image.assets[0].uri);
    }
  };

  const saveImage = async (uri) => {
    await validateImgDirectory();

    const filename = new Date().getTime() + "-product.jpg";
    const destination = imgDirectory + filename;

    await FileSystem.copyAsync({
      from: uri,
      to: destination,
    });

    setImages([...images, destination]);
  };

  const renderItem = (item) => {
    return (
      <View style={screenStyles.renderImageContainer}>
        <Image
          source={{ uri: item.item }}
          style={{ width: 150, height: 150 }}
        />
        <View style={screenStyles.deleteImageContainer}>
          <Text>Delete image</Text>
          <Pressable onPress={() => deleteImage(item.item)}>
            <FontAwesome5 name="trash-alt" size={18} color="red" />
          </Pressable>
        </View>
      </View>
    );
  };

  const deleteImage = async (uri) => {
    await FileSystem.deleteAsync(uri);
    setImages(images.filter((image) => image !== uri));
  };

  const saveProduct = async () => {
    try {
      const urls = await uploadImages();

      const product = {
        id: uuid.v4(),
        name: productName,
        description,
        price,
        images: urls,
        categoryId: "", //TODO
      };

      const storeRef = doc(db, "stores", user.docRefId);
      const productsRef = collection(storeRef, "products");

      await addDoc(productsRef, product);
    } catch (error) {
      console.log("error while saving product data", error);
    }
  };

  const uploadImages = async () => {
    try {
      let links = [];

      const storage = getStorage();

      await Promise.all(
        images.map(async (image, index) => {
          const response = await fetch(image);
          const blob = await response.blob();

          const productsRef = ref(
            storage,
            `${user.storeName}/${productName}/${productName}_${index}`
          );

          const upload = uploadBytes(productsRef, blob);

          if (upload) {
            const url = await getDownloadURL(productsRef);
            links.push(url);
          }
        })
      );

      return links;
    } catch (error) {
      console.log("error while trying to upload images..", error.message);
    }
  };

  return (
    <SafeAreaView style={screenStyles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Product name"
          value={productName}
          onChangeText={(text) => setProductName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
          numberOfLines={10}
          maxLength={50}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={(text) => setPrice(text)}
          keyboardType="number-pad"
        />
      </View>

      {images && (
        <ScrollView>
          <FlatList
            data={images}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          />
        </ScrollView>
      )}

      <View style={screenStyles.buttons}>
        <Pressable style={styles.button} onPress={() => selectImage(true)}>
          <Text style={styles.buttonText}>Choose from phone</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => selectImage(false)}>
          <Text style={styles.buttonText}>Capture image</Text>
        </Pressable>
      </View>

      <View style={screenStyles.saveButton}>
        <Pressable style={styles.button} onPress={saveProduct}>
          <Text style={styles.buttonText}>Save product</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddProductScreen;

const screenStyles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    alignItems: "center",
    padding: 20,
  },
  renderImageContainer: {
    padding: 10,
  },
  deleteImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 2,
  },
  buttons: {
    flexDirection: "row",
  },
  saveButton: {
    flexGrow: 1,
    marginTop: 20,
  },
});
