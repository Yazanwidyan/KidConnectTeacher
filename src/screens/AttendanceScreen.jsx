import {useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Modal,
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
    emoji: '🧸',
    students: [
      {id: 1, name: 'Adam Smith', status: 'notChecked', room: 'Preschool'},
      {id: 2, name: 'Josh Finkle', status: 'notChecked', room: 'Preschool'},
      {id: 7, name: 'Laura Dean', status: 'notChecked', room: 'Preschool'},
    ],
  },
  {
    id: 2,
    name: 'Kindergarten Room',
    emoji: '🎨',
    students: [
      {
        id: 3,
        name: 'Mia Rodriquez',
        status: 'notChecked',
        room: 'Kindergarten',
      },
      {
        id: 4,
        name: 'Michael Green',
        status: 'notChecked',
        room: 'Kindergarten',
      },
      {id: 8, name: 'Sam Carter', status: 'notChecked', room: 'Kindergarten'},
    ],
  },
  {
    id: 3,
    name: 'Toddler Room',
    emoji: '🍼',
    students: [
      {id: 5, name: 'Russ Bell', status: 'notChecked', room: 'Toddler'},
      {id: 6, name: 'Steven Cruz', status: 'notChecked', room: 'Toddler'},
    ],
  },
];

export default function AttendanceScreen() {
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [students, setStudents] = useState(rooms[0].students);
  const [selected, setSelected] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [roomModalVisible, setRoomModalVisible] = useState(false);
  const [activeStudentId, setActiveStudentId] = useState(null);

  const slideAnim = useRef(new Animated.Value(300)).current;

  const openModal = () => {
    setRoomModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setRoomModalVisible(false));
  };

  const handleRoomSelect = room => {
    setSelectedRoom(room);
    setStudents(room.students);
  };

  const toggleSelect = id => {
    const student = students.find(s => s.id === id);
    if (student?.status === 'checkedIn') {
      setExpandedId(prev => (prev === id ? null : id));
    } else {
      setSelected(prev =>
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
      );
    }
  };

  const handleSelectAll = () => {
    if (selected.length === students.length) {
      setSelected([]);
    } else {
      setSelected(students.map(s => s.id));
    }
  };

  const handleCheckIn = () => {
    setStudents(prev =>
      prev.map(s =>
        selected.includes(s.id) ? {...s, status: 'checkedIn'} : s,
      ),
    );
    setSelected([]);
  };

  const handleMarkAbsent = () => {
    setStudents(prev =>
      prev.map(s => (selected.includes(s.id) ? {...s, status: 'absent'} : s)),
    );
    setSelected([]);
  };

  const handleCheckOut = id => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? {...s, status: 'checkedOut'} : s)),
    );
    setExpandedId(null);
  };

  const handleMoveRoom = id => {
    setActiveStudentId(id);
    openModal();
  };

  const confirmMoveRoom = room => {
    setStudents(prev =>
      prev.map(s =>
        s.id === activeStudentId
          ? {...s, room: room.name, status: 'checkedIn'}
          : s,
      ),
    );
    closeModal();
    setExpandedId(null);
    setActiveStudentId(null);
  };

  const getStatusText = status => {
    switch (status) {
      case 'checkedIn':
        return '✅ Checked In';
      case 'checkedOut':
        return '🔄 Checked Out';
      case 'absent':
        return '❌ Absent';
      default:
        return '⬜ Not Checked In';
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case 'checkedIn':
        return '#22c55e';
      case 'checkedOut':
        return '#25A0DD';
      case 'absent':
        return '#ef4444';
      default:
        return '#777';
    }
  };

  const renderItem = ({item}) => (
    <View>
      <TouchableOpacity
        style={[
          styles.item,
          selected.includes(item.id) && styles.selectedItem,
          expandedId === item.id && {borderColor: '#25A0DD', borderWidth: 2},
        ]}
        onPress={() => toggleSelect(item.id)}>
        <View style={styles.itemRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          </View>

          <View style={{flex: 1, marginLeft: 12}}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.roomText}>Room: {item.room}</Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              {backgroundColor: getStatusColor(item.status) + '22'},
            ]}>
            <Text style={[styles.status, {color: getStatusColor(item.status)}]}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {expandedId === item.id && item.status === 'checkedIn' && (
        <View style={styles.expandedButtons}>
          <TouchableOpacity
            style={[styles.smallButton, styles.checkOut]}
            onPress={() => handleCheckOut(item.id)}>
            <Text style={styles.smallButtonText}>Check Out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.smallButton, styles.moveRoom]}
            onPress={() => handleMoveRoom(item.id)}>
            <Text style={styles.smallButtonText}>Move Room</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <>
      <CustomHeader
        showMenu={true}
        showBack={false}
        showRoomSelector={true}
        rooms={rooms}
        selectedRoom={selectedRoom}
        onRoomSelect={handleRoomSelect}
      />

      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleSelectAll}>
            <Text style={styles.selectAll}>
              {selected.length === students.length
                ? 'Deselect All'
                : 'Select All'}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={students}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />

        {selected.length > 0 && (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.checkIn]}
              onPress={handleCheckIn}>
              <Text style={styles.buttonText}>Check In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.absent]}
              onPress={handleMarkAbsent}>
              <Text style={styles.buttonText}>Mark Absent</Text>
            </TouchableOpacity>
          </View>
        )}

        {roomModalVisible && (
          <Modal transparent animationType="none" visible={roomModalVisible}>
            <View style={styles.modalOverlay}>
              <Animated.View
                style={[
                  styles.modalContent,
                  {transform: [{translateY: slideAnim}]},
                ]}>
                <Text style={styles.modalHeader}>Select a Room</Text>
                {rooms.map(room => (
                  <TouchableOpacity
                    key={room.id}
                    style={styles.modalItem}
                    onPress={() => confirmMoveRoom(room)}>
                    <Text style={styles.modalText}>
                      {room.emoji} {room.name}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={[styles.modalItem, {marginTop: 10}]}
                  onPress={closeModal}>
                  <Text style={[styles.modalText, {color: 'red'}]}>Cancel</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Modal>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F5',
  },
  headerRow: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectAll: {color: '#25A0DD', fontWeight: '600'},
  item: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    padding: 3,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  selectedItem: {borderColor: '#25A0DD', borderWidth: 2},
  itemRow: {flexDirection: 'row', alignItems: 'center'},
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 12,
    backgroundColor: '#25A0DD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {color: '#fff', fontWeight: '700', fontSize: 20},
  name: {fontSize: 16, fontWeight: '600'},
  roomText: {fontSize: 14, color: '#777'},
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {fontSize: 14, fontWeight: '600'},
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  checkIn: {backgroundColor: '#25A0DD'},
  absent: {backgroundColor: '#ef4444'},
  buttonText: {color: '#fff', fontWeight: '600', fontSize: 16},
  expandedButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  smallButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  checkOut: {backgroundColor: '#f59e0b'},
  moveRoom: {backgroundColor: '#25A0DD'},
  smallButtonText: {color: '#fff', fontWeight: '600'},
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
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25A0DD',
    marginBottom: 10,
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
