import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const Profile = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => console.log('Logged out'),
      },
    ]);
  };

  const handleEditImage = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}>
          <Icon name="bars" size={24} color="#25A0DD" />
        </TouchableOpacity>
        <Text style={styles.header}>Profile</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <Image
          source={
            profileImage
              ? {uri: profileImage}
              : require('../assets/default-profile.png') // default image
          }
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editButton} onPress={handleEditImage}>
          <Icon name="pencil" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Personal Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>Teacher John</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>teacher@example.com</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>+962 777 123 456</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>Teacher</Text>
        </View>
      </View>

      {/* Account Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account Info</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Check-in Code</Text>
          <Text style={styles.value}>ABCD1234</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuButton: {
    padding: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#25A0DD',
    marginLeft: 12,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#25A0DD',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#25A0DD',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  detailRow: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#FE6602',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Profile;
