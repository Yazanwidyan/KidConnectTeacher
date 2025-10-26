import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const classes = [
  {id: 1, name: 'Pre-K A', students: 12},
  {id: 2, name: 'Pre-K B', students: 14},
];

const ClassesList = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Classes</Text>

      {classes.map(item => (
        <TouchableOpacity
          key={item.id}
          onPress={() => navigation.navigate('ClassDetails', {classData: item})}
          style={styles.classCard}>
          <Text style={styles.className}>{item.name}</Text>
          <Text style={styles.classStudents}>{item.students} Students</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // equivalent to bg-light
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#25A0DD', // primary color
    marginBottom: 16,
  },
  classCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 3,
  },
  className: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937', // gray-800
  },
  classStudents: {
    fontSize: 14,
    color: '#6B7280', // gray-500
  },
});

export default ClassesList;
