import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";

const TextInputField = ({ control, name, placeholder }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.inputContainer,
              { borderColor: error ? "#ff0000" : "#e8e8e8" },
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.textInput}
              autoCapitalize="none"
            />
          </View>
          {error && <Text style={styles.errorMessage}>{error.message}</Text>}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    margin: 20,
    width: "90%",
  },
  errorMessage: {
    marginLeft: 20,
    color: "red",
    alignSelf: "stretch",
  },
});

export default TextInputField;
