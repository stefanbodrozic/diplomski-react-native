import { FontAwesome5 } from '@expo/vector-icons'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import {
  removeProductFromCart,
  updateProductQuantity
} from '../store/slices/cart'
import { ActionType } from '../util'

const CartItem = ({ item }) => {
  const dispatch = useDispatch()

  const increaseQuantity = () => {
    dispatch(
      updateProductQuantity({ product: item, actionType: ActionType.INCREASE })
    )
  }

  const decreaseQuantity = () => {
    dispatch(
      updateProductQuantity({ product: item, actionType: ActionType.DECREASE })
    )
  }

  const removeProduct = () => {
    dispatch(removeProductFromCart({ product: item }))
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.images[0] }}
        style={styles.image}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.size}>
          {item.description.split(' ').slice(0, 10).join(' ')}...
        </Text>

        <View style={styles.footer}>
          <Pressable onPress={decreaseQuantity}>
            <FontAwesome5
              name="minus-circle"
              size={24}
            />
          </Pressable>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <Pressable onPress={increaseQuantity}>
            <FontAwesome5
              name="plus-circle"
              size={24}
            />
          </Pressable>

          <Text style={styles.itemTotal}>$ {item.price * item.quantity}</Text>
          <Pressable onPress={removeProduct}>
            <FontAwesome5
              name="trash"
              size={18}
            />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 20
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 'auto'
  },
  image: {
    aspectRatio: 1,
    width: '40%'
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 'auto',
    marginRight: 5
  },
  name: {
    fontSize: 18,
    fontWeight: '500'
  },
  quantity: {
    color: 'gray',
    fontWeight: 'bold',
    marginHorizontal: 10
  },
  size: {
    color: 'gray',
    fontSize: 16
  }
})

export default CartItem
