import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen'
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
            <Tab.Screen name="Home" component={HomeScreen} />
          </Tab.Navigator>
        )
        }      
      </NavigationContainer>
    </UserContext.Provider>
  );
}


export default App;
