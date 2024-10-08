import { doc, updateDoc } from 'firebase/firestore'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../config/firebase'
import { getUserData } from '../store/slices/user'
import { refetchData } from '../store/slices/deliveries'
import { useNavigation } from '@react-navigation/native'
import { sendPushNotification } from '../util'
import { SCREENS } from '../helpers/screens'

const DeliveryItem = ({ item, isCustomer }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const user = useSelector(getUserData)

  const assignDelivery = async () => {
    const customerExpoPushToken = item.orderDetails.userExpoPushToken
    if (!customerExpoPushToken) return

    const orderRef = doc(db, 'orders', item.docId)

    updateDoc(orderRef, {
      delivererId: user.id
    })

    let updatedOrder = { ...item }
    updatedOrder.delivererId = user.id

    const data = {
      screen: 'Order Details',
      params: {
        order: updatedOrder
      }
    }

    await sendPushNotification(
      customerExpoPushToken,
      'Delivery information',
      'The delivery is on the way!',
      data
    )

    dispatch(refetchData())
  }

  const completeDelivery = async () => {
    const customerExpoPushToken = item.orderDetails.userExpoPushToken
    if (!customerExpoPushToken) return

    const orderRef = doc(db, 'orders', item.docId)
    let notificationMessage

    if (user.role === 'Warehouseman') {
      notificationMessage = 'The order is ready to be delivered'

      await updateDoc(orderRef, {
        isReadyInWarehouse: true,
        isDelivered: false
      })
    } else {
      notificationMessage = 'The delivery has arrived!'

      await updateDoc(orderRef, {
        isDelivered: true,
        deliveredAt: new Date().toLocaleString()
      })
    }


    await sendPushNotification(
      customerExpoPushToken,
      'Delivery information',
      notificationMessage
    )

    dispatch(refetchData())
  }

  return (
    <View style={styles.container}>
      {!item.isDelivered && !item.isReadyInWarehouse && (
        <Image
          style={styles.image}
          source={require('../../assets/warehouse.jpg')}
        />
      )}

      {!item.isDelivered && item.isReadyInWarehouse && (
        <Image
          style={styles.image}
          source={require('../../assets/delivery-truck.webp')}
        />
      )}

      {item.isDelivered && item.isReadyInWarehouse && (
        <Image
          style={styles.image}
          source={require('../../assets/completed.png')}
        />
      )}

      <View style={styles.content}>
        <Text style={styles.text}>{item.orderDetails?.address}</Text>

        <Text style={styles.info}>{item?.createdAt}</Text>
        <Pressable
          onPress={() =>
            navigation.navigate(SCREENS.ORDER_DETAILS, {
              order: item
            })
          }
        >
          <Text style={{ color: 'black' }}>View order</Text>
        </Pressable>

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
