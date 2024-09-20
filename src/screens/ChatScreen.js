import { StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { useSelector } from 'react-redux'
import { getUserData } from '../store/slices/user'
import { sendPushNotification } from '../util'

const ChatScreen = ({ route }) => {
  const userDetails = useSelector(getUserData)
  const [messages, setMessages] = useState([])

  const chatName = route.params.chatName
  const storeEmail = route.params.store
  const customerEmail = route.params.customer
  const { receiverPushToken, senderPushToken } = route.params.tokens

  useLayoutEffect(() => {
    // reference collection of data from firebase. This will run before anything is visible to the user
    const collectionRef = collection(db, chatName)
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
  }, [chatName, userDetails.email, userDetails.username])

  const onSend = useCallback(
    async (messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      )

      const { _id, createdAt, text, user } = messages[0]

      await addDoc(collection(db, chatName), {
        _id,
        createdAt,
        text,
        user
      })

      const chatRef = doc(db, 'chat-references', chatName)
      await updateDoc(chatRef, {
        lastMessage: text,
        timestamp: new Date().toLocaleString()
      })

      const data = {
        screen: 'Chat',
        params: {
          chatName,
          store: storeEmail,
          customer: customerEmail,
          tokens: {
            receiverPushToken: senderPushToken,
            senderPushToken: receiverPushToken
          }
        }
      }

      await sendPushNotification(receiverPushToken, 'New message', text, data)
    },
    [chatName, customerEmail, storeEmail, userDetails.email]
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
