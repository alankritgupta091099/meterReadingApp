import React, { useState, useContext } from 'react';
import axios from 'axios';
import { SafeAreaView, View, Text } from 'react-native';
import { encode } from "base-64";

import { BASE_URL, LOGIN } from '../util/apiRoutes';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

import { UserContext } from '../context/userContext';

const Login = () => {

  const { setUserID, setPwd } = useContext(UserContext);

  const [user, setUser] = useState("admin");
  const [password, setPassword] = useState("asg-123");

  const submitLogIn = () => {
    const token = encode(`${user}:${password}`);
    console.log(token);
    axios.get(BASE_URL + LOGIN, {
      headers: {
        Authorization: `Basic ${token}`,
      }
    })
    .then(function (res) {
      if(res.data.Status == "Y") { 
        setUserID(user);
        setPwd(password);
      } else {
        // show error notification
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          label={'User ID'}
          keyboardType="email-address"
          onChangeText={(val)=>setUser(val)}
        />

        <InputField
          label={'Password'}
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          onChangeText={(val)=>setPassword(val)}
        />
        
        <CustomButton 
          label={"Login"} 
          onPress={submitLogIn} 
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;