import React, {useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function StudentProfile({route, navigation}) {
  const {student} = route.params || {student: {name: 'Unknown'}};

  // 🧠 Mock data
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'food',
      icon: '🍎',
      time: '8:30 AM',
      mealType: 'Breakfast',
      mealItem: 'Pancakes & Juice',
      note: 'Ate all of it!',
    },
    {
      id: 2,
      type: 'nap',
      icon: '😴',
      time: '11:45 AM',
      note: 'Slept for 1 hour.',
    },
    {
      id: 3,
      type: 'potty',
      icon: '🚽',
      time: '1:10 PM',
      note: 'Went to potty independently.',
    },
    {
      id: 4,
      type: 'photo',
      image:
        'https://images.unsplash.com/photo-1503457574464-0ec3c9cbd8a9?auto=format&fit=crop&w=800&q=60',
      caption: 'Painting time 🎨',
      time: '2:30 PM',
    },
    {
      id: 5,
      type: 'video',
      thumbnail:
        'https://images.unsplash.com/photo-1601049678869-77aefc8c4c4a?auto=format&fit=crop&w=800&q=60',
      caption: 'Outdoor playtime 🌳',
      time: '3:10 PM',
    },
    {
      id: 6,
      type: 'note',
      note: 'Had a wonderful day being very helpful today!',
      time: '4:00 PM',
    },
  ]);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedValue, setEditedValue] = useState('');

  const openEditModal = activity => {
    setSelectedActivity(activity);
    setEditedValue(activity.note || activity.mealItem || '');
    setModalVisible(true);
  };

  const handleSaveEdit = () => {
    setActivities(prev =>
      prev.map(a =>
        a.id === selectedActivity.id
          ? {
              ...a,
              note: editedValue || a.note,
              mealItem: editedValue || a.mealItem,
            }
          : a,
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

  const renderActivityCard = activity => {
    switch (activity.type) {
      case 'photo':
        return (
          <TouchableOpacity
            key={activity.id}
            style={styles.photoCard}
            onPress={() => openEditModal(activity)}>
            <Image source={{uri: activity.image}} style={styles.mediaImage} />
            <Text style={styles.caption}>{activity.caption}</Text>
            <Text style={styles.time}>{activity.time}</Text>
          </TouchableOpacity>
        );
      case 'video':
        return (
          <TouchableOpacity
            key={activity.id}
            style={styles.videoCard}
            onPress={() => openEditModal(activity)}>
            <Image
              source={{uri: activity.thumbnail}}
              style={styles.mediaImage}
            />
            <View style={styles.playOverlay}>
              <Icon name="play-circle-outline" size={40} color="#fff" />
            </View>
            <Text style={styles.caption}>{activity.caption}</Text>
            <Text style={styles.time}>{activity.time}</Text>
          </TouchableOpacity>
        );
      case 'note':
        return (
          <TouchableOpacity
            key={activity.id}
            style={styles.noteCard}
            onPress={() => openEditModal(activity)}>
            <Icon name="document-text-outline" size={22} color="#25A0DD" />
            <Text style={styles.noteText}>{activity.note}</Text>
            <Text style={styles.time}>{activity.time}</Text>
          </TouchableOpacity>
        );
      case 'food':
        return (
          <TouchableOpacity
            key={activity.id}
            style={styles.foodCard}
            onPress={() => openEditModal(activity)}>
            <Text style={styles.foodIcon}>{activity.icon}</Text>
            <View style={{flex: 1}}>
              <Text style={styles.activityTitle}>{activity.mealType}</Text>
              <Text style={styles.details}>{activity.mealItem}</Text>
              <Text style={styles.note}>📝 {activity.note}</Text>
            </View>
            <Text style={styles.time}>{activity.time}</Text>
          </TouchableOpacity>
        );
      case 'potty':
        return (
          <TouchableOpacity
            key={activity.id}
            style={styles.pottyCard}
            onPress={() => openEditModal(activity)}>
            <Text style={styles.pottyIcon}>🚽</Text>
            <View>
              <Text style={styles.note}>{activity.note}</Text>
              <Text style={styles.time}>{activity.time}</Text>
            </View>
          </TouchableOpacity>
        );
      case 'nap':
        return (
          <TouchableOpacity
            key={activity.id}
            style={styles.napCard}
            onPress={() => openEditModal(activity)}>
            <Text style={styles.napIcon}>😴</Text>
            <View>
              <Text style={styles.note}>{activity.note}</Text>
              <Text style={styles.time}>{activity.time}</Text>
            </View>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri:
              student.image ||
              'https://images.unsplash.com/photo-1595878715977-7a6d6f8b4186?auto=format&fit=crop&w=800&q=60',
          }}
          style={styles.profileImage}
        />
        <View style={styles.overlay} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.room}>{student.room || 'Preschool'}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: '#25A0DD'}]}
          onPress={() => navigation.navigate('StudentInfo', {student})}>
          <Icon name="information-circle-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: '#FE6602'}]}
          onPress={() => Alert.alert('Calling parent...')}>
          <Icon name="call-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: '#4CAF50'}]}
          onPress={() => navigation.navigate('ActivitiesModal', {student})}>
          <Icon name="add-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>Add Activity</Text>
        </TouchableOpacity>
      </View>

      {/* Feed */}
      <Text style={styles.feedTitle}>Daily Activities</Text>
      {activities.map(renderActivityCard)}

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Edit {selectedActivity?.type?.toUpperCase()} Activity
            </Text>

            <TextInput
              style={styles.input}
              value={editedValue}
              onChangeText={setEditedValue}
              placeholder="Edit text..."
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
  container: {flex: 1, backgroundColor: '#F9FAFB'},
  headerContainer: {position: 'relative', height: 220},
  profileImage: {width: '100%', height: '100%'},
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  name: {fontSize: 24, color: '#fff', fontWeight: 'bold'},
  room: {fontSize: 16, color: '#eee'},

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
    paddingHorizontal: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  actionText: {color: '#fff', marginLeft: 5, fontWeight: '600'},

  feedTitle: {fontSize: 18, fontWeight: '600', marginLeft: 16, marginBottom: 8},

  // Feed styles
  photoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    position: 'relative',
  },
  playOverlay: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 50,
  },
  mediaImage: {width: '100%', height: 200},
  caption: {padding: 10, fontSize: 14, color: '#333'},
  noteCard: {
    backgroundColor: '#E8F5FE',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    padding: 12,
  },
  noteText: {fontSize: 15, color: '#333', marginVertical: 5},
  foodCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF7E0',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  foodIcon: {fontSize: 28, marginRight: 12},
  pottyCard: {
    flexDirection: 'row',
    backgroundColor: '#EDE7F6',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  pottyIcon: {fontSize: 26, marginRight: 12},
  napCard: {
    flexDirection: 'row',
    backgroundColor: '#E0F7FA',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  napIcon: {fontSize: 26, marginRight: 12},
  activityTitle: {fontSize: 15, fontWeight: '600'},
  details: {fontSize: 14, color: '#444', marginTop: 2},
  note: {fontSize: 13, color: '#555', marginTop: 4, fontStyle: 'italic'},
  time: {fontSize: 11, color: '#777', textAlign: 'right', padding: 6},

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  modalActions: {flexDirection: 'row', justifyContent: 'space-between'},
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
