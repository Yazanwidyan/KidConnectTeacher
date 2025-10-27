import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const initialStudents = [
  {id: 1, name: 'Adam Smith', checkedIn: false},
  {id: 2, name: 'Josh Finkle', checkedIn: false},
  {id: 3, name: 'Mia Rodriquez', checkedIn: false},
  {id: 4, name: 'Michael Green', checkedIn: false},
  {id: 5, name: 'Russ Bell', checkedIn: false},
  {id: 6, name: 'Steven Cruz', checkedIn: false},
];

export default function AttendanceScreen() {
  const [students, setStudents] = useState(initialStudents);
  const [selected, setSelected] = useState([]);

  const toggleSelect = id => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  };

  const handleCheckIn = () => {
    setStudents(prev =>
      prev.map(s => (selected.includes(s.id) ? {...s, checkedIn: true} : s)),
    );
    setSelected([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Check-In / Check-Out</Text>

      <FlatList
        data={students}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.item,
              selected.includes(item.id) && styles.selectedItem,
            ]}
            onPress={() => toggleSelect(item.id)}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.status}>
              {item.checkedIn ? '✅ Checked In' : '⬜ Not Checked In'}
            </Text>
          </TouchableOpacity>
        )}
      />

      {selected.length > 0 && (
        <TouchableOpacity style={styles.button} onPress={handleCheckIn}>
          <Text style={styles.buttonText}>Check In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#F9FAFB'},
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#25A0DD',
    marginBottom: 12,
  },
  item: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 1,
  },
  selectedItem: {borderColor: '#25A0DD', borderWidth: 1},
  name: {fontSize: 16, fontWeight: '500'},
  status: {color: '#777'},
  button: {
    backgroundColor: '#25A0DD',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {color: '#fff', fontWeight: '600', fontSize: 16},
});
