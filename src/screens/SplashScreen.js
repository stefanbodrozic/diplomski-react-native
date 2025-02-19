import { useNavigation } from '@react-navigation/native'
import { onAuthStateChanged } from 'firebase/auth'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../config/firebase'
import {
  fetchUserDetails,
  getUserData,
  getUserStatus
} from '../store/slices/user'
import { Status } from '../util'
import { fetchSingleStore, getStoreStatus } from '../store/slices/stores'
import { usePushNotifications } from '../util/usePushNotification'
import { SCREENS } from '../helpers/screens'

const SplashScreen = () => {
  const { expoPushToken } = usePushNotifications()

  const navigation = useNavigation()

  const dispatch = useDispatch()

  const fetchUserDetailsStatus = useSelector(getUserStatus)
  const userDetails = useSelector(getUserData)

  const fetchStoreStatus = useSelector(getStoreStatus)

  const handleNavigation = () => {
    // if (!userDetails.role) {
    //   // navigation.reset({
    //   //   index: 0,
    //   //   routes: [{ name: 'Login' }]
    //   // })
    //   navigation.navigate(SCREENS.LOGIN)
    // } else {
    //   // navigation.reset({
    //   //   index: 0,
    //   //   routes: [{ name: 'Main' }]
    //   // })
    //   navigation.navigate(SCREENS.MAIN)
    // }
  }

  onAuthStateChanged(auth, async (user) => {
    console.log('on auth state change', user)
    if (user) {
      if (fetchUserDetailsStatus === Status.IDLE && expoPushToken) {
        const data = {
          email: user.email,
          newExpoPushToken: expoPushToken?.data
        }

        dispatch(fetchUserDetails(data))
      } else if (fetchUserDetailsStatus === Status.FULLFILED) {
        if (fetchStoreStatus === Status.IDLE) await dispatch(fetchSingleStore(userDetails))

        // handleNavigation()
        navigation.navigate(SCREENS.MAIN)

      }
    } else {
      navigation.navigate(SCREENS.LOGIN)

    }
  })

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Welcome to shopping application!</Text>
      <Text style={styles.text}>loading...</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: '100%',
    padding: 20,
    paddingTop: 150
  },
  text: {
    fontSize: 18,
    fontWeight: '500'
  }
})
