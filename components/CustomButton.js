import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({label, onPress, bgColor}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: bgColor ? bgColor : '#AD40AF',
        padding: 10,
        borderRadius: 6,
        marginHorizontal: 7,
        marginBottom: 15,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}