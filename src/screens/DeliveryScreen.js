import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";

import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Delivery from "../components/Delivery";

const renderScene = ({ route }) => {
  switch (route.key) {
    case "first":
      return <Delivery isDone={false} />;
    case "second":
      return <Delivery isDone={true} />;
    default:
      return null;
  }
};

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "white" }}
    style={{ backgroundColor: "#F08080", paddingTop: 50 }}
  />
);

const DeliveryScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "todo", title: "TODO" },
    { key: "done", title: "DONE" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width - 60, height: layout.height - 100 }}
    />
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({});
