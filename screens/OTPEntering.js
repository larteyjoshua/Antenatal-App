import React, { useState, useContext, useRef  } from "react";
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
  Pressable 
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import LogoArea from "../components/LogoArea";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from 'react-query';
import axios from 'axios';
import Splash from "../components/Splash";
import { AxiosContext } from "../context/AxiosContext";

import OTPTextView from 'react-native-otp-textinput';


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const inputWidth = windowWidth * 1;
const formAreaWidth = windowWidth;
const formAreaHight = windowHeight * 0.56;
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;


const OTPEntering = ({navigation}) => {
    const [status, setStatus] = useState(false);
    const authContext = useContext(AuthContext);
    const {publicAxios} = useContext(AxiosContext);
    const [otpCode, setOtpCode] = useState('');

    const telephone = authContext?.authState?.phone_number
   
  
    const {mutate: LoginFunction } = useMutation(
      async () => {
        return await publicAxios.post('/otp/generate', 
        {
        'phone_number': '233' + telephone.slice(1),
        'code': otpCode
    });
      },
      {
        onSuccess: (response) => {
          setStatus(false)
          loginPin()
          Alert.alert("Success","A new Pin Had been sent to you as Text Message. Please wait for 5 mins if you do not receive the pin before trying again ");
  
        },
        onError: (err) => {
          setStatus(false) 
          Alert.alert("Failure",err.message);
   
        },
      }
    );

    const {mutate: loginPin } = useMutation(
        async () => {
          return await publicAxios.post('/expected-mother/reset-pin/' + telephone, 
          {
          'phone_number':  telephone,
      });
        },
        {
          onSuccess: (response) => {
            setStatus(false)
            navigation.navigate('Login')
          },
          onError: (err) => {
            setStatus(false) 
            Alert.alert("Failure",err.message);
     
          },
        }
      );
  
  
    const submitOTP = async () => {
      setStatus(true)
      if (otpCode.length === 6){
          LoginFunction()
  }
  else {
      setStatus(false)
      Alert.alert("","Please the 6 digit Code sent to you");
    }
      
    };

    const onLogin = async () => {
        navigation.navigate('Login')
      }
  
  
    if(status) {
      return <Splash/>
    }
  
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View  style={styles.mainPage} >
            <LogoArea />
            <Text style= {styles.wText}>OTP Entering!</Text>
            <View animation={"lightSpeedIn"} style={styles.userInputArea}>
              <View style={styles.userInput}>
              <OTPTextView
             handleTextChange={(newNumber) => setOtpCode(newNumber)}
             defaultValue={otpCode}
               inputCount={6} />
              </View>
              <View style={styles.loginButton}>
              <Pressable style={styles.button} onPress={() => submitOTP()}>
              <Text style={styles.lText}>Submit</Text>
              </Pressable>
              <Text style={styles.fText} onPress={() => onLogin()}>Remember Pin? Login</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
      height: 60,
    //   borderWidth: 2,
    //   borderRadius: 14,
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
  

export default OTPEntering;
