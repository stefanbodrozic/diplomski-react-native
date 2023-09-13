import { FontAwesome5 } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, doc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import { useSelector } from "react-redux";
import TextInputField from "../components/form/TextInputField";
import { db } from "../config/firebase";
import { newProductSchema } from "../config/schema";
import styles from "../config/styles";
import { getUserData } from "../store/slices/user";
import { useNavigation } from "@react-navigation/native";

const AddProductScreen = () => {
  const [images, setImages] = useState([]);

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(newProductSchema),
  });

  const onInvalid = (errors) => console.error(errors);

  const user = useSelector(getUserData);

  const navigation = useNavigation();

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

  const deleteImage = async (uri) => {
    await FileSystem.deleteAsync(uri);
    setImages(images.filter((image) => image !== uri));
  };

  const saveProduct = async () => {
    try {
      const urls = await uploadImages();

      const product = {
        id: uuid.v4(),
        name: getValues("productName"),
        description: getValues("description"),
        price: getValues("price"),
        quantity: parseInt(getValues("quantity")),
        images: urls,
        createdAt: new Date().toLocaleString(),
      };

      const storeRef = doc(db, "stores", user.storeRefId);
      const productsRef = collection(storeRef, "products");

      const docRef = await addDoc(productsRef, product);
      if (docRef.id) {
        navigation.goBack();
      }
    } catch (error) {
      console.log("error while saving product data", error);
    }
  };

  const uploadImages = async () => {
    try {
      let links = [];

      const storage = getStorage();

      const productName = getValues("productName");

      await Promise.all(
        images.map(async (image) => {
          const response = await fetch(image);
          const blob = await response.blob();

          const imageRef = ref(
            storage,
            `images/${user.storeName}/${productName}/${uuid.v4()}`
          );

          const upload = await uploadBytes(imageRef, blob);

          if (upload) {
            const url = await getDownloadURL(imageRef);
            links.push(url);
          }
        })
      );

      return links;
    } catch (error) {
      console.log("error while trying to upload images..", error.message);
    }
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

  return (
    <SafeAreaView style={screenStyles.root}>
      <TextInputField
        name="productName"
        placeholder="Product name"
        control={control}
      />

      <TextInputField
        name="description"
        placeholder="Description"
        control={control}
      />

      <TextInputField
        name="price"
        placeholder="Price"
        control={control}
        keyboardType="number-pad"
      />

      <TextInputField
        name="quantity"
        placeholder="Quantity"
        control={control}
        keyboardType="number-pad"
      />

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
        <Pressable
          style={styles.button}
          onPress={handleSubmit(saveProduct, onInvalid)}
        >
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
