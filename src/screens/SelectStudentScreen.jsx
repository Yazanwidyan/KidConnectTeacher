import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const students = [
  {id: 1, name: 'Adam Smith'},
  {id: 2, name: 'Josh Finkle'},
  {id: 3, name: 'Mia Rodriquez'},
  {id: 4, name: 'Michael Lee'},
  {id: 5, name: 'Russ Palmer'},
  {id: 6, name: 'Steven King'},
];

export default function SelectStudentScreen({route, navigation}) {
  const {activity} = route.params;

  const handleSelectStudent = student => {
    // Log the activity
    console.log(`${activity.name} logged for ${student.name}`);

    Alert.alert(
      'Activity Logged',
      `${activity.name} added for ${student.name}`,
      [{text: 'OK', onPress: () => navigation.goBack()}],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Select a Student for {activity.name} {activity.icon}
      </Text>

      <FlatList
        data={students}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.studentButton}
            onPress={() => handleSelectStudent(item)}>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#F9FAFB'},
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25A0DD',
    marginBottom: 16,
  },
  studentButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
  },
  name: {fontSize: 16, color: '#333'},
});
