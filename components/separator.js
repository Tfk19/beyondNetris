import { View, Text } from "react-native";
import React from "react";

const Separator = (props) => {
  return (
    <>
      <View style={{ marginBottom: props.h, width: props.w }}></View>
    </>
  );
};

export default Separator;
