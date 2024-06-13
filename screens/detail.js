import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Button, Separator, Profile } from "../components";
import { useRoute } from '@react-navigation/native';
import firebase from "../config/FIREBASE/index"

const Detail = () => {
  const route = useRoute();
  const [userName, setUserName] = useState("");
  const { link } = route.params;
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database()
          .ref("users/" + user.uid)
          .once("value")
          .then((snapshot) => {
            const userData = snapshot.val();
            if (userData) {
              setUserName(userData.fullName); // Assuming the name field is fullName, adjust accordingly
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } else {
        setUserName("");
      }
    });
    return unsubscribe;
  }, []);

  return (

    <View style={styles.container}>
      <View style={styles.containerProfile}>
        <View style={{ flexDirection: "row" }}>
          <Profile name={userName} />
        </View>
      </View>

      <WebView
        source={{ uri: link }}
        // startInLoadingState={false}
        style={styles.webview}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  containerProfile: {
    // flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
});


export default Detail;
