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
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    marginLeft: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '95%'
  },
  textInput: {
    padding: 7
  }
})

export default TextInputField
