import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

function UserAccount(){
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>User Account Screen</Text>
            </View>
        </SafeAreaView>
    );
}

export default UserAccount;