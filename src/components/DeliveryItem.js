import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../config/firebase";
import { getUserData } from "../store/slices/user";
import { refetchData } from "../store/slices/deliveries";

const DeliveryItem = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUserData);

  const assignDelivery = async () => {
    const orderRef = doc(db, "orders", item.docId);

    await updateDoc(orderRef, {
      delivererId: user.id,
    });

    dispatch(refetchData());
  };

  const completeDelivery = async () => {
    const orderRef = doc(db, "orders", item.docId);

    await updateDoc(orderRef, {
      isDelivered: true,
      deliveredAt: serverTimestamp(),
    });

    dispatch(refetchData());
  };

  return (
    <View style={styles.container}>
      {item.isDelivered ? (
        <Image
          style={styles.image}
          source={require("../../assets/completed.png")}
        />
      ) : (
        <Image
          style={styles.image}
          source={require("../../assets/delivery-truck.webp")}
        />
      )}

      <View style={styles.content}>
        <Text style={styles.text}>{item.orderDetails?.address}</Text>
        {!item.isDelivered && item.delivererId === "" && (
          <Pressable onPress={assignDelivery} style={styles.button}>
            <Text style={styles.btnText}>Take over</Text>
          </Pressable>
        )}

        {!item.isDelivered && item.delivererId != "" && (
          <Pressable onPress={completeDelivery} style={styles.button}>
            <Text style={styles.btnText}>Complete</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default DeliveryItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  image: {
    width: "40%",
    aspectRatio: 1,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    fontWeight: "500",
    fontSize: 18,
  },
  btnText: {
    fontWeight: "500",
    fontSize: 18,
    color: "white",
  },
  button: {
    backgroundColor: "black",
    width: "90%",
    alignSelf: "center",
    marginTop: 50,
    borderRadius: 100,
    alignItems: "center",
  },
});
