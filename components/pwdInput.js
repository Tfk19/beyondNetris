import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState } from "react";

const PwdInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={{ width: "95%" }}>
      <Text style={{ color: "#ffffff", fontFamily: "Inter_400Regular" }}>
        {props.label}
      </Text>
      <TextInput
        secureTextEntry={!showPassword}
        placeholder="Enter your password"
        right={
          <TextInput.Icon
            color={"#ffffff"}
            onPress={togglePasswordVisibility}
            icon={showPassword ? "eye-off" : "eye"}
          />
        }
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

export default PwdInput;
