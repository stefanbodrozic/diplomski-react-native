import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import React, { useState } from 'react'
// import stores from '../data/stores'
import DiscountItem from '../components/DiscountItem'
import styles from '../config/styles'

const DiscountScreen = () => {
  const products = stores[0].products

  const [discount, setDiscount] = useState(0)

  const handleDiscount = () => {}

  return (
    <SafeAreaView style={screenStyles.discount}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Discount %"
          value={discount}
          onChange={(text) => setDiscount(text)}
          keyboardType="number-pad"
        />
      </View>

      {/* add start date and end date */}

      <ScrollView>
        {products.map((product) => (
          <DiscountItem
            key={product.id}
            product={product}
            discount={'20'}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default DiscountScreen

const screenStyles = StyleSheet.create({
  discount: {
    height: '100%',
    padding: 10
  }
})
