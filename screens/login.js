import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Separator, Button, AuthTextInput, PwdInput } from "../components";
import React from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
  },
});

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}
      >
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            color: "#774494",
            fontSize: 35,
          }}
        >
          Login
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            color: "#774494",
            fontSize: 15,
          }}
        >
          Enter your account to continue
        </Text>
      </View>
      <View
        style={{ flex: 1.5, alignItems: "center", justifyContent: "center" }}
      >
        <AuthTextInput label={"Email"} ph={"Enter your email"} />
        <Separator h={20} />
        <PwdInput label={"Password"} />
        <Separator h={20} />
      </View>
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <Button
          left={false}
          text={"Login"}
          op={() => navigation.navigate("HomeTab")}
        />
        <Separator h={15} />
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: "#774494",
          }}
        >
          Or
        </Text>
        <Separator h={15} />
        <Button left={true} text={"Continue with Google"} iconName={"google"} />
        <Separator h={20} />
        <Button
          left={true}
          text={"Continue with Facebook"}
          iconName={"facebook-square"}
        />
      </View>
    </View>
  );
};

export default Login;
