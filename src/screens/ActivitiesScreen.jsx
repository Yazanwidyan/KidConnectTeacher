import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const activities = [
  {id: 1, name: 'Photo', icon: '📷'},
  {id: 2, name: 'Video', icon: '🎥'},
  {id: 3, name: 'Food', icon: '🍎'},
  {id: 4, name: 'Nap', icon: '😴'},
  {id: 5, name: 'Potty', icon: '🚽'},
  {id: 6, name: 'Note', icon: '📝'},
];

export default function ActivitiesScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // ✅ If coming from StudentDetails, student will already be passed
  const student = route?.params?.student;
  console.log('route?.params', route?.params);

  const handleActivityPress = activity => {
    if (student) {
      // If we already have a student, log directly
      Alert.alert(
        'Activity Logged',
        `${activity.name} activity logged for ${student.name}`,
      );
      navigation.goBack();
    } else {
      // Otherwise, go to student selection screen
      navigation.navigate('SelectStudent', {activity});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {student
          ? `Select an Activity for ${student.name}`
          : 'Select an Activity'}
      </Text>

      <FlatList
        data={activities}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.activityButton}
            onPress={() => handleActivityPress(item)}>
            <Text style={styles.icon}>{item.icon}</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#25A0DD',
    marginBottom: 16,
  },
  grid: {justifyContent: 'space-between'},
  activityButton: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 6,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  icon: {fontSize: 30, marginBottom: 8},
  name: {fontSize: 14, fontWeight: '500'},
});
