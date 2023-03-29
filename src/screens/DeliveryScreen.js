import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";

import { useWindowDimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import Deliveries from "../components/Deliveries";

import { useDispatch, useSelector } from "react-redux";

import {
  getDeliveriesStatus,
  getDeliveries,
  fetchDeliveries,
} from "../store/slices/deliveriesSlice";

const DeliveryScreen = () => {
  const layout = useWindowDimensions();

  const dispatch = useDispatch();

  const deliveriesStatus = useSelector(getDeliveriesStatus);
  const deliveries = useSelector(getDeliveries);

  const [deliveriesDone, setDeliveriesDone] = useState([]);
  const [deliveriesToDo, setDeliveriesToDo] = useState([]);

  useEffect(() => {
    if (deliveriesStatus === "idle") {
      dispatch(fetchDeliveries());
    }
    if (deliveriesStatus === "succeeded") {
      let tempDone = [];
      let tempToDo = [];
      deliveries.forEach((delivery) => {
        // TODO: provera sa prijavljenim user-om (username) umesto null
        if (delivery.deliverer == null && delivery.isDone)
          tempDone.push(delivery);
        else tempToDo.push(delivery);
      });

      console.log("deliveries: ", tempToDo);

      setDeliveriesDone(tempDone);
      setDeliveriesToDo(tempToDo);
    }
  }, [deliveriesStatus, dispatch]);

  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "todo", title: "TODO" },
    { key: "done", title: "DONE" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "todo":
        return <Deliveries deliveries={deliveriesToDo} />;
      case "done":
        return <Deliveries deliveries={deliveriesDone} />;
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
