import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const messagesList = [
  {id: 1, name: 'Parent: Ahmed', message: 'Hi, how is my child today?'},
  {id: 2, name: 'Parent: Lina', message: 'Can we schedule a meeting?'},
  {id: 3, name: 'Parent: Sara', message: 'Thank you for the update!'},
];

const Messages = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Messages</Text>

      {messagesList.map(msg => (
        <View key={msg.id} style={styles.messageCard}>
          <Text style={styles.name}>{msg.name}</Text>
          <Text style={styles.message}>{msg.message}</Text>
        </View>
      ))}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#25A0DD',
    marginBottom: 16,
  },
  messageCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 2,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: '#111827',
  },
  message: {
    marginTop: 4,
    fontSize: 14,
    color: '#4B5563',
  },
});

export default Messages;
