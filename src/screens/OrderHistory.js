import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Deliveries from '../components/Deliveries'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCustomerOrders,
  getCustomerOrders,
  getCustomerOrdersStatus
} from '../store/slices/deliveries'
import { Status } from '../util'
import { getUserData } from '../store/slices/user'

const OrderHistory = () => {
  const dispatch = useDispatch()

  const user = useSelector(getUserData)

  const ordersStatus = useSelector(getCustomerOrdersStatus)
  const orders = useSelector(getCustomerOrders)

  useEffect(() => {
    if (ordersStatus === Status.IDLE) {
      dispatch(fetchCustomerOrders(user.id))
    }
  }, [])

  return (
    <View>
      <Deliveries
        data={orders}
        isCustomer={true}
      />
    </View>
  )
}

export default OrderHistory
