import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const initialStudents = [
  {id: 1, name: 'Adam Smith', status: 'notChecked', room: 'Preschool'},
  {id: 2, name: 'Josh Finkle', status: 'notChecked', room: 'Preschool'},
  {id: 3, name: 'Mia Rodriquez', status: 'notChecked', room: 'Kindergarten'},
  {id: 4, name: 'Michael Green', status: 'notChecked', room: 'Kindergarten'},
  {id: 5, name: 'Russ Bell', status: 'notChecked', room: 'Toddler'},
  {id: 6, name: 'Steven Cruz', status: 'notChecked', room: 'Toddler'},
];

const rooms = ['Preschool', 'Kindergarten', 'Toddler', 'Nursery', 'Play Room'];

export default function AttendanceScreen() {
  const [students, setStudents] = useState(initialStudents);
  const [selected, setSelected] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [roomModalVisible, setRoomModalVisible] = useState(false);
  const [activeStudentId, setActiveStudentId] = useState(null);

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
      setSelected([]); // Deselect all
    } else {
      setSelected(students.map(s => s.id)); // Select all
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
    setRoomModalVisible(true);
  };

  const confirmMoveRoom = room => {
    setStudents(prev =>
      prev.map(s =>
        s.id === activeStudentId ? {...s, room, status: 'checkedIn'} : s,
      ),
    );
    setRoomModalVisible(false);
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
          expandedId === item.id && {borderColor: '#25A0DD'},
        ]}
        onPress={() => toggleSelect(item.id)}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.roomText}>Room: {item.room}</Text>
        </View>
        <Text style={[styles.status, {color: getStatusColor(item.status)}]}>
          {getStatusText(item.status)}
        </Text>
      </TouchableOpacity>

      {/* Show extra buttons when expanded */}
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
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Check-In / Check-Out</Text>
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

      {/* Move Room Modal */}
      <Modal
        visible={roomModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setRoomModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select a Room</Text>
            {rooms.map((room, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => confirmMoveRoom(room)}>
                <Text style={styles.modalText}>{room}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.modalItem, {marginTop: 10}]}
              onPress={() => setRoomModalVisible(false)}>
              <Text style={[styles.modalText, {color: 'red'}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#F9FAFB'},
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  header: {fontSize: 22, fontWeight: 'bold', color: '#25A0DD'},
  selectAll: {color: '#25A0DD', fontWeight: '600'},
  item: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 1,
  },
  selectedItem: {borderColor: '#25A0DD', borderWidth: 1},
  name: {fontSize: 16, fontWeight: '500'},
  roomText: {fontSize: 13, color: '#777'},
  status: {fontSize: 14},
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
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
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  checkOut: {backgroundColor: '#f59e0b'},
  moveRoom: {backgroundColor: '#25A0DD'},
  smallButtonText: {color: '#fff', fontWeight: '600'},

  // Modal
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
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25A0DD',
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalText: {fontSize: 16},
});
