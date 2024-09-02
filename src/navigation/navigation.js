import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomNavigation from './bottomNavigation'
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'
import StoreScreen from '../screens/StoreScreen'
import ProductDetailsScreen from '../screens/ProductDetailsScreen'
import CartScreen from '../screens/CartScreen'

import CartIcon from '../components/CartIcon'
import HomeScreen from '../screens/HomeScreen'
import AddProductScreen from '../screens/AddProductScreen'
import DiscountScreen from '../screens/DiscountScreen'
import SplashScreen from '../screens/SplashScreen'
import DeliveriesScreen from '../screens/DeliveriesScreen'
import AddProductIcon from '../components/AddProductIcon'
import ProfileScreen from '../screens/ProfileScreen'
import OrderHistory from '../screens/OrderHistory'
import StartChatIcon from '../components/StartChatIcon'
import ChatScreen from '../screens/ChatScreen'
import OrdersDetailsScreen from '../screens/OrdersDetailsScreen'
import { SCREENS } from '../helpers/screens'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.SPLASH}
          component={SplashScreen}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name={SCREENS.REGISTER}
          component={RegisterScreen}
          options={() => ({
            headerTitle: 'Register',
            headerStyle: {
              backgroundColor: '#EBFBFF'
            }
          })}
        />

        <Stack.Screen
          name={SCREENS.LOGIN}
          component={LoginScreen}
          options={() => ({
            headerTitle: 'Shopping App',
            headerStyle: {
              backgroundColor: '#EBFBFF'
            }
          })}
        />

        <Stack.Screen
          name={SCREENS.MAIN}
          component={BottomNavigation}
          options={() => ({
            headerRight: () => <CartIcon />,
            headerTitle: 'Shopping App',
            headerStyle: {
              backgroundColor: '#EBFBFF'
            },
            headerBackVisible: false
          })}
        />

        <Stack.Screen
          name={SCREENS.HOME}
          component={HomeScreen}
          options={() => ({
            headerRight: () => <CartIcon />,
            headerBackVisible: false
          })}
        />

        <Stack.Screen
          name={SCREENS.ORDER_HISTORY}
          component={OrderHistory}
        />

        <Stack.Screen
          name={SCREENS.ORDER_DETAILS}
          component={OrdersDetailsScreen}
        />

        <Stack.Screen
          name={SCREENS.ADD_PRODUCT}
          component={AddProductScreen}
        />
        <Stack.Screen
          name={SCREENS.DELIVERIES}
          component={DeliveriesScreen}
          options={() => ({
            headerTitle: 'Shopping App',
            headerStyle: {
              backgroundColor: '#EBFBFF'
            },
            headerBackVisible: false
          })}
        />

        <Stack.Screen
          name={SCREENS.CART}
          component={CartScreen}
        />

        <Stack.Screen
          name={SCREENS.STORE}
          component={StoreScreen}
          options={({ route }) => ({
            headerTitle:
              route.params.name || route.params.store?.name || 'Store',
            headerRight: () => {
              if (route.params.showAddProductIcon === undefined) {
                return <AddProductIcon />
              } else {
                return route.params.showAddProductIcon ? (
                  <AddProductIcon />
                ) : (
                  <StartChatIcon storeName={route.params.store.name} />
                )
              }
            }
          })}
        />
        <Stack.Screen
          name={SCREENS.PRODUCT_DETAILS}
          component={ProductDetailsScreen}
          options={() => ({
            headerTitle: 'Shopping App',
            headerStyle: {
              backgroundColor: '#EBFBFF'
            }
          })}
        />
        <Stack.Screen
          name={SCREENS.CHAT}
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
