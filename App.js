import { View, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './src/navigation/tabs';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>

          <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        </Stack.Navigator>
        {/* <View styles={styles.root}>
          <LoginScreen />
        </View> */}
        {/* if user is logged in redirect to home page */}
        {/* <Tabs /> */}

      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  }
})

export default App;
