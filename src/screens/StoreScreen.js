import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native'
import ProductPreview from '../components/ProductPreview'
import Search from '../components/Search'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSingleStore,
  getStore,
  getStoreStatus
} from '../store/slices/stores'
import { Status } from '../util'
import { getUserData } from '../store/slices/user'
import { useNavigation } from '@react-navigation/native'
import { SCREENS } from '../helpers/screens'

const StoreScreen = ({ route }) => {
  const navigation = useNavigation()

  const [products, setProducts] = useState()

  const [searchItem, setSearchItem] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(products)

  const params = route.params

  const userDetails = useSelector(getUserData)
  const store = useSelector(getStore)
  const storeStatus = useSelector(getStoreStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    if (storeStatus === Status.IDLE) {
      dispatch(fetchSingleStore(userDetails))
    } else if (storeStatus === Status.FULLFILED) {
      setProducts(store?.products)
      setFilteredProducts(store?.products)
    }
  }, [storeStatus, dispatch, store])

  useEffect(() => {
    if (params?.store?.products?.length >= 1) {
      setProducts(params.store?.products)
      setFilteredProducts(params.store?.products)
    } else {
      setProducts(store?.products)
      setFilteredProducts(store?.products)
    }
  }, [])

  const searchProducts = (search) => {
    setSearchItem(search)

    const filterProducts = products?.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )

    setFilteredProducts(filterProducts)
  }

  return (
    <SafeAreaView style={styles.root}>
     

      {filteredProducts?.length === 0 ? (
        <>
          <Text>No products available</Text>
          <Pressable
            onPress={() => navigation.navigate(SCREENS.ADD_PRODUCT)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Add Product</Text>
          </Pressable>
        </>
      ) : (
        <>
         <Search
            style={styles.search}
            handleSearch={searchProducts}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            data={filteredProducts}
            numColumns={2}
            renderItem={({ item }) => (
              <ProductPreview
                product={item}
                store={params || store}
              />
            )}
          />
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // scrollView: {
  //   paddingTop: 20
  // },
  // productsContainer: {
  //   display: 'flex',
  //   flexDirection: 'row'
  // },
  // storeName: {
  //   fontSize: 20,
  //   fontWeight: 'bold'
  // },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
    margin: 10,
    marginBottom: 20,
    padding: 20,
    width: '45%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  root: {
    padding: 20
  },
  search: {
    width: 'auto'
  }
})

export default StoreScreen
