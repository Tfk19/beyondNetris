// BeritaDetail.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const beritaDetail = ({ route }) => {
  const { description } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  description: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
});

export default beritaDetail;
