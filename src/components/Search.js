import { StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [text, setText] = useState("");

  const onChangeText = (text) => {
    setText(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={onChangeText}
        style={styles.input}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  input: {
    backgroundColor: "#70E2FF",
    height: 40,
    width: "90%",
    margin: 10,
    paddingLeft: 20,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
  },
});
export default Search;
