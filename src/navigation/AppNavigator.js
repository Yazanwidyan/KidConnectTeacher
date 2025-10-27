import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import ActivitiesScreen from '../screens/ActivitiesScreen';
import AppDrawer from './AppDrawer';

const RootStack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {/* Main Drawer + Tabs */}
        <RootStack.Screen
          name="Main"
          component={AppDrawer}
          options={{headerShown: false}}
        />

        {/* Modal version of Activities */}
        <RootStack.Screen
          name="ActivitiesModal"
          component={ActivitiesScreen}
          options={{
            presentation: 'modal',
            headerShown: true,
            title: 'Add Activity',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
