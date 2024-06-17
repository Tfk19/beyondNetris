import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import { Button, Separator, Profile } from "../components";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import firebase from "../config/FIREBASE/index";
import ViewPropTypes from "deprecated-react-native-prop-types";

const ENTRIES1 = [
  // ...your entries
];

const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#ffffff",
  },
  containerProfile: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  containerBody: {
    flex: 6,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  containerMainBox: {
    width: "100%",
    height: 300,
    backgroundColor: "#F7B40B",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
  },
  containerMapView: {
    flex: 4,
    width: "100%",
    paddingBottom: 20,
  },
  item: {
    width: 300,
    height: 150,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});

const Home = ({ navigation }) => {
  const [entries, setEntries] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const carouselRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [dataBerita, setDataBerita] = useState([]);
  const handleNavigateToNearby = () => {
    navigation.navigate("Nearby");
  };

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api-berita-indonesia.vercel.app/antara/otomotif/"
        );
        const data = await response.json();
        setDataBerita(data.data.posts);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      } catch (error) {
        console.error("Error getting user location:", error);
      }
    };
    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref("users/" + user.uid)
          .once("value")
          .then((snapshot) => {
            const userData = snapshot.val();
            if (userData) {
              setUserName(userData.fullName);
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

  const handleNavigateToDetail = (item) => {
    navigation.navigate("Detail", { websiteUrl: item.link }); // Passing the website URL
  };

  const renderItem = ({ item }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.illustration }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };

  const renderBerita = ({ item }) => {
    return (
      <>
        <View
          style={{
            width: "100%",
            height: 80,
            borderRadius: 10,
            backgroundColor: "#ffffff",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flex: 3,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <Image
                style={{ width: 50, height: 50, borderRadius: 10 }}
                source={{ uri: item.thumbnail }}
              />
              <View style={{ paddingHorizontal: 10, maxWidth: "80%" }}>
                <Text
                  style={{
                    // fontFamily: "Inter_700Bold",
                    color: "#F7B40B",
                    fontSize: 13,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
            >
              <Button
                left={false}
                text={"Lebih"}
                op={() => handleNavigateToDetail(item)}
                full={true}
              />
            </View>
          </View>
        </View>
        <Separator h={15} />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerProfile}>
        <View style={{ flexDirection: "row" }}>
          <Profile name={userName} />
        </View>
      </View>
      <View style={styles.containerBody}>
        <View style={{ flex: 1 }}>
          <View style={styles.containerMainBox}>
            <View style={styles.containerMapView}>
              <MapView
                showsUserLocation={true}
                showsCompass={true}
                initialRegion={{
                  latitude: parseFloat(-7.3385169),
                  longitude: parseFloat(112.719163),
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                  backgroundColor: "white",
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                width: "100%",
              }}
            >
               <Button
                left={false}
                text={"Cari tambal ban"}
                op={handleNavigateToNearby} // Panggil fungsi handleNavigateToNearby
                full={true}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 1, paddingVertical: 20 }}>
          <Separator h={10} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{  fontSize: 16 }}>
              Berita Otomotif Terkini 
            </Text>
          </View>
          <Separator h={10} />
          <FlatList
            data={dataBerita}
            renderItem={renderBerita}
            keyExtractor={(item, index) => item.link}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;
