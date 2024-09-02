import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '../config/styles'
import ScrollItem from './ScrollItem'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { getUserData } from '../store/slices/user'
import { SCREENS } from '../helpers/screens'

const SingleStoreContainer = ({ store }) => {
  const navigation = useNavigation()

  const userData = useSelector(getUserData)
  let isOwner = false

  if (
    userData.storeName !== undefined &&
    store.storeName === userData.storeName
  ) {
    isOwner = true
  }

  const handleShowMore = () => {
    navigation.navigate(SCREENS.STORE, { store, showAddProductIcon: isOwner })
  }

  return (
    <SafeAreaView style={componentStyles.root}>
      <View>
        <Text style={styles.text}>{store.name}</Text>
      </View>

      <ScrollView
        horizontal={true}
        style={componentStyles.scrollView}
      >
        {store.products.length >= 1 &&
          store.products.slice(0, 3).map((product) => {
            return (
              <ScrollItem
                key={product.id}
                item={product}
                store={{ name: store.name, id: store.id }}
              />
            )
          })}

        <Pressable
          style={componentStyles.showMoreContainer}
          onPress={handleShowMore}
        >
          <Ionicons
            name="add-outline"
            size={30}
            style={componentStyles.addIcon}
          />
          <Text style={styles.text}>Show more</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

const componentStyles = StyleSheet.create({
  addIcon: {
    paddingLeft: 20
  },
  root: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    margin: 20,
    marginTop: 20,
    padding: 20
  },
  scrollView: {
    paddingTop: 20
  },
  showMoreContainer: {
    marginTop: 75,
    paddingLeft: 20
  }
})

export default SingleStoreContainer
