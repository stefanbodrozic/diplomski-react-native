import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Controller } from 'react-hook-form'

const TextInputField = ({
  control,
  name,
  placeholder,
  isPassword,
  autoCapitalize,
  keyboardType
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error }
      }) => (
        <>
          <View
            style={[
              styles.inputContainer,
              { borderColor: error ? '#ff0000' : '#e8e8e8' }
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.textInput}
              autoCapitalize={autoCapitalize}
              secureTextEntry={isPassword}
              keyboardType={keyboardType}
            />
          </View>
          {error && <Text style={styles.errorMessage}>{error.message}</Text>}
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    alignSelf: 'stretch',
    color: 'red',
    marginLeft: 20
  },
  inputContainer: {
    borderColor: '#e8e8e8',
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 10,
    margin: 20,
    paddingHorizontal: 10,
    width: '90%'
  }
})

export default TextInputField
