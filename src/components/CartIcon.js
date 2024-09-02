import { Pressable, Text, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { getNumberOfProductsInCart } from '../store/slices/cart'
import { SCREENS } from '../helpers/screens'

const CartIcon = () => {
  const navigation = useNavigation()

  const count = useSelector(getNumberOfProductsInCart)

  return (
    <Pressable
      onPress={() => navigation.navigate(SCREENS.CART)}
      style={styles.button}
    >
      <FontAwesome5
        name="shopping-cart"
        size={18}
        color="gray"
      />
      <Text style={styles.text}>{count}</Text>
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

export default CartIcon
