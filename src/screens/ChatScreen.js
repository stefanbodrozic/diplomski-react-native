import { StyleSheet } from 'react-native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { useSelector } from 'react-redux'
import { getUserData } from '../store/slices/user'

const ChatScreen = ({ route }) => {
  const userDetails = useSelector(getUserData)
  const [messages, setMessages] = useState([])

  let storeName
  if (route.params?.storeName) storeName = route.params.storeName

  useLayoutEffect(() => {
    // reference collection of data from firebase. This will run before anything is visible to the user
    const collectionRef = collection(
      db,
      `chat-${storeName}-${userDetails.email}`
    )
    const q = query(collectionRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      )
    })

    return () => unsubscribe()
  }, [storeName, userDetails.email, userDetails.username])

  const onSend = useCallback(
    async (messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      )

      const { _id, createdAt, text, user } = messages[0]

      await addDoc(collection(db, `chat-${storeName}-${userDetails.email}`), {
        _id,
        createdAt,
        text,
        user
      })
    },
    [storeName, userDetails.email]
  )

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: userDetails.id,
        name: userDetails.username,
        avatar: ''
      }}
    />
  )
}

const styles = StyleSheet.create({})

export default ChatScreen
