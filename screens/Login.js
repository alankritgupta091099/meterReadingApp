import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

const Login = ({navigation}) => {
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
          label={'Email ID'}
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {}}
        />
        
        <CustomButton label={"Login"} onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

export default Login;