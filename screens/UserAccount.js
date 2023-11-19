import React, { useContext } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
                <FontAwesome name="user-circle-o" size={60} color={'grey'} />
                <Text style={{marginTop: 10, marginBottom:40}}>User ID: {user.UserID}</Text>
                <CustomButton 
                    label={"Logout"} 
                    onPress={logout} 
                />
            </View>
        </SafeAreaView>
    );
}

export default UserAccount;