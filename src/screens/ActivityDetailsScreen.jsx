import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ActivityDetailsScreen({route, navigation}) {
  const {activity, selectedStudents} = route.params;
  const [mealType, setMealType] = useState('');
  const [mealItem, setMealItem] = useState('');
  const [note, setNote] = useState('');

  const mealTypes = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

  const handlePost = () => {
    // Add activity to each student’s profile
    selectedStudents.forEach(student => {
      // Normally you’d save to backend or global store.
      console.log(`Posted ${activity.name} for ${student.name}`);
    });

    navigation.navigate('StudentProfile', {
      student: selectedStudents[0], // go to first student's profile for demo
      newActivity: {
        type: activity.name,
        mealType,
        mealItem,
        note,
        time: new Date().toLocaleTimeString(),
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add {activity.name} Activity</Text>

      <Text style={styles.label}>Meal Type</Text>
      <View style={styles.mealTypeRow}>
        {mealTypes.map(type => (
          <TouchableOpacity
            key={type}
            style={[styles.mealType, mealType === type && styles.selectedMeal]}
            onPress={() => setMealType(type)}>
            <Text
              style={[
                styles.mealTypeText,
                mealType === type && styles.selectedMealText,
              ]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Meal Item</Text>
      <TextInput
        style={styles.input}
        value={mealItem}
        onChangeText={setMealItem}
        placeholder="e.g. Mac & Cheese"
      />

      <Text style={styles.label}>Note (optional)</Text>
      <TextInput
        style={[styles.input, {height: 80}]}
        value={note}
        onChangeText={setNote}
        multiline
        placeholder="e.g. Ate all of it!"
      />

      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postText}>Post Activity</Text>
      </TouchableOpacity>
    </ScrollView>
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
  label: {fontSize: 16, color: '#333', marginTop: 12},
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
    elevation: 1,
  },
  mealTypeRow: {flexDirection: 'row', flexWrap: 'wrap', marginTop: 8},
  mealType: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    margin: 4,
  },
  selectedMeal: {backgroundColor: '#25A0DD'},
  mealTypeText: {color: '#333'},
  selectedMealText: {color: '#fff', fontWeight: 'bold'},
  postButton: {
    backgroundColor: '#25A0DD',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  postText: {color: '#fff', fontWeight: '600'},
});
