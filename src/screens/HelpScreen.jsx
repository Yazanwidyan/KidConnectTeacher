import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function HelpScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Help & Support</Text>
      </View>

      <Text style={styles.subtext}>
        Need assistance? We're here to help with your classroom management
        tools.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL('mailto:support@abcacademy.com')}>
        <Text style={styles.buttonText}>📧 Contact Support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#34D399'}]}
        onPress={() => Linking.openURL('https://abcacademy.com/help')}>
        <Text style={styles.buttonText}>🌐 Visit Help Center</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#F9FAFB'},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  subtext: {color: '#555', fontSize: 15, marginBottom: 20},
  button: {
    backgroundColor: '#25A0DD',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {color: '#fff', fontWeight: '600', fontSize: 15},
});
