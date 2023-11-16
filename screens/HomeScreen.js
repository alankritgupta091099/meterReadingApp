import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

function HomeScreen(){
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;