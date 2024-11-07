import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function Details() {
const route = useRoute();
  const { livre } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{livre.date}</Text>
      <Text style={styles.domaine}>{livre.domaine}</Text>
      <Text style={styles.titre}>{livre.titre}</Text>
      <Text style={styles.resume}>{livre.resume}</Text>
      <Image source={{ uri: livre.image }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  domaine: {
    fontSize: 14,
    color: 'gray',
  },
  titre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resume: {
    fontSize: 14,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
});