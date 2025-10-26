import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import CalendarScreen from '../screens/CalendarScreen';
import ClassDetails from '../screens/Classes/ClassDetails';
import ClassesList from '../screens/Classes/ClassesList';
import Dashboard from '../screens/Dashboard';
import Messages from '../screens/Messages';
import Profile from '../screens/Profile';
import StudentProfile from '../screens/StudentProfile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack for Classes
const ClassesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ClassesList"
      component={ClassesList}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ClassDetails"
      component={ClassDetails}
      options={{title: 'Class Details'}}
    />
    <Stack.Screen
      name="StudentProfile"
      component={StudentProfile}
      options={{title: 'Student Profile'}}
    />
    {/* <Stack.Screen
      name="Calendar"
      component={CalendarScreen}
      options={{ title: "Calendar" }}
    /> */}
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#25A0DD',
    }}>
    <Tab.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="tachometer" size={20} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Classes"
      component={ClassesStack}
      options={{
        tabBarIcon: ({color}) => <Icon name="users" size={20} color={color} />,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Messages"
      component={Messages}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="envelope" size={20} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({color}) => <Icon name="user" size={20} color={color} />,
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
