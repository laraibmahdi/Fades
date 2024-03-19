import * as React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Home from './screens/Home';
import Appointment from './screens/Appointment';
import Account from './screens/Account';
import Settings from './screens/Settings';

// Screen names
const homeName = "Home";
const appointmentName = "Appointment";
const accountName = "Account";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === appointmentName) {
            iconName = focused ? 'list' : 'list-outline';

          } else if (rn === settingsName) {
            iconName = focused ? 'settings' : 'settings-outline';

          } else if (rn === accountName) {
              iconName = focused ? 'person' : 'person-outline';
          } 
          color = focused ? 'tomato' : 'gray';
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color = {color} />;
        },
      })}>

      <Tab.Screen name={homeName} component={Home} options={{
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color: focused ? 'tomato' : 'gray' }}>Home</Text>
        ),
      }}/>
      <Tab.Screen name={appointmentName} component={Appointment} options={{
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color: focused ? 'tomato' : 'gray' }}>Appointment</Text>
        ),
      }}/>
      <Tab.Screen name={accountName} component={Account} options={{
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color: focused ? 'tomato' : 'gray' }}>Account</Text>
        ),
      }}/>
      <Tab.Screen name={settingsName} component={Settings} options={{
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color: focused ? 'tomato' : 'gray' }}>Settings</Text>
        ),
      }}/>

    </Tab.Navigator>
  );
}

export default MainContainer;
