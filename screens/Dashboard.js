import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import Comment from "../components/Comment";
import Appointment from "../components/Appointment";
import { useQuery, useMutation } from "react-query";
import { AxiosContext } from "../context/AxiosContext";
import Splash from "../components/Splash";
import { useIsFocused } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Dashboard = () => {
  const isFocused = useIsFocused();
  const { authAxios } = useContext(AxiosContext);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [appointmentID, setAppointmentID] = useState(0);
  const [status, setStatus] = useState(false);
  const [appointmentTime, setAppointmentTime] = useState("");

  const { refetch: getAppointment } = useQuery(
    "appointment",
    async () => {
      setStatus(true);
      return await authAxios.get(`/latest-appointment-expected-mother`);
    },
    {
      onSuccess: (res) => {
        setStatus(false);
        const appointment = res.data;
        setAppointmentDate(appointment?.appointed_date);
        setAppointmentTime(appointment?.appointed_time);
        setAppointmentID(appointment?.id);
        setTimeout(() => {
          getAppointmentWithComments();
        },400)
        
      },
      onError: (err) => {
        setStatus(false);
        Alert.alert("Failure", err.message);
      },
    }
  );

  const { refetch: getAppointmentWithComments } = useQuery(
    "appointmentWithComments",
    async () => {
      setStatus(true);
      return await authAxios.get(`/appointment-expected-mother/${appointmentID}`, appointmentID);
    },
    {
      onSuccess: (res) => {
        setStatus(false);
        const message = res?.data?.map((item) => item.Comment);
        setComments(message);
      },
      onError: (err) => {
        setStatus(false);
        Alert.alert("Failure", err.message);
      },
    }
  );

  const { mutate: commentFunction } = useMutation(
    async () => {
      setStatus(true);
      const data = {
        appointment_id: appointmentID,
        message: message,
      };
      return await authAxios.post("/comment/add", data);
    },
    {
      onSuccess: (response) => {
        setStatus(false);
        Alert.alert("Successful", "Comment Added");
        getAppointmentWithComments();
      },
      onError: (err) => {
        setStatus(false);
        Alert.alert("Failure", err.message);
      },
    }
  );

  const onComment = async () => {
    if (appointmentID === undefined) {
      setStatus(false);
      Alert.alert("Failure", "You dont have any Appointment yet!");
    } else if (message.length !== 0 && appointmentID !== undefined) {
      setStatus(false);
      commentFunction();
    } else {
      setStatus(false);
      Alert.alert("Failure", "Please Enter Your Comment");
    }
  };

  useEffect(() => {
    getAppointment();
  }, [isFocused]);



  if (status) {
    return <Splash />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View animation={"lightSpeedIn"} style={styles.userInputArea}>
            <View style={styles.userInput}>
              <TextInput
                placeholder="Comment"
                keyboardType="name-phone-pad"
                autoCapitalize="none"
                style={styles.input}
                onChangeText={(newComment) => setMessage(newComment)}
                defaultValue={message}
              />
            </View>
            <View style={styles.loginButton}>
              <Pressable style={styles.button} onPress={() => onComment()}>
                <Text style={styles.lText}>Submit</Text>
              </Pressable>
            </View>
          </View>
          <Appointment date={appointmentDate} time={appointmentTime} />

          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Pressable>
              <View style={styles.commentArea}>
                {comments &&
                  comments.map((comment) => (
                    <Comment key={comment?.id} comment={comment} />
                  ))}
              </View>
            </Pressable>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  appointment: {
    marginTop: 20,
    backgroundColor: "purple",
    color: "#FFFF",
    width: screenWidth * 0.95,
    height: screenHeight * 0.2,
    backgroundColor: "purple",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  appointmentTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFF",
  },
  commentArea: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingLeft: 40,
  },
  userInputArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 20,
  },
  userInput: {
    height: 100,
    borderWidth: 2,
    borderRadius: 14,
    width: screenWidth * 0.95,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFFF",
  },
  input: {
    paddingLeft: 40,
  },

  loginButton: {
    marginTop: 20,
  },
  button: {
    borderRadius: 14,
    backgroundColor: "purple",
    width: screenWidth * 0.95,
    color: "#FFFF",
  },
  lText: {
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFF",
  },
});

export default Dashboard;
