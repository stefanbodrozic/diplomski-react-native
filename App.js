import { View } from "react-native";
import { Provider } from "react-redux";
import styles from "./src/config/styles";
import Navigation from "./src/navigation/navigation";
import { store } from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Navigation />
      </View>
    </Provider>
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
