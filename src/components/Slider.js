import { StyleSheet, Text, View, FlatList, Animated } from "react-native";
import React, { useRef } from "react";
import SliderItem from "./SliderItem";
import data from "../helpers/data";

const Slider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  return (
    <FlatList
      horizontal
      pagingEnabled
      snapToAlignment="center"
      showsHorizontalScrollIndicator={false}
      data={data}
      onScroll={handleOnScroll}
      renderItem={({ item }) => <SliderItem item={item} />}
    />
  );
};

export default Slider;

const styles = StyleSheet.create({});
