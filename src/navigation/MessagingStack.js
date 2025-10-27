import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChatScreen from '../screens/ChatScreen';
import MessagesScreen from '../screens/Messages';

const Stack = createNativeStackNavigator();

export default function MessagingStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
