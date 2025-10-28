import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

export default function ActivityDetailsScreen({route, navigation}) {
  const {activity, selectedStudents} = route.params;

  // Common fields
  const [note, setNote] = useState('');

  // Food-specific
  const [mealType, setMealType] = useState('');
  const [mealItem, setMealItem] = useState('');

  // Nap-specific
  const [napStart, setNapStart] = useState('');
  const [napEnd, setNapEnd] = useState('');

  // Potty-specific
  const [pottyType, setPottyType] = useState('');
  const [pottySuccess, setPottySuccess] = useState(false);

  // Media
  const [media, setMedia] = useState(null);
  const [caption, setCaption] = useState('');

  const mealTypes = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];
  const pottyOptions = ['Wet', 'Dry', 'Both'];

  const handlePickMedia = async type => {
    const options = {
      mediaType: type,
      quality: 1,
    };
    const result = await ImagePicker.launchImageLibrary(options);
    if (!result.didCancel && result.assets?.[0]) {
      setMedia(result.assets[0]);
    }
  };

  const handlePost = () => {
    const newActivity = {
      type: activity.name,
      time: new Date().toLocaleTimeString(),
      note,
    };

    switch (activity.name.toLowerCase()) {
      case 'food':
        newActivity.mealType = mealType;
        newActivity.mealItem = mealItem;
        break;
      case 'nap':
        newActivity.start = napStart;
        newActivity.end = napEnd;
        break;
      case 'potty':
        newActivity.pottyType = pottyType;
        newActivity.success = pottySuccess;
        break;
      case 'photo':
      case 'video':
        newActivity.media = media;
        newActivity.caption = caption;
        break;
      default:
        break;
    }

    selectedStudents.forEach(student => {
      console.log(`Posted ${activity.name} for ${student.name}`, newActivity);
    });

    navigation.navigate('StudentProfile', {
      student: selectedStudents[0],
      newActivity,
    });
  };

  const renderForm = () => {
    switch (activity.name.toLowerCase()) {
      case 'food':
        return (
          <>
            <Text style={styles.label}>Meal Type</Text>
            <View style={styles.row}>
              {mealTypes.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.option,
                    mealType === type && styles.selectedOption,
                  ]}
                  onPress={() => setMealType(type)}>
                  <Text
                    style={[
                      styles.optionText,
                      mealType === type && styles.selectedOptionText,
                    ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Meal Item</Text>
            <TextInput
              style={styles.input}
              value={mealItem}
              onChangeText={setMealItem}
              placeholder="e.g. Mac & Cheese"
            />
          </>
        );

      case 'nap':
        return (
          <>
            <Text style={styles.label}>Start Time</Text>
            <TextInput
              style={styles.input}
              value={napStart}
              onChangeText={setNapStart}
              placeholder="e.g. 1:00 PM"
            />
            <Text style={styles.label}>End Time</Text>
            <TextInput
              style={styles.input}
              value={napEnd}
              onChangeText={setNapEnd}
              placeholder="e.g. 2:15 PM"
            />
          </>
        );

      case 'potty':
        return (
          <>
            <Text style={styles.label}>Type</Text>
            <View style={styles.row}>
              {pottyOptions.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.option,
                    pottyType === type && styles.selectedOption,
                  ]}
                  onPress={() => setPottyType(type)}>
                  <Text
                    style={[
                      styles.optionText,
                      pottyType === type && styles.selectedOptionText,
                    ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setPottySuccess(!pottySuccess)}>
              <View
                style={[
                  styles.checkbox,
                  pottySuccess && styles.checkedBox,
                ]}></View>
              <Text style={{marginLeft: 8}}>Successful</Text>
            </TouchableOpacity>
          </>
        );

      case 'photo':
        return (
          <>
            <TouchableOpacity
              style={styles.mediaButton}
              onPress={() => handlePickMedia('photo')}>
              <Text style={styles.mediaButtonText}>
                {media ? 'Change Photo' : 'Pick Photo'}
              </Text>
            </TouchableOpacity>
            {media && (
              <Text style={styles.fileName}>
                {media.fileName || 'Photo selected'}
              </Text>
            )}
            <Text style={styles.label}>Caption</Text>
            <TextInput
              style={styles.input}
              value={caption}
              onChangeText={setCaption}
              placeholder="e.g. Playing with blocks"
            />
          </>
        );

      case 'video':
        return (
          <>
            <TouchableOpacity
              style={styles.mediaButton}
              onPress={() => handlePickMedia('video')}>
              <Text style={styles.mediaButtonText}>
                {media ? 'Change Video' : 'Pick Video'}
              </Text>
            </TouchableOpacity>
            {media && (
              <Text style={styles.fileName}>
                {media.fileName || 'Video selected'}
              </Text>
            )}
            <Text style={styles.label}>Caption</Text>
            <TextInput
              style={styles.input}
              value={caption}
              onChangeText={setCaption}
              placeholder="e.g. Singing time"
            />
          </>
        );

      case 'note':
        return (
          <>
            <Text style={styles.label}>Note</Text>
            <TextInput
              style={[styles.input, {height: 120}]}
              value={note}
              onChangeText={setNote}
              multiline
              placeholder="Write your note..."
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add {activity.name} Activity</Text>
      {renderForm()}

      {activity.name.toLowerCase() !== 'note' && (
        <>
          <Text style={styles.label}>Note (optional)</Text>
          <TextInput
            style={[styles.input, {height: 80}]}
            value={note}
            onChangeText={setNote}
            multiline
            placeholder="Add extra comments..."
          />
        </>
      )}

      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postText}>Post Activity</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#F9FAFB'},
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#25A0DD',
    marginBottom: 16,
  },
  label: {fontSize: 16, color: '#333', marginTop: 12},
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
    elevation: 1,
  },
  row: {flexDirection: 'row', flexWrap: 'wrap', marginTop: 8},
  option: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    margin: 4,
  },
  selectedOption: {backgroundColor: '#25A0DD'},
  optionText: {color: '#333'},
  selectedOptionText: {color: '#fff', fontWeight: 'bold'},
  checkboxRow: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#25A0DD',
    borderRadius: 4,
  },
  checkedBox: {backgroundColor: '#25A0DD'},
  mediaButton: {
    backgroundColor: '#25A0DD',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  mediaButtonText: {color: '#fff', fontWeight: '600'},
  fileName: {marginTop: 6, color: '#555'},
  postButton: {
    backgroundColor: '#25A0DD',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  postText: {color: '#fff', fontWeight: '600'},
});
