import React, {useContext, useState, useEffect} from 'react';
import { View, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
 import { useQuery } from "react-query";
 import { AuthContext } from '../context/AuthContext';
 import Splash from '../components/Splash';
 import ListAppointment from '../components/ListAppointment';
 import { AxiosContext } from '../context/AxiosContext';
 import { useIsFocused } from "@react-navigation/native"; 
 
 

const Appointments = () => {
  const isFocused = useIsFocused();

  const { authAxios } = useContext(AxiosContext);
  const [appointments, setAppointments]= useState([]);

  const { isLoading, refetch: getAppointments } = useQuery(
    "appointments",
    async () => {
      return await authAxios.get(`/appointments-expected-mother`,
    );
    },
    {
      enabled: false,
       retry: 1,
      onSuccess: (res) => {
        setAppointments(res?.data)

      },
      onError: (err) => {
        Alert.alert("Failure",err.message);
      },
    }
  );
  useEffect(() => {
    getAppointments();
  },[isFocused]);

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

