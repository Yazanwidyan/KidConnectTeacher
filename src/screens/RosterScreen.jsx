import {useNavigation} from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const students = [
  {id: 1, name: 'Adam Smith'},
  {id: 2, name: 'Josh Finkle'},
  {id: 3, name: 'Mia Rodriquez'},
  {id: 4, name: 'Michael Green'},
  {id: 5, name: 'Russ Bell'},
  {id: 6, name: 'Steven Cruz'},
];

export default function RosterScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Preschool Room</Text>

      {students.map(s => (
        <TouchableOpacity
          key={s.id}
          style={styles.card}
          onPress={() => navigation.navigate('StudentProfile', {student: s})}>
          <Text style={styles.name}>{s.name}</Text>
          <Text style={styles.subtext}>Tap to view profile</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#F9FAFB'},
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#25A0DD',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    elevation: 2,
  },
  name: {fontSize: 18, fontWeight: '600'},
  subtext: {color: '#777', fontSize: 13},
});
