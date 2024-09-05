import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getCart, getCartDetails, resetCart } from '../store/slices/cart'
import { getUserData } from '../store/slices/user'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore'
import { db } from '../config/firebase'
import uuid from 'react-native-uuid'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { SCREENS } from '../helpers/screens'
import {
  initPaymentSheet,
  presentPaymentSheet
} from '@stripe/stripe-react-native'
import { SERVER } from '@env'

const CartPriceDetailsContainer = () => {
  const details = useSelector(getCartDetails)
  const user = useSelector(getUserData)
  const cart = useSelector(getCart)

  const dispatch = useDispatch()

  const navigation = useNavigation()

  const onCheckout = async () => {
    try {
      const tempCart = { ...cart }

      const price =
        tempCart.orderDetails.deliveryFee + tempCart.orderDetails.price

      const intentResponse = await fetch(SERVER, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          price: Math.floor(price * 100)
        })
      })

      if (!intentResponse.ok) {
        console.log('Intent request failed')
        return
      }

      const { clientSecret } = await intentResponse.json()

      // initialize payment sheet
      const initPayment = await initPaymentSheet({
        merchantDisplayName: 'Store App',
        paymentIntentClientSecret: clientSecret
      })

      if (initPayment.error) {
        console.log(initPayment.error)
        return
      }

      // show stripe payment sheet
      const paymentResponse = await presentPaymentSheet()

      if (paymentResponse.error) {
        console.log('Error: ', paymentResponse.error)
        return
      }

      await handleCheckout()
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleCheckout = async () => {
    try {
      const tempCart = { ...cart }
      tempCart.createdAt = new Date().toLocaleString()

      await addDoc(collection(db, 'orders'), {
        id: uuid.v4(),
        ...tempCart
      })

      // update product quantity
      tempCart.order.map(async (product) => {
        // find store reference id
        let storeRefId = ''
        const storeRef = collection(db, 'stores')
        const q = query(storeRef, where('id', '==', product.storeId))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          storeRefId = doc.id
        })

        // find product reference id
        let numberOfProductsInStoreDB = 0
        let productRefId = ''
        const productStoreRef = doc(db, 'stores', storeRefId)
        const productsRef = collection(productStoreRef, 'products')

        const productQuery = query(productsRef, where('id', '==', product.id))
        const productQuerySnapshot = await getDocs(productQuery)
        productQuerySnapshot.forEach((doc) => {
          productRefId = doc.id
          const { numberOfProductsInStore } = doc.data()
          numberOfProductsInStoreDB = numberOfProductsInStore
        })

        // update product quantity
        const productRef = doc(
          db,
          'stores',
          storeRefId,
          'products',
          productRefId
        )

        await updateDoc(productRef, {
          numberOfProductsInStore: numberOfProductsInStoreDB - product.quantity
        })
      })

      dispatch(resetCart())

      // replace navigation stack and redirect to order history screen
      navigation.dispatch(
        CommonActions.reset({
          index: 2,
          routes: [
            { name: SCREENS.HOME },
            { name: SCREENS.MAIN },
            { name: SCREENS.ORDER_HISTORY }
          ]
        })
      )
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <View style={styles.priceContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>${details.price}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>${details.deliveryFee} </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>
          ${details.price + details.deliveryFee}
        </Text>
      </View>

      {user.role !== 'Seller' && cart.order.length >= 1 && (
        <Pressable
          onPress={onCheckout}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Checkout</Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
    marginBottom: 10,
    marginTop: 10,
    padding: 20,
    width: '90%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  priceContainer: {
    borderColor: 'red',
    borderTopWidth: 1,
    margin: 20,
    paddingTop: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2
  },
  text: {
    color: 'gray',
    fontSize: 16
  },
  textBold: {
    fontSize: 16,
    fontWeight: '500'
  }
})

export default CartPriceDetailsContainer
