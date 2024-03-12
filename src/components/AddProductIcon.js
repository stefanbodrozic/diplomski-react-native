import { useNavigation } from '@react-navigation/native'
import { Pressable, Text, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

const AddProductIcon = () => {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => navigation.navigate('AddProduct')}
      style={{ flexDirection: 'row' }}
    >
      <FontAwesome5
        name="plus"
        size={18}
        color="gray"
      />
      <Text style={styles.text}>Add Product</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    marginLeft: 5
  }
})

export default AddProductIcon
