import { View } from 'react-native'
import { Provider } from 'react-redux'
import styles from './src/config/styles'
import Navigation from './src/navigation/navigation'
import { store } from './src/store/store'
import { StripeProvider } from '@stripe/stripe-react-native'

import { STRIPE_KEY } from '@env'
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener
} from 'expo-notifications'
import { useEffect, useRef } from 'react'

export default function App() {
  const navigationRef = useRef(null)

  useEffect(() => {
    const notificationReceivedSubscription = addNotificationReceivedListener(
      (notification) => {
        // console.log('Notification received')
      }
    )

    const subscription = addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data

      if (data && data.screen) {
        const currentRoute = navigationRef.current?.getCurrentRoute()

        if (currentRoute?.name !== data.screen) {
          navigationRef?.current?.navigate(data.screen, data.params)
        }
      }
    })

    return () => {
      notificationReceivedSubscription.remove()

      subscription.remove()
    }
  }, [])

  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <View style={styles.container}>
          <Navigation ref={navigationRef} />
        </View>
      </StripeProvider>
    </Provider>
  )
}
