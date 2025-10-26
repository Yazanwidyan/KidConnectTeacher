import {useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AddMomentModal from '../components/AddMomentModal';

const StudentProfile = ({route}) => {
  const {student} = route.params;
  const [moments, setMoments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddMoment = moment => setMoments(prev => [moment, ...prev]);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{uri: student.avatar || 'https://via.placeholder.com/100'}}
          style={styles.avatar}
        />
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.className}>{student.className}</Text>
      </View>

      {/* Moments Section */}
      <View style={styles.momentsSection}>
        <Text style={styles.momentsTitle}>Moments</Text>

        {moments.length === 0 ? (
          <Text style={styles.placeholderText}>No moments yet.</Text>
        ) : (
          <FlatList
            data={moments}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.momentCard}>
                <Text style={styles.momentType}>{item.type}</Text>
                <Text style={styles.momentNote}>{item.note}</Text>
                {item.image && (
                  <Image
                    source={{uri: item.image}}
                    style={styles.momentImage}
                  />
                )}
                <Text style={styles.momentTime}>
                  {new Date(item.id).toLocaleString()}
                </Text>
              </View>
            )}
          />
        )}

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Moment</Text>
        </TouchableOpacity>
      </View>

      <AddMomentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddMoment}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  className: {
    fontSize: 14,
    color: '#6B7280',
  },
  momentsSection: {
    marginBottom: 16,
  },
  momentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#6B7280',
    paddingVertical: 16,
  },
  momentCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 2,
  },
  momentType: {
    fontWeight: '600',
    fontSize: 16,
    color: '#111827',
  },
  momentNote: {
    marginTop: 4,
    color: '#4B5563',
  },
  momentImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    marginTop: 8,
  },
  momentTime: {
    marginTop: 4,
    fontSize: 12,
    color: '#9CA3AF',
  },
  addButton: {
    backgroundColor: '#25A0DD',
    borderRadius: 16,
    paddingVertical: 12,
    marginTop: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default StudentProfile;
