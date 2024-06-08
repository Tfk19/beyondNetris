import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import React from "react";

const AuthTextInput = (props) => {
  return (
    <View style={{ width: "95%" }}>
      <Text style={{ color: "#ffffff", fontFamily: "Inter_400Regular" }}>
        {props.label}
      </Text>
      <TextInput
        placeholder={props.ph}
        mode="outlined"
        value={props.value}
        onChangeText={props.onChangeText}
        outlineColor="#ffffff"
        style={{ borderRadius: 20 }}
        theme={{
          roundness: 10,
          colors: {
            primary: "#ffffff",
            text: "black",
            placeholder: "gray",
            background: "#ffffff",
          },
        }}
      />
    </View>
  );
};

export default AuthTextInput;
