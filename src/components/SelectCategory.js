import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";

import { useSelector } from "react-redux";

const SelectCategory = ({ onChangeCategory }) => {
  const [category, setCategory] = useState("");

  const options = useSelector((state) => state.categories.categories);

  return (
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      //   imageStyle={styles.imageStyle}
      //   iconStyle={styles.iconStyle}
      maxHeight={200}
      value={category}
      data={options}
      valueField="id"
      labelField="name"
      imageField="image"
      onChange={(e) => {
        setCategory(e.value);
        onChangeCategory(e.name);
      }}
    />
  );
};

export default SelectCategory;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  //   imageStyle: {
  //     width: 24,
  //     height: 24,
  //     borderRadius: 12,
  //   },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  //   iconStyle: {
  //     width: 20,
  //     height: 20,
  //   },
});
