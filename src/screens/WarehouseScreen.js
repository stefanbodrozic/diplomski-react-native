import { Text, View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUnpreparedOrdersFromWarehouse,
  getUnpreparedOrdersFromWarehouse
} from '../store/slices/deliveries'
import { useEffect } from 'react'
import Deliveries from '../components/Deliveries'

const WarehouseScreen = () => {
  const dispatch = useDispatch()

  const orders = useSelector(getUnpreparedOrdersFromWarehouse)

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchUnpreparedOrdersFromWarehouse())
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <View>
      {orders.length > 0 && (
        <Text style={styles.text}>Orders ready to be prepared</Text>
      )}

      {orders.length < 1 && (
        <Text style={styles.text}>There are no unprepared orders.</Text>
      )}

      <Deliveries data={orders} />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    paddingLeft: 10
  }
})

export default WarehouseScreen
