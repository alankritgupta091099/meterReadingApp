import React, { useState } from 'react';
import axios from 'axios';
import { SafeAreaView, View, Text } from 'react-native';

import { BASE_URL, LOGIN } from '../util/apiRoutes';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

const Login = ({route}) => {

  const { setUserID, setPwd } = route.params;

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const submitLogIn = () => {
    axios.post(BASE_URL + LOGIN, {
      UserID: user,
      Pwd: password
    })
    .then(function (res) {
      console.log(res.data.d)
      if(res.data.d.Status == "Y") { 
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