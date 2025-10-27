import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import ActivitiesScreen from '../screens/ActivitiesScreen';
import ActivityDetailsScreen from '../screens/ActivityDetailsScreen';
import SelectStudentScreen from '../screens/SelectStudentScreen';

const Stack = createNativeStackNavigator();

export default function ActivitiesStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ActivitiesTab" component={ActivitiesScreen} />
      <Stack.Screen name="SelectStudent" component={SelectStudentScreen} />
      <Stack.Screen name="ActivityDetails" component={ActivityDetailsScreen} />
    </Stack.Navigator>
  );
}
