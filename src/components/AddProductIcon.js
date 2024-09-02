import { useNavigation } from '@react-navigation/native'
import { Pressable, Text, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { SCREENS } from '../helpers/screens'
const AddProductIcon = () => {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => navigation.navigate(SCREENS.ADD_PRODUCT)}
      style={styles.button}
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
  button: {
    flexDirection: 'row'
  },
  text: {
    fontWeight: '500',
    marginLeft: 5
  }
})

export default AddProductIcon
