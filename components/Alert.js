import React from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';

export default function ShowAlert ({
    title,
    msg,
    cancelAction
}) {
  return (Alert.alert(
    {title},
    {msg},
    [
      {
        text: 'Cancel',
        onPress: {cancelAction},
        style: 'cancel',
      },
    ]
  ));
}