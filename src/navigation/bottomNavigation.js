import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import StoreScreen from "../screens/StoreScreen";
import { useSelector } from "react-redux";
import { getUserData } from "../store/slices/user";
import DeliveriesScreen from "../screens/DeliveriesScreen";

const BottomNavigation = () => {
  const userDetails = useSelector(getUserData);

  const Tab = createBottomTabNavigator();
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
      {userDetails.role === "Customer" && (
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      )}
      {userDetails.role === "Seller" && (
        <Tab.Screen
          name="Home"
          component={StoreScreen}
          options={{ headerShown: false }}
        />
      )}
      {userDetails.role === "Deliverer" && (
        <Tab.Screen
          name="Home"
          component={DeliveriesScreen}
          options={{ headerShown: false }}
        />
      )}

      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
