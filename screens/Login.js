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
  Pressable 
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import LogoArea from "../components/LogoArea";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from 'react-query';
import axios from 'axios';
import Splash from "../components/Splash";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const inputWidth = windowWidth * 0.8;
const formAreaWidth = windowWidth;
const formAreaHight = windowHeight * 0.56;

const Login = ({ navigation }) => {
  const [telephone, setTelephone] = useState("");
  const [status, setStatus] = useState(false);
  const authContext = useContext(AuthContext);
 

  const {mutate: LoginFunction } = useMutation(
    async () => {
      return await axios.post('http://192.168.8.165:8000/v1/expected-mother-login', {
        'phone_number': telephone
      });
    },
    {
      onSuccess: (response) => {
        setStatus(false)
        const userId = response.data.id;
        const username = response.data.name;
        authContext.setAuthState({
        userId: userId,
        authenticated: true,
        username: username,
        loading: status,
      });

      },
      onError: (err) => {
        setStatus(false) 
        Alert.alert("Login Failed",err.message);
        authContext.setAuthState({
            userId: null,
            authenticated: false,
            username: null,
            loading: status,
          });
         
      },
    }
  );


  const onLogin = async () => {
  
    setStatus(true)
    if (telephone.length >= 10){
        LoginFunction()
}
else {
    setStatus(false)
    Alert.alert("Login Failed","Please Enter Your Phone Number");
  }
    
  };


  if(authContext.authState.loading) {
    return <Splash/>
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View  style={styles.mainPage} >
          <LogoArea />
          <Text style= {styles.wText}>Welcome Back!</Text>
          <View animation={"lightSpeedIn"} style={styles.userInputArea}>
            <View style={styles.userInput}>
              <TextInput
                placeholder="Phone Number"
                keyboardType="numeric"
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
            <Pressable style={styles.button} onPress={() => onLogin()}>
            <Text style={styles.lText}>Login</Text>
            </Pressable>
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

  mainPage: {
    backgroundColor: 'purple',
    position: 'absolute',
    height: windowHeight
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

export default Login;
