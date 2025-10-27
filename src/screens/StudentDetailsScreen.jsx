import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function StudentDetails({route}) {
  const {student} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>View {student.name}</Text>

      <View style={styles.infoCard}>
        <Text>Birthday: March 1, 2017</Text>
        <Text>Status: Active</Text>
        <Text>Room Assignments:</Text>
        <Text>- Homeroom: Preschool</Text>
        <Text>- Others: Music Room</Text>
        <Text style={styles.allergy}>⚠️ Allergy: Aspirin</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F9FAFB', padding: 16},
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#25A0DD',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  allergy: {marginTop: 10, color: 'red', fontWeight: '600'},
});
