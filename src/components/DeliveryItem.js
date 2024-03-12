import { doc, updateDoc } from 'firebase/firestore'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../config/firebase'
import { getUserData } from '../store/slices/user'
import { refetchData } from '../store/slices/deliveries'

const DeliveryItem = ({ item, isCustomer }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUserData)

  const assignDelivery = async () => {
    const orderRef = doc(db, 'orders', item.docId)

    updateDoc(orderRef, {
      delivererId: user.id
    })

    dispatch(refetchData())
  }

  const completeDelivery = async () => {
    const orderRef = doc(db, 'orders', item.docId)

    await updateDoc(orderRef, {
      isDelivered: true,
      deliveredAt: new Date().toLocaleString()
    })

    dispatch(refetchData())
  }
  return (
    <View style={styles.container}>
      {item.isDelivered ? (
        <Image
          style={styles.image}
          source={require('../../assets/completed.png')}
        />
      ) : (
        <Image
          style={styles.image}
          source={require('../../assets/delivery-truck.webp')}
        />
      )}

      <View style={styles.content}>
        <Text style={styles.text}>{item.orderDetails?.address}</Text>

        <Text style={styles.info}>{item?.createdAt}</Text>

        {!item.isDelivered && item.delivererId === '' && !isCustomer && (
          <Pressable
            onPress={assignDelivery}
            style={styles.button}
          >
            <Text style={styles.btnText}>Take over</Text>
          </Pressable>
        )}

        {!item.isDelivered && item.delivererId != '' && !isCustomer && (
          <Pressable
            onPress={completeDelivery}
            style={styles.button}
          >
            <Text style={styles.btnText}>Complete</Text>
          </Pressable>
        )}

        {!item.isDelivered && item.delivererId != '' && isCustomer && (
          <Text style={styles.info}>Delivery in progress</Text>
        )}

        {!item.isDelivered && item.delivererId === '' && isCustomer && (
          <Text style={styles.onHold}>On hold</Text>
        )}

        {isCustomer && item.isDelivered && item.delivererId != '' && (
          <Text style={styles.completed}>Completed</Text>
        )}
      </View>
    </View>
  )
}

export default DeliveryItem

const styles = StyleSheet.create({
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500'
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
    marginTop: 50,
    width: '90%'
  },
  completed: {
    color: 'green',
    fontSize: 18,
    fontWeight: '500'
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 20
  },
  content: {
    flex: 1,
    marginLeft: 10
  },
  image: {
    aspectRatio: 1,
    width: '40%'
  },
  info: {
    color: 'blue',
    fontSize: 18,
    fontWeight: '500'
  },
  onHold: {
    color: 'red',
    fontSize: 18,
    fontWeight: '500'
  },
  text: {
    fontSize: 18,
    fontWeight: '500'
  }
})
