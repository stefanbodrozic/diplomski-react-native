import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider } from "react-redux";
import { store } from "./src/store/store";

import LoginScreen from "./src/screens/user/actions/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/user/ProfileScreen";
import ChatScreen from "./src/screens/ChatScreen";
import CategoryScreen from "./src/screens/CategoryScreen";

import Ionicons from "react-native-vector-icons/Ionicons";
import RegisterScreen from "./src/screens/user/actions/RegisterScreen";
import SaveProductScreen from "./src/screens/SaveProductScreen";
import CartScreen from "./src/screens/CartScreen";
import StoreScreen from "./src/screens/StoreScreen";
import ProductScreen from "./src/screens/ProductScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "ios-chatbubbles" : "ios-chatbubbles-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

const CartHeaderIcon = ({ navigation }) => {
  const handleCart = () => {
    navigation.navigate("Checkout");
  };

  // pratiti stanje u store - cart i ako je nesto dodato u cart promeniti name u ios-cart da bi se promenila ikonica
  return (
    <Ionicons
      name="ios-cart-outline"
      style={{ fontSize: 24 }}
      onPress={handleCart}
    />
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SaveProduct"
            component={SaveProductScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="MainScreen"
            component={BottomNavigation}
            options={({ navigation }) => ({
              headerRight: () => (
                <Ionicons
                  name="ios-cart-outline"
                  style={{ fontSize: 24 }}
                  onPress={() => navigation.navigate("Checkout")}
                />
              ),
              headerBackVisible: false,
              headerStatusBarHeight: 0,
            })}
          />
          <Stack.Screen
            name="Checkout"
            component={CartScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Categories"
            component={CategoryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Store"
            component={StoreScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
