import React, { useState , useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import { BASE_URL, GET_METER_READING } from '../util/apiRoutes';
import { useAuthHeader } from '../util/tokenHelper';

import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import SubmitReadingModal from '../components/SubmitReadingModal';
import Loader from '../components/Loader';
import { showWarning, showError } from '../components/Alert';

import { UserContext } from '../context/userContext';

function GetMeterReading({navigation}){

    const user = useContext(UserContext);
    const authHeader = useAuthHeader();
    const [projectName, setprojectName] = useState("805");
    const [unitNo, setunitNo] = useState("01-501");
    const [customer, setcustomer] = useState("A0042");
    const [meterNo, setmeterNo] = useState("UPB-51961");

    const [displayData, setdisplayData] = useState(null);
    const [showModal, setshowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const resetFormData = () => {
        setprojectName("");
        setunitNo("");
        setcustomer("");
        setmeterNo("");
        setdisplayData("");
    }

    const submitGetValue = () => {
        setLoading(true);
        axios.get(BASE_URL + GET_METER_READING, {
            headers: authHeader,
            params: {
                ProjectName: projectName,
                UnitNo: unitNo,
                Customer: customer,
                MeterNo: meterNo
            }
          })
          .then(function (res) {
            console.log(res.data);
            if(new String(res.data.Status).valueOf() == "true") { 
                setdisplayData(res.data);
                setshowModal(true);
            } else {
                showWarning(res.data.Message);
            }
          })
          .catch(function (error) {
            const message = error?.data?.Message || 'Something went wrong';
            showError(message);
          })
          .finally(() => {
            setLoading(false);
          });
    }
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{paddingHorizontal: 25}}>
            <View>
                <Text
                style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 28,
                    fontWeight: '500',
                    color: '#333',
                    marginVertical: 30,
                }}>
                Get Meter Reading
                </Text>

                <InputField label={'Project Name * '} onChangeText={(val)=>setprojectName(val)} />

                <InputField label={'Unit No. * '} onChangeText={(val)=>setunitNo(val)}/>

                <InputField label={'Customer * '} onChangeText={(val)=>setcustomer(val)}/>

                <InputField label={'Meter No. * '} onChangeText={(val)=>setmeterNo(val)}/>
                
                <CustomButton label={displayData ? 'Reset' : 'Get value'} onPress={()=>{ displayData ? resetFormData() : submitGetValue() }} />
            </View>
            {
                showModal ? <SubmitReadingModal showModal={showModal} setshowModal={setshowModal} displayData={displayData}/> : <></>
            }            
        </ScrollView>
        <Loader visible={loading} text="Fetching meter reading..." />
    </SafeAreaView>
    );
}

export default GetMeterReading;