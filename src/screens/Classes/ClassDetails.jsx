import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const studentsList = [
  {id: 1, name: 'Ali Ahmad'},
  {id: 2, name: 'Lina Hassan'},
  {id: 3, name: 'Sara Khaled'},
];

const ClassDetails = ({route}) => {
  const navigation = useNavigation();
  const {classData} = route.params;
  const [selectedTab, setSelectedTab] = useState('attendance');
  const [attendance, setAttendance] = useState({});

  const toggleAttendance = id => {
    setAttendance(prev => ({...prev, [id]: !prev[id]}));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.className}>{classData.name}</Text>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('attendance')}>
          <Text
            style={
              selectedTab === 'attendance'
                ? styles.tabActive
                : styles.tabInactive
            }>
            Attendance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('report')}>
          <Text
            style={
              selectedTab === 'report' ? styles.tabActive : styles.tabInactive
            }>
            Daily Report
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll}>
        {selectedTab === 'attendance' ? (
          studentsList.map(s => (
            <View key={s.id} style={styles.studentRow}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('StudentProfile', {student: s})
                }>
                <Text style={styles.studentName}>{s.name}</Text>
              </TouchableOpacity>
              <Switch
                value={attendance[s.id] || false}
                onValueChange={() => toggleAttendance(s.id)}
                trackColor={{true: '#25A0DD', false: '#ccc'}}
              />
            </View>
          ))
        ) : (
          <Text style={styles.placeholderText}>
            Switch to Attendance to mark students
          </Text>
        )}
      </ScrollView>

      {selectedTab === 'attendance' && (
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Attendance</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // light background
  },
  className: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#25A0DD', // primary color
    textAlign: 'center',
    marginTop: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  tabActive: {
    color: '#25A0DD',
    fontWeight: '600',
    fontSize: 16,
  },
  tabInactive: {
    color: '#6B7280',
    fontSize: 16,
  },
  scroll: {
    padding: 16,
  },
  studentRow: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  studentName: {
    color: '#374151', // gray-700
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  placeholderText: {
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#25A0DD',
    margin: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ClassDetails;
