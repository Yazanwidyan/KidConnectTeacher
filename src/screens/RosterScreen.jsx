import React, {useState} from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CustomHeader from '../components/CustomHeader';

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

  // Animation for modal
  const slideAnim = useState(new Animated.Value(300))[0];

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleRoomSelect = room => {
    setSelectedRoom(room);
    closeModal();
  };

  return (
    <>
      <CustomHeader
        showMenu={true}
        showBack={false}
        showRoomSelector={true}
        rooms={rooms}
        selectedRoom={selectedRoom}
        onRoomSelect={setSelectedRoom}
      />
      <ScrollView style={styles.container}>
        {/* Student Cards */}
        {selectedRoom.students.map(s => {
          let statusText = '';
          let statusColor = '';
          let cardOpacity = 1;

          if (s.checkedIn === true) {
            statusText = 'Checked In';
            statusColor = '#4CAF50';
          } else if (s.checkedIn === false) {
            statusText = 'Absent';
            statusColor = '#FF5252';
          } else {
            cardOpacity = 0.6;
          }

          return (
            <TouchableOpacity
              key={s.id}
              style={[styles.card, {opacity: cardOpacity}]}
              onPress={() =>
                navigation.navigate('StudentProfile', {student: s})
              }
              disabled={s.checkedIn === null}>
              <View style={styles.cardRow}>
                {/* Avatar */}
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{s.name.charAt(0)}</Text>
                </View>

                {/* Info */}
                <View style={{flex: 1, marginLeft: 12}}>
                  <Text style={styles.name}>{s.name}</Text>
                  {s.allergy && (
                    <Text style={styles.allergyText}>
                      ⚠️ Allergy: {s.allergy}
                    </Text>
                  )}
                </View>

                {/* Status */}
                {statusText !== '' && (
                  <View
                    style={[
                      styles.statusBadge,
                      {backgroundColor: statusColor + '33'},
                    ]}>
                    <Text style={[styles.status, {color: statusColor}]}>
                      {statusText}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Room Selection Modal */}
        {modalVisible && (
          <Modal transparent animationType="none" visible={modalVisible}>
            <View style={styles.modalOverlay}>
              <Animated.View
                style={[
                  styles.modalContent,
                  {transform: [{translateY: slideAnim}]},
                ]}>
                {rooms.map(room => (
                  <TouchableOpacity
                    key={room.id}
                    style={styles.modalItem}
                    onPress={() => handleRoomSelect(room)}>
                    <Text style={styles.modalText}>{room.name}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.modalItem} onPress={closeModal}>
                  <Text style={[styles.modalText, {color: 'red'}]}>Cancel</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3F5F5',
  },
  card: {
    backgroundColor: '#fff',
    padding: 3,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  cardRow: {flexDirection: 'row', alignItems: 'center'},
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 12,
    backgroundColor: '#25A0DD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {color: '#fff', fontWeight: '700', fontSize: 20},
  name: {fontSize: 18, fontWeight: '600'},
  allergyText: {
    marginTop: 4,
    color: '#FE6602',
    fontSize: 14,
    fontWeight: '500',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {marginTop: 0, fontSize: 14, fontWeight: '500'},

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  modalItem: {
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  modalText: {fontSize: 16},
});
