import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Button,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import ViewPropTypes from "deprecated-react-native-prop-types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

const Nerby = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [chooseItem, setChooseItem] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      } catch (error) {
        setError("Error getting user location: " + error);
      }
    };
    fetchCurrentLocation();
  }, []);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const listTambalBan = [
    {
      id: 0,
      nama: "MICHELIN",
      tipe: "MICHELIN AUTHORIZED DEALER",
      alamat: "Jl. Raya Gubeng No.20",
      coordinates: { latitude: -7.2742, longitude: 112.7506 },
      image: require("../assets/michelin.jpg"),
    },
    {
      id: 1,
      nama: "DUNLOP",
      tipe: "DUNLOP AUTHORIZED DEALER",
      alamat: "Jl. Panglima Sudirman No.60",
      coordinates: { latitude: -7.2666, longitude: 112.7453 },
      image: require("../assets/DUNLOP.jpg"),
    },
    {
      id: 2,
      nama: "BRIDGESTONE",
      tipe: "BRIDGESTONE AUTHORIZED DEALER",
      alamat: "Jl. Basuki Rahmat No.16-18",
      coordinates: { latitude: -7.2670, longitude: 112.7407 },
      image: require("../assets/bridgestone.jpg"),
    },
    {
      id: 3,
      nama: "TOYOTAA",
      tipe: "TOYOTA DEALER",
      alamat: "Jl. Ahmad Yani No. 256",
      coordinates: { latitude: -7.3216, longitude: 112.7409 },
      image: require("../assets/toyota.jpg"),
    },
    {
      id: 4,
      nama: "HONDA",
      tipe: "HONDA DEALER",
      alamat: "Jl. Mayjen HR. Muhammad No. 160",
      coordinates: { latitude: -7.3028, longitude: 112.7179 },
      image: require("../assets/honda.jpg"),
    },
    {
      id: 5,
      nama: "YAMAHA",
      tipe: "YAMAHA DEALER",
      alamat: "Jl. Basuki Rahmat No. 140",
      coordinates: { latitude: -7.2875, longitude: 112.7426 },
      image: require("../assets/planetban.jpg"),
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setChooseItem(item.id);
          mapRef.current.animateToRegion(
            {
              ...item.coordinates,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            },
            1000
          );
        }}
        style={{
          height: windowHeight * 0.22,
          width: windowWidth * 0.8,
          borderRadius: 10,
          backgroundColor: item.id === chooseItem ? "#FFFAEC" : "#FFFFFF",
          borderWidth: 2,
          borderColor: "#A7A7A7",
          marginHorizontal: 15,
          marginVertical: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={item.image}
          />
        </View>
        <View style={{ flex: 1.3, paddingLeft: 10, paddingTop:10 , paddingRight: 10,justifyContent: "center" }}>
          <Text
            style={{
              // fontFamily: "Inter_700Bold",
              fontSize: 16,
              color: "#F7B40B",
            }}
          >
            {item.nama}
          </Text>
          <Text
            style={{
              // fontFamily: "Inter_400Regular",
              fontSize: 12,
            }}
          >
            {item.tipe}
          </Text>
          <Text
            style={{
              // fontFamily: "Inter_400Regular",
              fontSize: 12,
            }}
          >
            {item.alamat}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#000000",
              padding: 3,
              borderRadius: 5,
              marginTop: 10,
              marginBottom:20,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate('ReviewScreen', { item })}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 14 }}>Ulasan</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <MapView
          ref={mapRef}
          showsUserLocation={true}
          showsCompass={true}
          initialRegion={{
            latitude: parseFloat(-7.3385169),
            longitude: parseFloat(112.719163),
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          {chooseItem !== null && (
            <Marker
              coordinate={listTambalBan[chooseItem].coordinates}
              title={listTambalBan[chooseItem].nama}
              description={listTambalBan[chooseItem].alamat}
              
            />
          )}
        </MapView>
      </View>
      <View
        style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}
      >
        <FlatList
          data={listTambalBan}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Nerby;