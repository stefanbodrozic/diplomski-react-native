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

const AddProductScreen = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);

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

  const saveProduct = () => {};

  return (
    <SafeAreaView style={screenStyles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Product name"
          value={productName}
          onChange={(text) => setProductName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Description"
          value={description}
          onChange={(text) => setDescription(text)}
          multiline
          numberOfLines={10}
          maxLength={50}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Price"
          value={price}
          onChange={(text) => setPrice(Number(text))}
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
