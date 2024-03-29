import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Checkbox from 'expo-checkbox'

const DiscountItem = ({ product, discount }) => {
  const [priceWithDiscount, setPriceWithDiscount] = useState(0)
  const [isChecked, setChecked] = useState(false)

  useEffect(() => {
    const tempPrice =
      Number(product.price) - Number(product.price) / Number(discount)
    setPriceWithDiscount(tempPrice)
  }, [discount])

  const handleCheck = () => {
    setChecked(!isChecked)

    // add product to array with products with discount
  }

  return (
    <View style={styles.row}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={handleCheck}
      />
      <View style={styles.product}>
        <View style={styles.image}>
          <Image
            source={{ uri: product.images[0] }}
            style={{ width: 75, height: 75 }}
          />
        </View>

        <View style={styles.productDetails}>
          <Text style={styles.name}>{product.name}</Text>
          <Text>{product.description.slice(0, 30)}...</Text>
          {discount > 0 ? (
            <View>
              <Text style={styles.price}>${product.price}</Text>
              <Text>${priceWithDiscount}</Text>
            </View>
          ) : (
            <Text>${product.price}</Text>
          )}
        </View>
      </View>
    </View>
  )
}

export default DiscountItem

const styles = StyleSheet.create({
  checkbox: {
    margin: 10
  },
  name: {
    fontSize: 18,
    fontWeight: '500'
  },
  price: {
    color: 'red',
    textDecorationLine: 'line-through'
  },
  product: {
    flexDirection: 'row'
  },
  productDetails: {
    gap: 5,
    marginLeft: 5
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 2,
    flexDirection: 'row',
    marginBottom: 10
  }
})
