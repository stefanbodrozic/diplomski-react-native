import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import StoreScreen from '../screens/StoreScreen'
import { useSelector } from 'react-redux'
import { getUserData } from '../store/slices/user'
import DeliveriesScreen from '../screens/DeliveriesScreen'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { Text } from 'react-native'

const BottomNavigation = () => {
  const Tab = createBottomTabNavigator()

  const navigation = useNavigation()
  const userDetails = useSelector(getUserData)

  useEffect(() => {
    if (!userDetails.role) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Login'
          }
        ]
      })
    }
  }, [userDetails])

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
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
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      )}
      {userDetails.role === 'Seller' && (
        <Tab.Screen
          name="Home"
          component={StoreScreen}
          options={{ headerShown: false }}
        />
      )}
      {userDetails.role === 'Deliverer' && (
        <Tab.Screen
          name="Home"
          component={DeliveriesScreen}
          options={{ headerShown: false }}
        />
      )}

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

export default BottomNavigation
