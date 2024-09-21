import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, Text } from 'react-native'
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { useEffect, useState } from 'react'
import { SCREENS } from '../helpers/screens'
import { getUserData } from '../store/slices/user'
import { useSelector } from 'react-redux'

const StartChatIcon = ({ storeName }) => {
  const navigation = useNavigation()
  const [storeOwnerEmail, setStoreOwnerEmail] = useState()
  const [chatName, setChatName] = useState()

  const userDetails = useSelector(getUserData)

  useEffect(() => {
    const getStoreOwnerEmail = async () => {
      const usersReferences = collection(db, 'users')
      const q = query(usersReferences, where('storeName', '==', storeName))

      const userQuerySnapshot = await getDocs(q)

      userQuerySnapshot.forEach((doc) => {
        const { email } = doc.data()
        setStoreOwnerEmail(email)
        setChatName(`chat-${email}-${userDetails.email}`)
      })
    }

    getStoreOwnerEmail()
  }, [])

  const handleNavigation = async () => {
    try {
      // check if collection exist
      const chatCollection = collection(db, chatName)
      const snapshot = await getCountFromServer(chatCollection)

      if (snapshot.data().count === 0) {
        // generate empty collection so it can be referenced inside chat screen
        await setDoc(doc(db, 'chat-references', chatName), {
          chatName,
          users: {
            customer: userDetails.email,
            store: storeOwnerEmail
          },
          emails: [userDetails.email, storeOwnerEmail],
          lastMessage: '',
          timestamp: new Date().toLocaleString()
        })

        // add empty object and create collection
        await addDoc(collection(db, chatName), {})
      }

      // find receiver token
      let receiverEmail = ''
      let token = ''
      if (storeOwnerEmail === userDetails.email)
        receiverEmail = userDetails.email
      else receiverEmail = storeOwnerEmail

      const q = query(
        collection(db, 'users'),
        where('email', '==', receiverEmail)
      )

      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((document) => {
        const { expoPushToken } = document.data()

        token = expoPushToken
      })

      navigation.navigate(SCREENS.CHAT, {
        customer: userDetails.email,
        store: storeOwnerEmail,
        chatName,
        tokens: {
          receiverPushToken: token,
          senderPushToken: userDetails.expoPushToken
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Pressable
      onPress={handleNavigation}
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
