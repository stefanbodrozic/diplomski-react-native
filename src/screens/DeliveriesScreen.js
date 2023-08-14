import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  fetchDeliveries,
  getDeliveries,
  getDeliveriesStatus,
  getOrders,
  getOrdersStatus,
} from "../store/slices/deliveries";
import { Status } from "../util";
import { getUserData } from "../store/slices/user";
import Deliveries from "../components/Deliveries";
import { TabBar, TabView } from "react-native-tab-view";

const DeliveriesScreen = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserData);

  const orders = useSelector(getOrders);
  const deliveries = useSelector(getDeliveries);

  const fetchOrdersStatus = useSelector(getOrdersStatus);
  const fetchDeliveriesStatus = useSelector(getDeliveriesStatus);

  useEffect(() => {
    if (fetchOrdersStatus === Status.IDLE) {
      dispatch(fetchAllOrders());
    } else if (fetchDeliveriesStatus === Status.IDLE) {
      dispatch(fetchDeliveries(user.id));
    }
  }, [fetchOrdersStatus, fetchDeliveriesStatus, dispatch]);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "todo",
      title: "Available deliveries",
    },
    {
      key: "completed",
      title: "Completed deliveries",
    },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "todo":
        return <Deliveries data={orders} />;
      case "completed":
        return <Deliveries data={deliveries} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{ backgroundColor: "#70E2FF" }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
    />
  );
};

export default DeliveriesScreen;
