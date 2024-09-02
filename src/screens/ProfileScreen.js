import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import TextInputField from '../components/form/TextInputField'
import { auth, db } from '../config/firebase'
import { profileSchema } from '../config/schema'
import styles from '../config/styles'
import { getUserData, logout } from '../store/slices/user'
import { doc, updateDoc } from 'firebase/firestore'
import { resetCart } from '../store/slices/cart'
import { resetStores } from '../store/slices/stores'
import { SCREENS } from '../helpers/screens'

const ProfileScreen = () => {
  const navigation = useNavigation()
  const user = useSelector(getUserData)
  const dispatch = useDispatch()

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      address: user.address,
      username: user.username
    }
  })

  const handleSave = async () => {
    const newFirstname = getValues('firstname')
    const newLastname = getValues('lastname')
    const newAddress = getValues('address')
    const newUsername = getValues('username')

    const userRef = doc(db, 'users', user.docId)

    await updateDoc(userRef, {
      firstname: newFirstname,
      lastname: newLastname,
      address: newAddress,
      username: newUsername
    })
  }

  const handleLogout = () => {
    try {
      dispatch(logout())
      dispatch(resetCart())
      dispatch(resetCart())
      dispatch(resetStores())

      navigation.navigate(SCREENS.SPLASH)

      signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }

  const onInvalid = (errors) => console.error(errors)

  return (
    <View style={screenStyles.root}>
      <View style={screenStyles.textContainer}>
        <Text style={styles.text}>Firstname:</Text>
      </View>
      <TextInputField
        name="firstname"
        placeholder="Firstname"
        control={control}
      />

      <View style={screenStyles.textContainer}>
        <Text style={styles.text}>Lastname:</Text>
      </View>
      <TextInputField
        name="lastname"
        placeholder="Lastname"
        control={control}
      />

      <View style={screenStyles.textContainer}>
        <Text style={styles.text}>Address:</Text>
      </View>
      <TextInputField
        name="address"
        placeholder="Address"
        control={control}
      />

      <View style={screenStyles.textContainer}>
        <Text style={styles.text}>Username:</Text>
      </View>
      <TextInputField
        name="username"
        placeholder="Username"
        control={control}
      />

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleSubmit(handleSave, onInvalid)}
          style={screenStyles.button}
        >
          <Text style={screenStyles.buttonText}>Save</Text>
        </Pressable>

        <Pressable
          onPress={handleLogout}
          style={screenStyles.button}
        >
          <Text style={screenStyles.buttonText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        {user.role === 'Customer' && (
          <Pressable
            onPress={() => navigation.navigate(SCREENS.ORDER_HISTORY)}
            style={screenStyles.button}
          >
            <Text style={screenStyles.buttonText}>Order history</Text>
          </Pressable>
        )}

        {user.role === 'Seller' && (
          <Pressable
            onPress={() => navigation.navigate(SCREENS.ADD_PRODUCT)}
            style={screenStyles.button}
          >
            <Text style={screenStyles.buttonText}>Add Product</Text>
          </Pressable>
        )}
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
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: '100%',
    padding: 20
  },
  textContainer: {
    marginRight: 210
  }
})

export default ProfileScreen
