import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import CalendarScreen from '../screens/CalendarScreen';
import HelpScreen from '../screens/HelpScreen';
import Profile from '../screens/Profile';
import RemindersScreen from '../screens/RemindersScreen';
import TabsNavigator from './TabsNavigator';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <Image
            source={{uri: 'https://i.pravatar.cc/100'}}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Alana Fig</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Profile')}>
              <Text style={styles.edit}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.academyRow}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="map-marker" size={16} color="#fff" />
            <Text style={styles.academy}> ABC Academy</Text>
          </View>
          <TouchableOpacity style={styles.switchBtn}>
            <Text style={{color: '#25A0DD', fontWeight: '600'}}>Switch</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.checkBtn}>
          <Icon name="qrcode" color="#fff" size={16} />
          <Text style={{color: '#fff', fontWeight: '600', marginLeft: 6}}>
            Check in/out
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{backgroundColor: '#fff', paddingTop: 10}}>
        <DrawerItem
          label="Home"
          icon={({color, size}) => (
            <Icon name="home" color={color} size={size} />
          )}
          onPress={() => props.navigation.navigate('HomeTabs')}
        />
        <DrawerItem
          label="Calendar"
          icon={({color, size}) => (
            <Icon name="calendar" color={color} size={size} />
          )}
          onPress={() => props.navigation.navigate('Calendar')}
        />
        <DrawerItem
          label="Reminders"
          icon={({color, size}) => (
            <Icon name="bell" color={color} size={size} />
          )}
          onPress={() => props.navigation.navigate('Reminders')}
        />
        <DrawerItem
          label="Help"
          icon={({color, size}) => (
            <Icon name="question-circle" color={color} size={size} />
          )}
          onPress={() => props.navigation.navigate('Help')}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#25A0DD',
        drawerLabelStyle: {marginLeft: -20, fontSize: 15},
      }}>
      <Drawer.Screen
        name="HomeTabs"
        component={TabsNavigator}
        options={{title: 'Home'}}
      />
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
      <Drawer.Screen name="Reminders" component={RemindersScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#25A0DD',
    padding: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 15},
  avatar: {width: 50, height: 50, borderRadius: 25, marginRight: 10},
  name: {color: '#fff', fontWeight: 'bold', fontSize: 16},
  edit: {color: '#fff', fontSize: 13, opacity: 0.8},
  academyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  academy: {color: '#fff', fontWeight: '600'},
  switchBtn: {
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  checkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#25A0DD',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
