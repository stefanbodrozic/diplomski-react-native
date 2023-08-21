import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebase";
import {
  fetchUserDetails,
  getUserData,
  getUserStatus,
} from "../store/slices/user";
import { Status } from "../util";
import {
  fetchSingleStore,
  getStore,
  getStoreStatus,
} from "../store/slices/stores";

const SplashScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const fetchUserDetailsStatus = useSelector(getUserStatus);
  const userDetails = useSelector(getUserData);

  const store = useSelector(getStore);
  const fetchStoreStatus = useSelector(getStoreStatus);

  const handleNavigation = (name, store) => {
    const route = store ? { name, params: store } : { name };

    navigation.reset({
      index: 0,
      routes: [route],
    });
  };

  const handleRoleNavigation = () => {
    switch (userDetails.role) {
      case "Admin":
        // TODO
        return console.log("admin");
      case "Seller":
        if (fetchStoreStatus === Status.FULLFILED) {
          return handleNavigation("Store", store);
        }
        return;
      case "Deliverer":
        return handleNavigation("Deliveries");
      case "Customer":
        // return handleNavigation("Home");
        return handleNavigation("Profile");

      default:
        return null;
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (fetchUserDetailsStatus === Status.IDLE)
        dispatch(fetchUserDetails(user.email));
      else if (fetchUserDetailsStatus === Status.FULLFILED) {
        if (fetchStoreStatus === Status.IDLE)
          dispatch(fetchSingleStore(userDetails));

        handleRoleNavigation();
      }
    } else {
      handleNavigation("Login");
    }
  });

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Welcome to shopping application!</Text>
      <Text style={styles.text}>loading...</Text>
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
