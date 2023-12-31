import React, { useState , useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import axios from 'axios';

import { BASE_URL, GET_METER_READING } from '../util/apiRoutes';

import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import SubmitReadingModal from '../components/SubmitReadingModal';
// import ShowAlert from '../components/Alert';

import { UserContext } from '../context/userContext';

function GetMeterReading({navigation}){

    const user = useContext(UserContext);

    const [projectName, setprojectName] = useState("804");
    const [unitNo, setunitNo] = useState("01-102");
    const [customer, setcustomer] = useState("R0019");
    const [meterNo, setmeterNo] = useState("SS-10367276");

    const [displayData, setdisplayData] = useState(null);
    const [showModal, setshowModal] = useState(false);

    const resetFormData = () => {
        setprojectName("");
        setunitNo("");
        setcustomer("");
        setmeterNo("");
        setdisplayData("");
    }

    const submitGetValue = () => {
        axios.post(BASE_URL + GET_METER_READING, {
            UserID: user.UserID,
            Pwd: user.Pwd,
            ProjectName: projectName,
            UnitNo: unitNo,
            Customer: customer,
            MeterNo: meterNo
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
            {/* <ShowAlert msg={"Validation Required"} title={"Error"}  cancelAction={()=>{}}/> */}
            {
                displayData ? 
                <ScrollView>                
                    <View>
                    <Text>Transaction No.: {displayData.TransactionNo}</Text>
                    <Text>Customer: {displayData.CustomerName} ({displayData.CustCode})</Text>
                    <Text>Meter No.: {displayData.MeterNo}</Text>
                    <Text>Unit No.: {displayData.UnitNo}</Text>
                    <Text>Previous reading Date: {displayData.PreviousReadingDate}</Text>
                    <Text>Current reading Date: {displayData.CurrentReadingDate}</Text>
                    <Text>Previous reading: {displayData.PreviousReading}</Text>
                    <Text>Current reading: {displayData.CurrentReading}</Text>
                    <Text>Total Units Consumed: {displayData.TotalUnitCosumed}</Text>
                    <Text>CT Fact: {displayData.CTFact}</Text>
                    <Text>Multi Fact: {displayData.MultiFact}</Text>
                    <Text>Cycle: {displayData.Cycle}</Text>
                    <Text>Billing Month: {displayData.BillingMonth}</Text>
                    <Text>Sanction Load: {displayData.SanctionLoad}</Text>
                    <Text>Actual Load: {displayData.ActualLoad}</Text>                    
                    </View> 
                    <View style={{ marginVertical:'4%'}}>
                        <CustomButton label={'Submit'} onPress={()=>setshowModal(true)} />
                    </View>
                </ScrollView>: <></>
            }
            {
                showModal ? <SubmitReadingModal showModal={showModal} setshowModal={setshowModal} displayData={displayData}/> : <></>
            }            
        </ScrollView>
    </SafeAreaView>
    );
}

export default GetMeterReading;