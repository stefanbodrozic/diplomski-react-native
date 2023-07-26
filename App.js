import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigation from "./src/navigation/navigation";
import { Provider } from "react-redux";
// import { store } from "./src/store";
import styles from "./src/config/styles";

export default function App() {
  return (
    // <Provider store={store}>
    <View style={styles.container}>
      <Navigation />
    </View>
    // </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     // alignItems: "center",
//     // justifyContent: "center",
//   },
// });
