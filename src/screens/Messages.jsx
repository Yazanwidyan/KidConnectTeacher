// src/screens/MessagesScreen.js

import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

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

export default function MessagesScreen({navigation}) {
  const handlePress = message => {
    navigation.navigate('Chat', {chatWith: message.name});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F9FAFB', padding: 16},
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#25A0DD',
    marginBottom: 12,
  },
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
});
