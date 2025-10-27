import React, {useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const rooms = [
  {
    id: 1,
    name: 'Preschool Room',
    students: [
      {id: 1, name: 'Adam Smith', checkedIn: true, allergy: 'Peanuts'},
      {id: 2, name: 'Josh Finkle', checkedIn: false, allergy: null},
      {id: 7, name: 'Laura Dean', checkedIn: null, allergy: 'Dairy'},
    ],
  },
  {
    id: 2,
    name: 'Kindergarten Room',
    students: [
      {id: 3, name: 'Mia Rodriquez', checkedIn: true, allergy: null},
      {id: 4, name: 'Michael Green', checkedIn: false, allergy: 'Gluten'},
      {id: 8, name: 'Sam Carter', checkedIn: null, allergy: null},
    ],
  },
  {
    id: 3,
    name: 'Toddler Room',
    students: [
      {id: 5, name: 'Russ Bell', checkedIn: null, allergy: 'Eggs'},
      {id: 6, name: 'Steven Cruz', checkedIn: true, allergy: null},
    ],
  },
];

export default function RosterScreen({navigation}) {
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleRoomSelect = room => {
    setSelectedRoom(room);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Room Selector */}
      <TouchableOpacity
        style={styles.roomSelector}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.roomText}>{selectedRoom.name} ▼</Text>
      </TouchableOpacity>

      {/* Student Cards */}
      {selectedRoom.students.map(s => {
        let statusText = '';
        let statusColor = '';
        let cardOpacity = 1;

        if (s.checkedIn === true) {
          statusText = '✅ Checked In';
          statusColor = 'green';
        } else if (s.checkedIn === false) {
          statusText = '❌ Absent';
          statusColor = 'red';
        } else {
          // Pending
          cardOpacity = 0.5;
        }

        return (
          <TouchableOpacity
            key={s.id}
            style={[styles.card, {opacity: cardOpacity}]}
            onPress={() => navigation.navigate('StudentProfile', {student: s})}
            disabled={s.checkedIn === null}>
            <View>
              <Text style={styles.name}>{s.name}</Text>

              {/* Allergy warning */}
              {s.allergy && (
                <Text style={styles.allergyText}>⚠️ Allergy: {s.allergy}</Text>
              )}

              {/* Status */}
              {statusText !== '' && (
                <Text style={[styles.status, {color: statusColor}]}>
                  {statusText}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}

      {/* Room Selection Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {rooms.map(room => (
              <TouchableOpacity
                key={room.id}
                style={styles.modalItem}
                onPress={() => handleRoomSelect(room)}>
                <Text style={styles.modalText}>{room.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => setModalVisible(false)}>
              <Text style={[styles.modalText, {color: 'red'}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#F9FAFB'},
  roomSelector: {
    backgroundColor: '#25A0DD',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  roomText: {color: '#fff', fontWeight: '600', fontSize: 16},
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    elevation: 2,
  },
  name: {fontSize: 18, fontWeight: '600'},
  allergyText: {
    marginTop: 4,
    color: '#FE6602', // orange alert color
    fontSize: 14,
    fontWeight: '500',
  },
  status: {marginTop: 4, fontSize: 14, fontWeight: '500'},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
  },
  modalItem: {
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalText: {fontSize: 16},
});
