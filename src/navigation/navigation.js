import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./bottomNavigation";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import StoreScreen from "../screens/StoreScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import CartScreen from "../screens/CartScreen";

import CartIcon from "../components/CartIcon";
import HomeScreen from "../screens/HomeScreen";
import AddProductScreen from "../screens/AddProductScreen";
import DiscountScreen from "../screens/DiscountScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={() => ({
            headerTitle: "Shopping App",
            headerStyle: {
              backgroundColor: "#EBFBFF",
            },
          })}
        />

        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={() => ({
            headerTitle: "Register",
            headerStyle: {
              backgroundColor: "#EBFBFF",
            },
          })}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={() => ({
            headerRight: () => <CartIcon />,
            headerBackVisible: false,
          })}
        />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Discount" component={DiscountScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={() => ({
            // headerShown: false,
            headerTitle: "Shopping App",
            headerStyle: {
              backgroundColor: "#EBFBFF",
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
