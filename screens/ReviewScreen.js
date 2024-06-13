import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "../config/FIREBASE/index"; // Ensure this path is correct

const ReviewScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const snapshot = await firebase.database().ref(`/reviews/${item.id}`).once('value');
        const data = snapshot.val();
        if (data) {
          setReviews(Object.values(data));
        }
      } catch (error) {
        console.error("Error fetching reviews from Firebase: ", error);
      }
    };
    fetchReviews();
  }, [item.id]);

  const handleAddReview = async () => {
    try {
      const newReviewRef = firebase.database().ref(`/reviews/${item.id}`).push();
      await newReviewRef.set({ text: newReview });
      setNewReview("");
      setReviews([...reviews, { text: newReview }]);
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.nama}</Text>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a review"
        value={newReview}
        onChangeText={setNewReview}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleAddReview}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reviewItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginHorizontal:20,
  },
  submitButton: {
    backgroundColor: '#F7B40B', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal:20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    marginBottom:20,
    marginHorizontal:20,
    padding: 10,
    backgroundColor: '#000000',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ReviewScreen;
