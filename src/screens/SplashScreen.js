import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebase";
import { fetchUserDetails, getUserStatus } from "../store/slices/user";
import { Status } from "../util";

const SplashScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const fetchUserDetailsStatus = useSelector(getUserStatus);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (fetchUserDetailsStatus === Status.IDLE)
        dispatch(fetchUserDetails(user.email));
      else if (fetchUserDetailsStatus === Status.FULLFILED) {
        navigation.navigate("Home");
      }
    } else {
      console.log("login");
      navigation.navigate("Login");
    }
  });

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Welcome to shopping application!</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    alignItems: "center",
    padding: 20,
    paddingTop: 150,
  },
  text: {
    fontWeight: "500",
    fontSize: 18,
  },
});
