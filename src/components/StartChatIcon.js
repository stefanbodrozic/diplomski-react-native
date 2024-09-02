import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, Text } from 'react-native'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useEffect, useState } from 'react'
import { SCREENS } from '../helpers/screens'

const StartChatIcon = ({ storeName }) => {
  const navigation = useNavigation()
  const [storeOwnerEmail, setStoreOwnerEmail] = useState()

  useEffect(() => {
    const getStoreOwnerEmail = async () => {
      const usersReferences = collection(db, 'users')
      const q = query(usersReferences, where('storeName', '==', storeName))

      const userQuerySnapshot = await getDocs(q)

      userQuerySnapshot.forEach((doc) => {
        const { email } = doc.data()
        setStoreOwnerEmail(email)
      })
    }

    getStoreOwnerEmail()
  }, [])

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(SCREENS.CHAT, {
          storeName,
          storeOwnerEmail
        })
      }
      style={styles.button}
    >
      <Ionicons
        name="chatbubble-ellipses-outline"
        size={20}
      />
      <Text>Start Chat</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row'
  }
})

export default StartChatIcon
