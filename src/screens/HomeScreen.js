import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  BackHandler,
  Alert
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ScrollItem from '../components/ScrollItem'
import SingleStoreContainer from '../components/StoreContainer'
import { fetchCategories, getCategories } from '../store/slices/categories'
import {
  fetchStores,
  getAllStores,
  getAllStoresStatus
} from '../store/slices/stores'
import { Status } from '../util'

const HomeScreen = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Confirm', 'Are you sure you want to exit the application?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel'
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() }
      ])
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [])

  const [selectedCategory, setSelectedCategory] = useState()
  const [filteredStores, setFilteredStores] = useState([])
  const dispatch = useDispatch()

  const categories = useSelector(getCategories)
  const stores = useSelector(getAllStores)

  const storesStatus = useSelector(getAllStoresStatus)

  useEffect(() => {
    if (storesStatus === Status.IDLE) {
      dispatch(fetchStores())
    } else if (storesStatus === Status.FULLFILED) {
      setFilteredStores(stores)
    }

    dispatch(fetchCategories())
  }, [dispatch, storesStatus])

  const handleCategoryFilter = (category) => {
    if (category === selectedCategory) {
      setFilteredStores(stores)
      setSelectedCategory('')
    } else {
      setSelectedCategory(category)

      const filter = stores.filter((store) => store.category === category)
      if (filter.length < 1) setFilteredStores(stores)
      else setFilteredStores(filter)
    }
  }

  return (
    <SafeAreaView style={screenStyles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <ScrollView
          horizontal={true}
          style={screenStyles.scrollView}
        >
          {categories.map((category) => (
            <ScrollItem
              key={category.id}
              item={category}
              isCategory={true}
              handleCategoryFilter={handleCategoryFilter}
            />
          ))}
        </ScrollView>

        {filteredStores?.length < 1 && <Text>No data!</Text>}

        {filteredStores?.length >= 1 &&
          filteredStores.map((store) => (
            <SingleStoreContainer
              key={store.id}
              store={store}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const screenStyles = StyleSheet.create({
  root: {
    backgroundColor: '#EBFBFF',
    height: '100%'
  },
  scrollView: {
    margin: 20
  }
})

export default HomeScreen
