// src/screens/ChatScreen.js

import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ChatScreen({route}) {
  const {chatWith} = route.params;
  const [messages, setMessages] = useState([
    {id: '1', text: 'Hello!', sender: 'them'},
    {id: '2', text: 'Hi there!', sender: 'me'},
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages([
      ...messages,
      {id: Date.now().toString(), text: input, sender: 'me'},
    ]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{chatWith}</Text>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === 'me' ? styles.myMessage : styles.theirMessage,
            ]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={{color: '#fff', fontWeight: '600'}}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5', padding: 10},
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25A0DD',
    marginBottom: 10,
    alignSelf: 'center',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
  },
  myMessage: {
    backgroundColor: '#25A0DD',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },
  sendButton: {
    backgroundColor: '#25A0DD',
    marginLeft: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
