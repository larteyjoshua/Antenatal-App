import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ListAppointment = ({ appointment }) => {
  return (
    <View style={styles.appointment}>
      <Text style={styles.appointmentTitle}>Antenatal Appointment</Text>
      <Text style={styles.appointmentTitle}>
        <Fontisto name="date" size={20} color="#FFFF" /> {appointment?.appointed_date}
      </Text>
      <Text style={styles.appointmentTitle}>
        <MaterialIcons name="access-time" size={20} color="#FFFF" /> {appointment?.appointed_time}
      </Text>
      <Text style={styles.appointmentTitle}>
        Attended: {appointment.attended.toString()}
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
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFF",
  },
});

export default ListAppointment;
