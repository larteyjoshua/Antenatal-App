import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import moment from 'moment';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Appointment = ({ date, time }) => {
  const formattedTime = moment(time|| '00:00: 00 AM', "HH:mm:ss A").format("hh:mm A");
  const formattedDate = moment(date || '00/00/0000').format("dddd, MMMM Do YYYY");
  return (
    <View style={styles.appointment}>
      <Text style={styles.appointmentTitle}>Latest Antenatal Appointment</Text>
      <Text style={styles.appointmentTitle}>
        <Fontisto name="date" size={20} color="#FFFF" /> {formattedDate}
      </Text>
      <Text style={styles.appointmentTitle}>
        <MaterialIcons name="access-time" size={20} color="#FFFF" /> {formattedTime}
      </Text>
    </View>
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
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFF",
  },
});

export default Appointment;
