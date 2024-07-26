import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, Text } from 'react-native'

const StartChatIcon = ({ storeName }) => {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Chat', {
          storeName
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
