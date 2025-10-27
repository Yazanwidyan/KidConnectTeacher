import React, {useState} from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function StudentProfile({route, navigation}) {
  const {student} = route.params || {student: {name: 'Unknown'}};

  // 🧠 Mock activities for now
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'Food',
      icon: '🍎',
      time: '8:30 AM',
      mealType: 'Breakfast',
      mealItem: 'Pancakes & Juice',
      note: 'Ate all of it!',
    },
    {
      id: 2,
      type: 'Nap',
      icon: '😴',
      time: '11:45 AM',
      note: 'Slept for 1 hour.',
    },
    {
      id: 3,
      type: 'Potty',
      icon: '🚽',
      time: '1:10 PM',
      note: 'Went to potty independently.',
    },
  ]);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedTime, setEditedTime] = useState('');

  const openEditModal = activity => {
    setSelectedActivity(activity);
    setEditedTime(activity.time);
    setModalVisible(true);
  };

  const handleSaveEdit = () => {
    setActivities(prev =>
      prev.map(a =>
        a.id === selectedActivity.id ? {...a, time: editedTime} : a,
      ),
    );
    setModalVisible(false);
  };

  const handleDelete = () => {
    Alert.alert('Delete Activity', 'Are you sure you want to delete this?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setActivities(prev => prev.filter(a => a.id !== selectedActivity.id));
          setModalVisible(false);
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{student.name}</Text>
      <Text style={styles.subtitle}>Activity Feed</Text>

      {activities.map(activity => (
        <TouchableOpacity
          key={activity.id}
          style={styles.activityCard}
          onPress={() => openEditModal(activity)}>
          <View style={styles.activityRow}>
            <Text style={styles.icon}>{activity.icon}</Text>
            <View style={{flex: 1}}>
              <Text style={styles.activityTitle}>
                {activity.type} — {activity.mealType || ''}
              </Text>
              {activity.mealItem && (
                <Text style={styles.details}>🍽 {activity.mealItem}</Text>
              )}
              {activity.note && (
                <Text style={styles.note}>📝 {activity.note}</Text>
              )}
            </View>
            <Text style={styles.time}>{activity.time}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ActivitiesModal', {student})}>
        <Text style={styles.addButtonText}>Add Activity</Text>
      </TouchableOpacity>

      {/* ✏️ Edit Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Edit {selectedActivity?.type} Activity
            </Text>

            <Text style={styles.label}>Time</Text>
            <TextInput
              style={styles.input}
              value={editedTime}
              onChangeText={setEditedTime}
              placeholder="Enter new time"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveEdit}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#F9FAFB'},
  name: {fontSize: 22, fontWeight: 'bold', color: '#25A0DD', marginBottom: 8},
  subtitle: {fontSize: 16, color: '#555', marginBottom: 10},

  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
  },
  activityRow: {flexDirection: 'row', alignItems: 'center'},
  icon: {fontSize: 26, marginRight: 12},
  activityTitle: {fontSize: 16, fontWeight: '600', color: '#111'},
  details: {fontSize: 14, color: '#444', marginTop: 2},
  note: {fontSize: 13, color: '#777', marginTop: 2, fontStyle: 'italic'},
  time: {color: '#777', fontSize: 12, marginLeft: 10},
  addButton: {
    backgroundColor: '#25A0DD',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {color: '#fff', fontWeight: '600'},

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  label: {fontSize: 14, color: '#333', marginTop: 10},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  saveButton: {backgroundColor: '#25A0DD'},
  deleteButton: {backgroundColor: '#FE6602'},
  cancelButton: {backgroundColor: '#9CA3AF'},
  buttonText: {color: '#fff', fontWeight: '600'},
});
