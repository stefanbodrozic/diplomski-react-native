import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { getUserData } from '../store/slices/user'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ChatItem = ({ item }) => {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Chat', {
          storeName: item.storeName,
          storeOwnerEmail: item.storeOwnerEmail
        })
      }}
    >
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
      where('userEmails', 'array-contains', userDetails.email)
    )

    const chatsSnapshot = await getDocs(q)

    let chats = []

    chatsSnapshot.forEach((doc) => {
      const { chatName, lastMessage, timestamp, userEmails } = doc.data()
      const cname = chatName.split('-')
      const storeName = cname[1]
      const sender = cname[2]

      let storeOwnerEmail = ''
      if (userDetails.role === 'Customer') {
        storeOwnerEmail = userEmails.filter(
          (email) => email != userDetails.email
        )
      } else if (userDetails.role === 'Seller')
        storeOwnerEmail = userDetails.email

      chats.push({
        storeName, // because of navigation.navigate params
        storeOwnerEmail, // because of navigation.navigate params
        lastMessage,
        timestamp,
        receiver: userDetails.role === 'Customer' ? storeName : sender
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
