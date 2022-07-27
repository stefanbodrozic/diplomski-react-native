import { View, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigation/tabs';

const App = () => {

  return (
    <NavigationContainer>
      <View styles={styles.root}>
        <LoginScreen />
      </View>
      {/* if user is logged in redirect to home page */}
      {/* <Tabs /> */}

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  }
})

export default App;
