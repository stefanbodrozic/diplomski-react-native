import { StyleSheet } from 'react-native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { useSelector } from 'react-redux'
import { getUserData } from '../store/slices/user'

const ChatScreen = ({ route }) => {
  const userDetails = useSelector(getUserData)
  const [messages, setMessages] = useState([])
  const [chatReferenceExist, setChatReferenceExist] = useState(false)

  let storeName
  if (route.params?.storeName) storeName = route.params.storeName

  const checkChatReference = async () => {
    const chatName = `chat-${storeName}-${userDetails.email}`

    const chatReferences = collection(db, 'chat-references')
    const q = query(chatReferences, where('chatName', '==', chatName))

    const countSnapshot = await getCountFromServer(q)

    if (countSnapshot.data().count > 0) setChatReferenceExist(true)
  }

  useLayoutEffect(() => {
    // check if chat reference exist
    checkChatReference()

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

      const chatName = `chat-${storeName}-${userDetails.email}`

      await addDoc(collection(db, chatName), {
        _id,
        createdAt,
        text,
        user
      })

      // create a new chat reference if it doesn’t already exist
      if (!chatReferenceExist) {
        await setDoc(doc(db, 'chat-references', chatName), {
          chatName,
          userEmails: [userDetails.email, route.params.storeOwnerEmail]
        })

        setChatReferenceExist(true)
      }
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
