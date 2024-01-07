import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, Text, Pressable, View} from 'react-native';

import { BASE_URL, POST_METER_READING } from '../util/apiRoutes';

import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

import { UserContext } from '../context/userContext';

var moment = require('moment'); 

const SubmitReadingModal = ({showModal, setshowModal, displayData}) => {

  const user = useContext(UserContext);

  const [currentReading, setcurrentReading] = useState("");

  const submitPostValue = () => {
    if(!displayData.TransactionNo || !displayData.PreviousReadingDate || currentReading == ""){
        // error handling
        console.log("missing information")
        return;
    }
    
    axios.post(BASE_URL + POST_METER_READING, {
        UserID: user.UserID,
        Pwd: user.Pwd,
        TransationNo:displayData.TransactionNo,
        PreviousReading: displayData.PreviousReading,
        CurrentReading: currentReading,
        PreviousReadingDate: displayData.PreviousReadingDate,
        CurrentReadingDate: moment().format('YYYY-MM-DD'),
        BillingMonth: moment().month(),
        FileName:"",
        ImgByte:""
      })
      .then(function (res) {
        if(new String(res.data.d.Status).valueOf() == "true") { 
            setdisplayData(res.data.d);
        } else {
          // show error notification
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setshowModal(!showModal);
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
                <Text
                style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 28,
                    fontWeight: '500',
                    color: '#333',
                    marginVertical: 30,
                }}>
                Submit Meter Reading
                </Text>

                <InputField label={'Current Reading * '} keyboardType={'numeric'} onChangeText={(val)=>setcurrentReading(val)} />
                <View  style={styles.buttonContainer}>
                    <CustomButton label={'Confirm Submit'} onPress={()=>submitPostValue()} />
                    <CustomButton bgColor={'#A8A9A8'} label={'Close'} onPress={()=>{setshowModal(false)}} />
                </View>                
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setshowModal(true)}>
        <Text style={styles.textStyle}>Close</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalBackground: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for the desired transparency
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1, 
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default SubmitReadingModal;