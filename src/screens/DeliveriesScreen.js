import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAvailableOrders,
  fetchCompletedDeliveries,
  getCompletedDeliveries,
  getCompletedDeliveriesStatus,
  getAvailableOrders,
  getAvailableOrdersStatus,
  getDeliveriesInProgress,
  getDeliveriesInProgressStatus,
  fetchDeliveriesInProgress,
} from "../store/slices/deliveries";
import { Status } from "../util";
import { getUserData } from "../store/slices/user";
import Deliveries from "../components/Deliveries";
import { TabBar, TabView } from "react-native-tab-view";

const DeliveriesScreen = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserData);

  const availableOrders = useSelector(getAvailableOrders);
  const deliveriesInProgress = useSelector(getDeliveriesInProgress);
  const completedDeliveries = useSelector(getCompletedDeliveries);

  const fetchAvailableOrdersStatus = useSelector(getAvailableOrdersStatus);
  const fetchDeliveriesInProgressStatus = useSelector(
    getDeliveriesInProgressStatus
  );
  const fetchCompletedDeliveriesStatus = useSelector(
    getCompletedDeliveriesStatus
  );
  useEffect(() => {
    if (fetchAvailableOrdersStatus === Status.IDLE) {
      dispatch(fetchAvailableOrders());
    } else if (fetchCompletedDeliveriesStatus === Status.IDLE) {
      dispatch(fetchCompletedDeliveries(user.id));
    } else if (fetchDeliveriesInProgressStatus === Status.IDLE) {
      dispatch(fetchDeliveriesInProgress(user.id));
    }
  }, [fetchAvailableOrdersStatus, fetchCompletedDeliveriesStatus, dispatch]);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "todo",
      title: "Available deliveries",
    },
    {
      key: "inprogress",
      title: "In Progress",
    },
    {
      key: "completed",
      title: "Completed deliveries",
    },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "todo":
        return <Deliveries data={availableOrders} />;
      case "inprogress":
        return <Deliveries data={deliveriesInProgress} />;
      case "completed":
        return <Deliveries data={completedDeliveries} />;
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
