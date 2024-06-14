import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AuthTextInput, PwdInput, Separator, Button } from "../components";
import firebase from "../config/FIREBASE/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#F7B40B",
  },
});

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const handleRegister = () => {
    if (password !== retypePassword) {
      Alert.alert("Password Error", "Passwords do not matchh");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Registration successful
        const user = userCredential.user;
        console.log("User registered successfully:", user);

        // Simpan data pengguna ke Firebase Database
        firebase
          .database()
          .ref('users/' + user.uid)
          .set({
            fullName: fullName,
            email: email,
          })
          .then(() => {
            console.log("User data saved successfully");
            navigation.navigate("Login"); // Navigate to login screen after successful registration
          })
          .catch((error) => {
            console.error("Error saving user data:", error.message);
            Alert.alert("Registration Error", "Failed to save user data");
          });
      })
      .catch((error) => {
        // Registration failed
        Alert.alert("Registration Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "Inter_600SemiBold", color: "#ffffff", fontSize: 35 }}>
          Sign Up
        </Text>
        <Text style={{ fontFamily: "Inter_400Regular", color: "#ffffff", fontSize: 15 }}>
          Create account here
        </Text>
      </View>
      <View style={{ flex: 3, alignItems: "center", justifyContent: "center" }}>
        <AuthTextInput
          label={"Full Name"}
          ph={"Enter your name"}
          value={fullName}
          onChangeText={setFullName}
        />
        <Separator h={20} />
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
        <PwdInput
          label={"Retype Password"}
          value={retypePassword}
          onChangeText={setRetypePassword}
        />
      </View>
      <View style={{ flex: 1.6, justifyContent: "center", alignItems: "center" }}>
        <Button left={false} text={"Register"} op={handleRegister} />
        <Separator h={15} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontFamily: "Inter_400Regular", color: "#ffffff", fontSize: 16 }}>
            Already have an account?
          </Text>
          <Separator w={4} />
          <Text style={{ fontFamily: "Inter_600SemiBold", color: "#ffffff", fontSize: 16 }}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
