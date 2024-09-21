import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { getUserData } from '../store/slices/user'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SCREENS } from '../helpers/screens'

const ChatItem = ({ item }) => {
  const navigation = useNavigation()
  const userDetails = useSelector(getUserData)

  const handleNavigation = async () => {
    try {
      // find receiver token
      let storeEmail = ''
      let customerEmail = ''

      let findTokenForThisEmail = ''
      let tokens = {
        receiverPushToken: '',
        senderPushToken: userDetails.expoPushToken
      }

      if (item.users.store === userDetails.email) {
        storeEmail = userDetails.email
        customerEmail = item.users.customer

        findTokenForThisEmail = item.users.customer
      } else {
        storeEmail = item.users.store
        customerEmail = userDetails.email

        findTokenForThisEmail = item.users.store
      }

      const q = query(
        collection(db, 'users'),
        where('email', '==', findTokenForThisEmail)
      )

      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((document) => {
        const { expoPushToken } = document.data()

        tokens.receiverPushToken = expoPushToken
      })

      navigation.navigate(SCREENS.CHAT, {
        customer: customerEmail,
        store: storeEmail,
        chatName: item.chatName,
        tokens
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Pressable onPress={handleNavigation}>
      <View style={screenStyles.chatContainer}>
        <Image
          source={{
            uri: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'
          }}
          style={screenStyles.image}
        />

        <View style={screenStyles.chatDetails}>
          <Text>{item.receiver}</Text>
          <Text style={screenStyles.timestampText}>{item.timestamp}</Text>
          <Text style={screenStyles.message}>{item.lastMessage}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const InboxScreen = () => {
  const userDetails = useSelector(getUserData)

  const [chats, setChats] = useState([])

  const getChats = async () => {
    const chatsReferences = collection(db, 'chat-references')
    const q = query(
      chatsReferences,
      where('emails', 'array-contains', userDetails.email)
    )

    const chatsSnapshot = await getDocs(q)

    let chats = []

    chatsSnapshot.forEach((doc) => {
      const { chatName, lastMessage, timestamp, users, emails } = doc.data()

      chats.push({
        chatName,
        lastMessage,
        timestamp,
        users,
        emails
      })
    })

    setChats(chats)
  }

  useEffect(() => {
    getChats()
  }, [])

  return (
    <View>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatItem item={item} />}
      />
    </View>
  )
}

const screenStyles = StyleSheet.create({
  chatContainer: {
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    padding: 10
  },
  chatDetails: {
    display: 'flex',
    maxWidth: '100%',
    paddingLeft: 10
  },
  image: {
    aspectRatio: 1,
    width: '20%'
  },
  message: {
    fontSize: 20,
    paddingTop: 10
  },
  timestampText: {
    color: 'gray',
    fontSize: 15
  }
})

export default InboxScreen
