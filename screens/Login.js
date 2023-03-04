import React, { useState, useContext, useRef} from "react";
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
import Splash from "../components/Splash";
import { AxiosContext } from "../context/AxiosContext";
import { MaterialIcons } from '@expo/vector-icons'; 


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const inputWidth = windowWidth * 0.8;
const formAreaWidth = windowWidth;
const formAreaHight = windowHeight * 0.56;

const Login = ({ navigation }) => {
  const [telephone, setTelephone] = useState("");
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState(false);
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
 

  const {mutate: LoginFunction } = useMutation(
    
    async () => {
      let formData = new FormData();
    formData.append("username", telephone);
    formData.append("password", pin);
      return await publicAxios({
        method: "post",
        url: "/login",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      });
    },
    {
      onSuccess: (response) => {
        setStatus(false)
        // console.log(response.data)
        const username = response.data.name;
        const token = response.data.access_token;
        authContext.setAuthState({
        accessToken: token,
        authenticated: true,
        username: username,
        loading: status,
      });

      },
      onError: (err) => {
        setStatus(false) 
        Alert.alert("Login Failed",err.message);
        authContext.setAuthState({
            accessToken: null,
            authenticated: false,
            username: null,
            username: null,
            loading: status,
          });
         
      },
    }
  );


  const onLogin = async () => {
  
    setStatus(true)
    if (telephone.length >= 10 && pin.length >= 4){
        LoginFunction()
}
else {
    setStatus(false)
    Alert.alert("Login Failed","Please Enter Your Details Entered");
  }
    
  };

  const onForgetPassword = async () => {
    navigation.navigate('ForgetPassword')
  }

  

  if(status) {
    return <Splash/>
  }

  return (
    <ScrollView contentContainerStyle={{
      flexGrow: 1,
    }}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}

    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View  style={styles.mainPage} >
          <LogoArea />
          <Text style= {styles.wText}>Welcome Back!</Text>
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

            <View style={styles.userInput}>
              <TextInput
                placeholder="Pin"
                keyboardType="number-pad"
                autoCapitalize="none"
                style={styles.input}
                onChangeText={(newPin) => setPin(newPin)}
                defaultValue={pin}
              />
              <View style={styles.emailIcon}>
              <MaterialIcons name="person-pin-circle" size={24} color="purple" />
              </View>
            </View>
            <View style={styles.loginButton}>
            <Pressable style={styles.button} onPress={() => onLogin()}>
            <Text style={styles.lText}>Login</Text>
            </Pressable>
           
            </View>
            <Text style={styles.fText} onPress={() => onForgetPassword()}>Forget Pin?</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  wText: { marginTop: 12,
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
  marginTop: 12,
  fontSize: 20,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  color: "#FFFF"

},

  mainPage: {
    display: 'flex',
    backgroundColor: 'purple',
    position: 'absolute',
    height: windowHeight + 50
  },
 
  userInputArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 5,

  },
  userInput: {
    marginTop: 10,
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
    marginTop: 10,
   
  },
  button: {
    borderRadius: 14,
    backgroundColor: '#FFF',
    width: inputWidth,
    color: 'purple'
  },
});

export default Login;
