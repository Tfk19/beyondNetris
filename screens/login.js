import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { AuthTextInput, PwdInput, Separator, Button } from "../components";
import { loginUser } from "../Action/AuthAction";
import ViewPropTypes from "deprecated-react-native-prop-types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#F7B40B",
  },
});

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userData = await loginUser(email, password);
      navigation.navigate("HomeTab");
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}
      >
        <Text
          style={{
            // fontFamily: "Inter_600SemiBold",
            color: "#ffffff",
            fontSize: 35,
          }}
        >
          Login
        </Text>
        <Text
          style={{
            // fontFamily: "Inter_400Regular",
            color: "#000000",
            fontSize: 15,
          }}
        >
          Maukkan Akun Anda
        </Text>
      </View>
      <View
        style={{ flex: 1.5, alignItems: "center", justifyContent: "center" }}
      >
        <AuthTextInput
          label={"Email"}
          ph={"Enter your email"}
          value={email}
          onChangeText={setEmail}
        />
        <Separator h={20} />
        <PwdInput
          label={"Password"}
          value={password}
          onChangeText={setPassword}
        />
        <Separator h={20} />
      </View>
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <Button
          left={false}
          text={"Login"}
          op={handleLogin}
        />
        <Separator h={15} />
        <Text
          style={{
            // fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: "#000000",
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
        <Separator h={20} />
        {/* Tambahkan tombol menuju halaman pendaftaran di sini */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              // fontFamily: "Inter_400Regular",
              color: "#ffffff",
              fontSize: 16,
            }}
          >
            Don't have an account? 
          </Text>
          <Separator w={4} />
          <Text
            style={{
              // fontFamily: "Inter_600SemiBold",
              color: "#ffffff",
              fontSize: 16,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
