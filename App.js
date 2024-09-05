import { View } from 'react-native'
import { Provider } from 'react-redux'
import styles from './src/config/styles'
import Navigation from './src/navigation/navigation'
import { store } from './src/store/store'
import { StripeProvider } from '@stripe/stripe-react-native'

import { STRIPE_KEY } from '@env'

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <View style={styles.container}>
          <Navigation />
        </View>
      </StripeProvider>
    </Provider>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     // alignItems: "center",
//     // justifyContent: "center",
//   },
// });
