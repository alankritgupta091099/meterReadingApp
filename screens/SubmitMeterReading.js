import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

function SubmitMeterReading(){
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Submit Meter Reading Screen</Text>
            </View>
        </SafeAreaView>
    );
}

export default SubmitMeterReading;