import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const studentsList = [
  {id: 1, name: 'Adam Smith'},
  {id: 2, name: 'Mia Rodriguez'},
  {id: 3, name: 'Josh Finkle'},
];

export default function SelectStudentScreen({route, navigation}) {
  const {activity} = route.params;
  const [selected, setSelected] = useState([]);

  const toggleSelect = id => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  };

  const handleNext = () => {
    const selectedStudents = studentsList.filter(s => selected.includes(s.id));
    navigation.navigate('ActivityDetails', {activity, selectedStudents});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Students for {activity.name}</Text>

      <FlatList
        data={studentsList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.item,
              selected.includes(item.id) && styles.selectedItem,
            ]}
            onPress={() => toggleSelect(item.id)}>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {selected.length > 0 && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#F9FAFB'},
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#25A0DD',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
  },
  selectedItem: {borderColor: '#25A0DD', borderWidth: 2},
  name: {fontSize: 16},
  nextButton: {
    backgroundColor: '#25A0DD',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  nextText: {color: '#fff', fontWeight: '600'},
});
