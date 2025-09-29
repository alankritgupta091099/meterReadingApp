import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, ScrollView} from 'react-native';
import axios from 'axios';
import { BASE_URL, POST_METER_READING } from '../util/apiRoutes';
import { useAuthHeader } from '../util/tokenHelper';
import { showError, showSuccess } from '../components/Alert';

import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

var moment = require('moment'); 

const SubmitReadingModal = ({showModal, setshowModal, displayData}) => {

  const authHeader = useAuthHeader();

  const [currentReading, setcurrentReading] = useState("");

  const submitPostValue = () => {
    if(!displayData.TransactionNo || currentReading == ""){
        // error handling
        console.log("missing information")
        return;
    }
    
    axios.post(
      BASE_URL + POST_METER_READING,
      {
        TransactionNo: displayData.TransactionNo,
        CurrentReading: currentReading,
        CurrentReadingDate: moment().format('YYYY-MM-DD'),
      },
      { headers: authHeader }
    )
      .then(function (res) {
        console.log(res.data);
        if(new String(res.data.Status).valueOf() == "true") { 
            showSuccess('Reading submitted successfully.');
            setshowModal(false);
        } else {
          const message = res?.data?.Message || 'Something went wrong';
          showError(message);
          setshowModal(false);
        }
      })
      .catch(function (error) {
        console.log(error)
        const message = error?.response?.data?.Message || 'Something went wrong';
        showError(message);
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

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>Transaction No.: {displayData.TransactionNo}</Text>
                    <Text style={styles.detailText}>Customer: {displayData.CustomerName} ({displayData.CustCode})</Text>
                    <Text style={styles.detailText}>Meter No.: {displayData.MeterNo}</Text>
                    <Text style={styles.detailText}>Unit No.: {displayData.UnitNo}</Text>
                    <Text style={styles.detailText}>Previous reading Date: {displayData.PreviousReadingDate}</Text>
                    <Text style={styles.detailText}>Previous reading: {displayData.PreviousReading}</Text>
                    <Text style={styles.detailText}>Multi Fact: {displayData.MultiFact}</Text>
                    <Text style={styles.detailText}>Cycle: {displayData.Cycle}</Text>
                    <Text style={styles.detailText}>Actual Load: {displayData.ActualLoad}</Text>
                    <Text style={styles.detailText}>Current reading Date: {moment().format('YYYY-MM-DD')}</Text>
                </View>

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
  detailsContainer: {
    width: '100%',
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
});

export default SubmitReadingModal;