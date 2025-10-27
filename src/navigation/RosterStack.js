import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import RosterScreen from '../screens/RosterScreen';
import StudentDetails from '../screens/StudentDetailsScreen';
import StudentProfile from '../screens/StudentProfile';

const Stack = createNativeStackNavigator();

export default function RosterStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="RosterMain" component={RosterScreen} />
      <Stack.Screen name="StudentProfile" component={StudentProfile} />
      <Stack.Screen name="StudentDetails" component={StudentDetails} />
    </Stack.Navigator>
  );
}
