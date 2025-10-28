import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import AttendanceScreen from '../screens/AttendanceScreen';
import MessagesScreen from '../screens/Messages';
import ActivitiesStack from './ActivitiesStack';
import MessagingStack from './MessagingStack';
import RosterStack from './RosterStack';

const Tab = createBottomTabNavigator();

// Custom Tab Bar Component
function CustomTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const icons = {
          Roster: 'users',
          Attendance: 'check-circle',
          Activities: 'tasks',
          Messages: 'envelope',
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={0.7}>
            <Icon
              name={icons[route.name]}
              size={25}
              color={isFocused ? '#25A0DD' : '#999'}
            />
            <Text
              style={[
                styles.tabLabel,
                {color: isFocused ? '#25A0DD' : '#999'},
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Roster" component={RosterStack} />
      <Tab.Screen name="Attendance" component={AttendanceScreen} />
      <Tab.Screen name="Activities" component={ActivitiesStack} />
      <Tab.Screen name="Messages" component={MessagingStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    paddingBottom: 10,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});
