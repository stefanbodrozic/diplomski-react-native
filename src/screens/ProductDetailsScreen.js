import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  FlatList
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart } from '../store/slices/cart'
import { getUserData } from '../store/slices/user'
import { SCREENS } from '../helpers/screens'

const ProductDetailsScreen = ({ route }) => {
  const { width } = useWindowDimensions()
  const navigation = useNavigation()

  const { product, store } = route.params

  const dispatch = useDispatch()

  const user = useSelector(getUserData)

  let isOwner = false

  if (user?.role === 'Seller') {
    isOwner = true
  } else if (
    user?.storeName !== undefined &&
    store?.storeName === user?.storeName
  ) {
    isOwner = true
  }

  const handleAddToCart = () => {
    dispatch(addProductToCart({ product, store, user }))
    navigation.navigate(SCREENS.CART)
  }

  return (
    <View>
      <ScrollView>
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{
                width,
                aspectRatio: 1
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <View style={{ padding: 20 }}>
          <Text style={screenStyles.title}>{product.name}</Text>

          <Text style={screenStyles.price}>${product.price}</Text>

          <Text style={screenStyles.description}>{product.description}</Text>
        </View>

        {!isOwner && (
          <Pressable
            onPress={handleAddToCart}
            style={screenStyles.button}
          >
            <Text style={screenStyles.buttonText}>Add to cart</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  )
}

const screenStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
    marginBottom: 20,
    padding: 20,
    width: '90%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  description: {
    fontSize: 18,
    fontWeight: '300',
    lineHeight: 30,
    marginVertical: 10
  },
  price: {
    fontSize: 16,
    fontWeight: '500'
  },
  title: {
    fontSize: 34,
    fontWeight: '500',
    marginVertical: 10
  }
})

export default ProductDetailsScreen
