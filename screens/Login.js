import React, { useState, useContext } from 'react';
import axios from 'axios';
import { SafeAreaView, View, Text } from 'react-native';
import { encode } from "base-64";

import { BASE_URL, LOGIN } from '../util/apiRoutes';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { showError, showSuccess } from '../components/Alert';
import Loader from '../components/Loader';

import { UserContext } from '../context/userContext';

const Login = () => {

  const { setUserID, setPwd } = useContext(UserContext);

  const [user, setUser] = useState("admin");
  const [password, setPassword] = useState("asg-123");
  const [loading, setLoading] = useState(false);

  const submitLogIn = () => {
    setLoading(true);
    const token = encode(`${user}:${password}`);
    axios.get(BASE_URL + LOGIN, {
      headers: {
        Authorization: `Basic ${token}`,
      }
    })
    .then(function (res) {
      if(res.data.Status == "Y") { 
        setUserID(user);
        setPwd(password);
        showSuccess('Logged in successfully.');
      } else {
        const message = res?.data?.Message || 'Invalid credentials. Please try again.';
        showError(message);
      }
    })
    .catch(function (error) {
      const message = error?.response?.data?.Message || 'Unable to login. Please check your network and try again.';
      showError(message);
    })
    .finally(() => {
      setLoading(false);
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
      <Loader visible={loading} text="Logging in..." />
    </SafeAreaView>
  );
};

export default Login;