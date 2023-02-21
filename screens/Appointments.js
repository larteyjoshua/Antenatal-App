import React, {useContext, useState, useEffect} from 'react';
import { View, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
 import { useQuery } from "react-query";
 import { AuthContext } from '../context/AuthContext';
 import axios from 'axios';
 import Splash from '../components/Splash';
 import ListAppointment from '../components/ListAppointment';
 

const Appointments = () => {

  const authContext = useContext(AuthContext);
  const [appointments, setAppointments]= useState([]);
  const userId = authContext.authState.userId;

  const { isLoading, refetch: getAppointments } = useQuery(
    "appointments",
    async () => {
      return await axios.get(`http://192.168.8.165:8000/v1/appointments-expected-mother/${userId}`,
    );
    },
    {
      enabled: false,
       retry: 1,
      onSuccess: (res) => {
        setAppointments(res.data)

      },
      onError: (err) => {
        Alert.alert("Failure",err.message);
      },
    }
  );
  useEffect(() => {
    getAppointments();
  },[]);

  if(isLoading) {
    return <Splash/>
  };

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
   <Pressable>
   <View style= {styles.commentArea}>
   {appointments && appointments.map(appointment =>
                        
                        <ListAppointment  key = {appointment.id} appointment={appointment} />
                         )}
       </View>
       </Pressable>
     </ScrollView>
   </View>
    
  );
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  commentArea: {
      marginTop: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  }});

export default Appointments;

