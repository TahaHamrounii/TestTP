import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {DatePickerModal}  from 'react-native-paper-dates';

export default function AjouterModifier() {
  const navigation = useNavigation();
  const route = useRoute();
  const { livre } = route.params || {};
  const [id, setId] = useState(livre ? livre.id : '');
  const [date, setDate] = useState(livre ? new Date(livre.date) : '');
  const [showCalendar, setShowCalendar] = useState(false);
  const [domaine, setDomaine] = useState(livre ? livre.domaine : '');
  const [titre, setTitre] = useState(livre ? livre.titre : '');
  const [resume, setResume] = useState(livre ? livre.resume : '');
  const [image, setImage] = useState(livre ? livre.image : '');

  const handleSave = () => {
    if(id){
    fetch('http://localhost:3000/livres/'+id)
    .then(response => response.json())
    .then(data => {
      if(data){
        fetch('http://localhost:3000/livres/'+id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              date,
              domaine,
              titre,
              resume,
              image,
            }),
        })
      }
    })
    }
    else{
        fetch('http://localhost:3000/livres', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              date,
              domaine,
              titre,
              resume,
              image,
            }),
        })
      }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

<View>
        <Pressable
          onPress={() => setShowCalendar(!showCalendar)}>
          <Text>Date</Text>
        </Pressable>
        <DatePickerModal
          mode="single"
          visible={showCalendar}
          date={date}
          onConfirm={(params) => {
            if (params.date) {
                setDate(params.date.toLocaleDateString("en-GB"));             }
            setShowCalendar(false);
          }}
          onDismiss={() => setShowCalendar(false)}
          locale="en"

        />
      </View>
      <Text style={styles.label}>Domaine</Text>
      <TextInput
        style={styles.input}
        value={domaine}
        onChangeText={setDomaine}
      />
      <Text style={styles.label}>Titre</Text>
      <TextInput
        style={styles.input}
        value={titre}
        onChangeText={setTitre}
      />
      <Text style={styles.label}>Résumé</Text>
      <TextInput
        style={styles.input}
        value={resume}
        onChangeText={setResume}
        multiline
      />
      <Text style={styles.label}>Image URL</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});