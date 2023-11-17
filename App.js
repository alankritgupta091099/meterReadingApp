import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import GetMeterReading from './screens/GetMeterReading';
import SubmitMeterReading from './screens/SubmitMeterReading';
import UserAccount from './screens/UserAccount';
import Login from './screens/Login';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  const [UserID, setUserID] = useState("");
  const [Pwd, setPwd] = useState("");
  const UserContext = createContext();

  return (
    <UserContext.Provider value={{UserID, Pwd}} >
      <NavigationContainer>
        {
          (UserID == "" || Pwd == "") ? (
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={Login}
              options={{
                title: 'Sign in',
                headerShown: false
              }}
              initialParams={{ setUserID, setPwd }}
            />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen 
              name="Check Reading" 
              component={GetMeterReading} 
              options={{
                tabBarLabel: 'View Readings',
                tabBarIcon: ({color, size}) => (
                  <MaterialCommunityIcons name="information" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen 
              name="Submit Reading" 
              component={SubmitMeterReading} 
              options={{
                tabBarLabel: 'View Readings',
                tabBarIcon: ({color, size}) => (
                  <MaterialCommunityIcons name="clipboard-list-outline" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen 
              name="Account Settings" 
              component={UserAccount} 
              options={{
                tabBarLabel: 'Account',
                tabBarIcon: ({color, size}) => (
                  <FontAwesome name="user-o" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        )
        }      
      </NavigationContainer>
    </UserContext.Provider>
  );
}


export default App;
