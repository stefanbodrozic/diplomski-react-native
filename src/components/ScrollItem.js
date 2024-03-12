import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ScrollItem = ({ item, store, isCategory, handleCategoryFilter }) => {
  const navigation = useNavigation()

  const handleItem = () => {
    if (isCategory) {
      handleCategoryFilter(item.name)
    } else {
      navigation.navigate('Product Details', {
        product: item,
        store
      })
    }
  }

  return (
    <TouchableOpacity onPress={handleItem}>
      <View style={styles.root}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: item.image || item.images[0]
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100
  },
  imageContainer: {
    borderRadius: 10,
    height: 100,
    marginTop: 10,
    width: 100
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  root: {
    backgroundColor: 'white',
    borderRadius: 30,
    margin: 10,
    padding: 15
  }
})

export default ScrollItem
