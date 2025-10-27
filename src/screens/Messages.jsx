import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const messages = [
  {
    id: '1',
    name: 'Parent - Adam Smith',
    lastMessage: 'Thank you for today!',
    time: '2:30 PM',
  },
  {
    id: '2',
    name: 'Parent - Mia Rodriguez',
    lastMessage: 'Can I see her snack photo?',
    time: '1:45 PM',
  },
  {
    id: '3',
    name: 'Admin Office',
    lastMessage: 'Staff meeting tomorrow at 9 AM',
    time: '9:00 AM',
  },
];

const parents = [
  {id: 'p1', name: 'Parent - Adam Smith'},
  {id: 'p2', name: 'Parent - Mia Rodriguez'},
  {id: 'p3', name: 'Parent - Michael Green'},
  {id: 'p4', name: 'Parent - Russ Bell'},
  {id: 'p5', name: 'Parent - Steven Cruz'},
];

export default function MessagesScreen({navigation}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePress = message => {
    navigation.navigate('Chat', {chatWith: message.name});
  };

  const handleStartChat = parent => {
    setIsModalVisible(false);
    navigation.navigate('Chat', {chatWith: parent.name});
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Messages</Text>

        <TouchableOpacity
          style={styles.newButton}
          onPress={() => setIsModalVisible(true)}>
          <Text style={styles.newButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item)}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal for selecting parent */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Select Parent</Text>

            <FlatList
              data={parents}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.parentItem}
                  onPress={() => handleStartChat(item)}>
                  <Text style={styles.parentName}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F9FAFB', padding: 16},
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#25A0DD',
  },
  newButton: {
    backgroundColor: '#25A0DD',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  newButtonText: {color: '#fff', fontWeight: '600', fontSize: 16},

  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  name: {fontWeight: '600', fontSize: 16, color: '#333'},
  lastMessage: {color: '#777', marginTop: 2},
  time: {color: '#999', fontSize: 12},

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#25A0DD',
    marginBottom: 10,
    textAlign: 'center',
  },
  parentItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  parentName: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#ef4444',
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
