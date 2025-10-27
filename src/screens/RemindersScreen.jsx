import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const reminders = [
  {id: '1', text: 'Send photo updates to parents'},
  {id: '2', text: 'Complete attendance check by 9 AM'},
  {id: '3', text: 'Prepare snacks for afternoon session'},
];

export default function RemindersScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Reminders</Text>
      </View>

      <FlatList
        data={reminders}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.text}>• {item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F9FAFB', padding: 16},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuButton: {
    padding: 8,
  },
  menuText: {
    fontSize: 24,
    color: '#25A0DD',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#25A0DD',
    marginLeft: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  text: {color: '#333', fontSize: 15},
});
