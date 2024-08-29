import { StyleSheet, Text, View } from 'react-native'
import { Controller } from 'react-hook-form'
import { SelectList } from 'react-native-dropdown-select-list'
import { useEffect, useState } from 'react'

const Dropdown = ({ control, name, data }) => {
  const [placeholder, setPlaceholder] = useState('')

  useEffect(() => {
    if (name === 'role') setPlaceholder('Please select your role')
    else if (name === 'category') setPlaceholder('Please select category')
  }, [name])

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error }
      }) => (
        <>
          <View style={styles.inputContainer}>
            <SelectList
              value={value}
              setSelected={onChange}
              data={data}
              save="value"
              placeholder={placeholder}
              boxStyles={{
                borderColor: error ? '#ff0000' : '#e8e8e8',
                width: 275
              }}
              search={false}
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
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '90%'
  }
})

export default Dropdown
