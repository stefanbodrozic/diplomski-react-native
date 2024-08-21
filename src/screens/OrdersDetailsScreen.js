import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'

const OrderInfo = ({ item }) => {
  return (
    <View style={screenStyles.itemInfoContainer}>
      <Image
        source={{ uri: item.images[0] }}
        style={screenStyles.image}
      />

      <View style={screenStyles.orderInfo}>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>Price: {item.price}$</Text>
      </View>
    </View>
  )
}

const OrdersDetailsScreen = ({ route }) => {
  const params = route.params
  const order = params.order
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (order.isDelivered) {
      setStatus('Delivered')
    } else if (!order.isDelivered && order.delivererId === '')
      setStatus('In Store')
    else setStatus('In Progress')
  }, [])

  return (
    <SafeAreaView style={screenStyles.root}>
      {/* details */}
      <View style={screenStyles.infoContainer}>
        <Text style={screenStyles.text}>
          Customer: {order.orderDetails.firstname} {order.orderDetails.lastname}
        </Text>
        <Text style={screenStyles.text}>
          Address: {order.orderDetails.address}
        </Text>
        <Text style={screenStyles.text}>
          Price: {order.orderDetails.price}$
        </Text>
        <Text style={screenStyles.text}>Status: {status}</Text>
      </View>

      <FlatList
        data={order.order}
        renderItem={({ item }) => <OrderInfo item={item} />}
      />
    </SafeAreaView>
  )
}

const screenStyles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    width: '40%'
  },
  infoContainer: {
    // alignItems: 'center',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  itemInfoContainer: {
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    padding: 10
  },
  orderInfo: {
    display: 'flex',
    gap: 10,
    maxWidth: '50%',
    paddingLeft: 10,
    width: ''
  },
  root: {
    flex: 1
  },
  text: {
    fontSize: 16,
    fontWeight: '500'
  }
})

export default OrdersDetailsScreen
