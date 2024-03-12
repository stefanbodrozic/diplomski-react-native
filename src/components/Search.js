import { StyleSheet, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Search = ({ handleSearch }) => {
  const [text, setText] = useState('')

  const onChangeText = (text) => {
    setText(text)
    handleSearch(text)
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={onChangeText}
        style={styles.input}
        autoCapitalize="none"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10
  },
  input: {
    alignItems: 'center',
    backgroundColor: '#70E2FF',
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    margin: 10,
    paddingLeft: 20,
    width: '90%'
  }
})
export default Search
