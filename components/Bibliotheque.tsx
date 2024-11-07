import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { Image, Pressable, StyleSheet, Text, View , TextInput} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export default function Bibliotheque() {
  const [livres, setLivres] = useState([]);
  const navigation = useNavigation();
  const [sortCriteria, setSortCriteria] = useState('rien');
  const [searchKeyword, setSearchKeyword] = useState('');

  useFocusEffect(
    useCallback(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:3000/livres");
            const data = await response.json();
            setLivres(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
  
        fetchData();
    }, [navigation])
  );
  

  const sortedLivres = [...livres].sort((a, b) => {
    if (sortCriteria === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortCriteria === 'titre') {
      return a.titre.localeCompare(b.titre);
    }
    return 0;
  });

  const filteredLivres = sortedLivres.filter(livre =>
    livre.titre.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    livre.resume.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
    <Pressable style={styles.button} onPress={() => navigation.navigate("AjouterModifier")}>
        <Text>Ajouter</Text>
    </Pressable>

        <Picker
        selectedValue={sortCriteria}
        onValueChange={(itemValue) => setSortCriteria(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Rien" value="rien" />
        <Picker.Item label="Date" value="date" />
        <Picker.Item label="Titre" value="titre" />
      </Picker>

      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher par mot clé"
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />

        <View>
            {
                filteredLivres.map(livre => (
                <View key={livre.id} style={styles.livreContainer}>
                    <Text style={styles.date}>{livre.date}</Text>
                    <Text style={styles.domaine}>{livre.domaine}</Text>
                    <Text style={styles.titre}>{livre.titre}</Text>
                    <Text style={styles.resume}>{livre.resume.substring(0, 100)}...</Text>
                    <Image source={{ uri: livre.image }} style={styles.image} />
                    <Pressable style={styles.detailsButton} onPress={() => navigation.navigate("Details", { livre })}>
                        <Icon name="info-circle" size={20} color={"blue"} />
                        <Text style={styles.detailsText}> Details </Text>
                    </Pressable>

                    <Pressable style={styles.detailsButton} onPress={() => navigation.navigate("AjouterModifier", { livre })}>
                        <Icon name="pencil" size={20} color={"blue"} />
                        <Text style={styles.detailsText}> Modifier </Text>
                    </Pressable>
                </View>
                ))
            }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 16,
          backgroundColor: '#f5f5f5',
        },
        picker: {
          height: 50,
          width: '100%',
          marginBottom: 16,
          backgroundColor: '#fff',
          borderRadius: 8,
          borderColor: '#ddd',
          borderWidth: 1,
        },
        searchInput: {
          height: 40,
          borderColor: '#ddd',
          borderWidth: 1,
          borderRadius: 8,
          marginBottom: 16,
          paddingHorizontal: 8,
          backgroundColor: '#fff',
        },
        scrollView: {
          paddingBottom: 16,
        },
        livreContainer: {
          marginBottom: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 2,
        },
        date: {
          fontSize: 12,
          color: 'gray',
          marginBottom: 4,
        },
        domaine: {
          fontSize: 14,
          color: 'gray',
          marginBottom: 4,
        },
        titre: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 8,
        },
        resume: {
          fontSize: 14,
          marginBottom: 8,
        },
        image: {
          width: '100%',
          height: 150,
          borderRadius: 8,
          marginBottom: 8,
        },
        detailsButton: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
        },
        detailsText: {
          marginLeft: 8,
          color: 'blue',
          fontWeight: 'bold',
        },
        button: {
            borderColor: '#000000', 
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: 'center',
            marginVertical: 10,
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
                  },
});