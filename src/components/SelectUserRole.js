import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";

const options = [
  {
    value: "1",
    label: "Customer",
    // image: {
    //   uri: "",
    // },
  },
  {
    value: "2",
    label: "Seller",
    // image: {
    //   uri: "",
    // },
  },
  {
    value: "3",
    label: "Deliveryman",
    // image: {
    //   uri: "",
    // },
  },
];

const SelectUserRole = ({ onChangeRole }) => {
  const [role, setRole] = useState("1");

  return (
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={styles.imageStyle}
      iconStyle={styles.iconStyle}
      maxHeight={200}
      value={role}
      data={options}
      valueField="value"
      labelField="label"
      imageField="image"
      onChange={(e) => {
        setRole(e.value);
        onChangeRole(e.label);
      }}
    />
  );
};

export default SelectUserRole;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
