import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen'
import Login from './screens/Login';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  const [userToken, setUserToken] = React.useState(null);

  return (
    <NavigationContainer>
      {
        userToken == null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={Login}
            options={{
              title: 'Sign in',
            }}
            initialParams={{ setUserToken }}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
      )
      }      
    </NavigationContainer>
  );
}


export default App;
