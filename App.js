import { StatusBar } from 'expo-status-bar';
import { setDoc, doc } from 'firebase/firestore/lite';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { db } from './firebase/firebase-config';

async function testDB() {
  await setDoc(doc(db, "test-connection", "test"), {
    "field-one": "testing connection between react native app and firebase"
  })
}

export default function App() {

  useEffect(() => {
    testDB();
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
