import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function StudentProfile({route, navigation}) {
  const {student} = route.params || {student: {name: 'Unknown'}};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{student.name}</Text>
      <Text style={styles.subtitle}>Activity Feed</Text>

      <View style={styles.activityCard}>
        <Text>{student.name} checked in (by Staff Alana Fig)</Text>
        <Text style={styles.time}>8:00 AM</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ActivitiesModal', {student})}>
        <Text style={styles.addButtonText}>Add Activity</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('StudentDetails', {student})}>
        <Text style={styles.profileButtonText}>View Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#F9FAFB'},
  name: {fontSize: 22, fontWeight: 'bold', color: '#25A0DD', marginBottom: 8},
  subtitle: {fontSize: 16, color: '#555', marginBottom: 10},
  activityCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  time: {color: '#777', fontSize: 12, marginTop: 4},
  addButton: {
    backgroundColor: '#25A0DD',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {color: '#fff', fontWeight: '600'},
  profileButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#E5E7EB',
  },
  profileButtonText: {color: '#333', fontWeight: '600'},
});
