import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import LogoArea from "../components/LogoArea";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from 'react-query';
import axios from 'axios';
import Splash from "../components/Splash";
import { AxiosContext } from "../context/AxiosContext";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const inputWidth = windowWidth * 0.8;
const formAreaWidth = windowWidth;
const formAreaHight = windowHeight * 0.56;

const ForgetPassword = ({navigation}) => {
    const [telephone, setTelephone] = useState("");
    const [status, setStatus] = useState(false);
    const authContext = useContext(AuthContext);
    const {publicAxios} = useContext(AxiosContext);
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  
   
  
    const {mutate: LoginFunction } = useMutation(
      async () => {
        return await publicAxios.post('/otp/generate', {'phone_number': '233' + telephone.slice(1)});
      },
      {
        onSuccess: (response) => {
          setStatus(false)
          Alert.alert("OTP Entering", 'please tap on OK and Enter the OTP sent to your phone as Text Message');
          navigation.navigate('OTPEntering')
          authContext.setAuthState({
           phone_number: telephone
          });
  
        },
        onError: (err) => {
          setStatus(false) 
          Alert.alert("OTP Failed",err.message);
    
        },
      }
    );
  
    const onForgetPassword = async () => {
    
      setStatus(true)
      if (telephone.length >= 10){
          LoginFunction()
  }
  else {
      setStatus(false)
      Alert.alert("Failure","Please Enter Your Phone Number");
    }
      
    };

    const onLogin = async () => {
        navigation.navigate('Login')
      }
  
  
    if(status) {
      return <Splash/>
    }
  
    return (
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
      }}>
      <Pressable>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View  style={styles.mainPage} >
            <LogoArea />
            <Text style= {styles.wText}>Pin Reset!</Text>
            <View animation={"lightSpeedIn"} style={styles.userInputArea}>
              <View style={styles.userInput}>
                <TextInput
                  placeholder="Phone Number"
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  style={styles.input}
                  onChangeText={(newNumber) => setTelephone(newNumber)}
                  defaultValue={telephone}
                />
                <View style={styles.emailIcon}>
                  <FontAwesome name="user-o" size={24} color="purple" />
                </View>
              </View>
              <View style={styles.loginButton}>
              <Pressable style={styles.button} onPress={() => onForgetPassword()}>
              <Text style={styles.lText}>Reset Pin</Text>
              </Pressable>
              <Text style={styles.fText} onPress={() => onLogin()}>Remember Pin? Login</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </Pressable>
    </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    wText: { marginTop: 20,
            fontSize: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: "#FFF"
  
    },
  
    lText: {
      fontSize: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: "purple"
  
  },

  fText: {
    marginTop: 20,
    fontSize: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    color: "#FFFF"
  
  },
  
    mainPage: {
      backgroundColor: 'purple',
      position: 'absolute',
      height: windowHeight + 50
    },
   
    userInputArea: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginTop: 20,
  
    },
    userInput: {
      height: 40,
      borderWidth: 2,
      borderRadius: 14,
      width: inputWidth,
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: "#FFFF",
    },
  
    formArea: {
      width: formAreaWidth,
      height: formAreaHight,
      display: "flex",
      backgroundColor: "purple",
      justifyContent: "center",
      textAlign: "center",
      backgroundColor: 'purple'
    },
  
    emailIcon: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      alignContent: "flex-end",
      position: "absolute",
      paddingLeft: 10,
    },
  
    input: {
      paddingLeft: 40,
    },
  
    loginButton: {
      marginTop: 20,
     
    },
    button: {
      borderRadius: 14,
      backgroundColor: '#FFF',
      width: inputWidth,
      color: 'purple'
    },
  });
  

export default ForgetPassword;
