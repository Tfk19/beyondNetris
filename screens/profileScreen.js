import { View, Text } from "react-native";
import React from "react";
import { Profile, Button, Separator } from "../components";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 20, backgroundColor:"#F7B40B" }}>
      <View style={{ flexDirection: "row" }}>
        <Profile name={"Taufik"} />
      </View>
      <Separator h={50} />
      <Button
        left={false}
        text={"Keluar"}
        op={() => navigation.navigate("Login")}
        full={true}
      />
    </View>
  );
};

export default ProfileScreen;
