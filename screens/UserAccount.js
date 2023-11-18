import React, { useContext } from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import { UserContext } from '../context/userContext';

import CustomButton from '../components/CustomButton';

function UserAccount(){

    const user = useContext(UserContext);

    const logout = async () => {
        user.setUserID("");
        user.setPwd("");
    }
    
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>User Account Screen</Text>
                <CustomButton 
                    label={"Logout"} 
                    onPress={logout} 
                />
            </View>
        </SafeAreaView>
    );
}

export default UserAccount;