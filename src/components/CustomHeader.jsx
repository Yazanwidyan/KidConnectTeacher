import {useNavigation} from '@react-navigation/native';
import {useRef, useState} from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({
  title,
  showBack,
  showMenu,
  showRoomSelector = false,
  rooms = [],
  selectedRoom,
  onRoomSelect,
}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // Animation for modal
  const slideAnim = useRef(new Animated.Value(300)).current;

  const openModal = () => {
    setModalVisible(true);
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
    }).start(() => setModalVisible(false));
  };

  return (
    <View style={styles.container}>
      {/* Left: Back or Menu */}
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      ) : showMenu ? (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={28} color="#ffff" />
        </TouchableOpacity>
      ) : (
        <View style={{width: 28}} />
      )}
      {/* Title or Room Selector */}
      <View style={{flex: 1, alignItems: 'center'}}>
        {showRoomSelector && rooms.length > 0 ? (
          <TouchableOpacity onPress={openModal}>
            <Text style={styles.roomText}>{selectedRoom?.name} ▼</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>
      <View style={{width: 28}} /> {/* Right placeholder */}
      {/* Room Selection Modal */}
      {showRoomSelector && modalVisible && (
        <Modal transparent animationType="none" visible={modalVisible}>
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.modalContent,
                {transform: [{translateY: slideAnim}]},
              ]}>
              <ScrollView style={{width: '100%'}}>
                {rooms.map(room => (
                  <TouchableOpacity
                    key={room.id}
                    style={styles.modalItem}
                    onPress={() => {
                      onRoomSelect(room);
                      closeModal();
                    }}>
                    <Text style={styles.modalText}>
                      {room.emoji} {room.name}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.modalItem} onPress={closeModal}>
                  <Text style={[styles.modalText, {color: 'red'}]}>Cancel</Text>
                </TouchableOpacity>
              </ScrollView>
            </Animated.View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#558DFF',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  roomText: {color: '#fff', fontWeight: '600', fontSize: 16},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
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

export default CustomHeader;
