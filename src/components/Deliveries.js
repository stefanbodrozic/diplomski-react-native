import { FlatList, StyleSheet, View } from 'react-native'
import DeliveryItem from './DeliveryItem'

const Deliveries = ({ data, isCustomer }) => {
  return (
    <View style={styles.root}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <DeliveryItem
            item={item}
            isCustomer={isCustomer}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 20
  }
})

export default Deliveries
