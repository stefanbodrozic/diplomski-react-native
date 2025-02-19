import {
  Pressable,
  StyleSheet,
  Text,
  View,
  BackHandler,
} from 'react-native'

import styles from '../config/styles'

import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import TextInputField from '../components/form/TextInputField'

import { yupResolver } from '@hookform/resolvers/yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { loginSchema } from '../config/schema'
import { getFirebaseUserError } from '../util'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails, getUserData } from '../store/slices/user'
import { fetchSingleStore, fetchStores } from '../store/slices/stores'
import { fetchCategories } from '../store/slices/categories'
import { useEffect } from 'react'
import { usePushNotifications } from '../util/usePushNotification'
import { SCREENS } from '../helpers/screens'

const LoginScreen = () => {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp()
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [])

  const { expoPushToken } = usePushNotifications()

  const navigation = useNavigation()
  const userDetails = useSelector(getUserData)
  const dispatch = useDispatch()

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      // email: "admin@mail.com",
      // email: 'customer@mail.com',
      // email: 'kupac@mail.com',
      // email: 'books@mail.com',
      // email: 'deliverer@mail.com',
      // password: 'password12345'
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    if (userDetails && userDetails?.role) {
      dispatch(fetchStores())
      dispatch(fetchCategories())
      dispatch(fetchSingleStore(userDetails))

      navigation.navigate(SCREENS.MAIN)
    }
  }, [dispatch, userDetails])

  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        getValues('email'),
        getValues('password')
      )

      if (response && expoPushToken) {
        const data = {
          email: getValues('email'),
          newExpoPushToken: expoPushToken?.data
        }

        dispatch(fetchUserDetails(data))
      }
    } catch (error) {
      const errorMessage = getFirebaseUserError(error)
      console.log('error: ', errorMessage)
    }
  }

  const handleRegister = () => {
    navigation.navigate(SCREENS.REGISTER)
  }

  return (
    <View style={screenStyles.root}>
      <View>
        <Text style={styles.text}>Welcome! Please login: </Text>
      </View>

      <TextInputField
        name="email"
        placeholder="Email"
        control={control}
        autoCapitalize="none"
      />

      <TextInputField
        name="password"
        placeholder="Password"
        control={control}
        isPassword={true}
        autoCapitalize="none"
      />

      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={handleSubmit(handleLogin)}
          style={screenStyles.button}
        >
          <Text style={screenStyles.buttonText}>Login</Text>
        </Pressable>

        <Pressable
          onPress={handleRegister}
          style={screenStyles.button}
        >
          <Text style={screenStyles.buttonText}>Register</Text>
        </Pressable>
      </View>
    </View>
  )
}

const screenStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
    padding: 20,
    width: '45%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  root: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: '100%',
    padding: 20,
    paddingTop: 150
  }
})

export default LoginScreen
