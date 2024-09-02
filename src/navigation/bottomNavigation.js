import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import InboxScreen from '../screens/InboxScreen'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import StoreScreen from '../screens/StoreScreen'
import { useSelector } from 'react-redux'
import { getUserData } from '../store/slices/user'
import DeliveriesScreen from '../screens/DeliveriesScreen'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { Text } from 'react-native'
import { SCREENS } from '../helpers/screens'

const BottomNavigation = () => {
  const Tab = createBottomTabNavigator()

  const navigation = useNavigation()
  const userDetails = useSelector(getUserData)

  useEffect(() => {
    if (!userDetails.role) {
      console.log(
        'No user data! Redirect to Login Screen from bottom navigation!'
      )
      // navigation.navigate(SCREENS.LOGIN)
      // navigation.reset({
      //   index: 0,
      //   routes: [
      //     {
      //       name: 'Login'
      //     }
      //   ]
      // })
    }
  }, [userDetails, navigation])

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'Inbox') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          )
        },
        tabBarActiveTintColor: 'tomato'
      })}
    >
      {!userDetails?.role && <Text>Loading...</Text>}

      {userDetails.role === 'Customer' && (
        <Tab.Screen
          name={SCREENS.HOME}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      )}
      {userDetails.role === 'Seller' && (
        <Tab.Screen
          name={SCREENS.HOME}
          component={StoreScreen}
          options={{ headerShown: false }}
        />
      )}
      {userDetails.role === 'Deliverer' && (
        <Tab.Screen
          name={SCREENS.HOME}
          component={DeliveriesScreen}
          options={{ headerShown: false }}
        />
      )}

      <Tab.Screen
        name={SCREENS.INBOX}
        component={InboxScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name={SCREENS.PROFILE}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

export default BottomNavigation
