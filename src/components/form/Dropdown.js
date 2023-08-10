import { StyleSheet, Text, View } from "react-native";
import { Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";

const Dropdown = ({ control, name, data }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View style={[styles.inputContainer]}>
            <SelectList
              value={value}
              setSelected={onChange}
              data={data}
              save="value"
              defaultOption={data[0]}
              boxStyles={{
                borderColor: error ? "#ff0000" : "#e8e8e8",
                width: 275,
              }}
              search={false}
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
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "90%",
  },
  errorMessage: {
    marginLeft: 20,
    color: "red",
    alignSelf: "stretch",
  },
});

export default Dropdown;
