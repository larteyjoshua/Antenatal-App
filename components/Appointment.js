import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Appointment = ({ date, time }) => {
  return (
    <View style={styles.appointment}>
      <Text style={styles.appointmentTitle}>Latest Antenatal Appointment</Text>
      <Text style={styles.appointmentTitle}>
        <Fontisto name="date" size={20} color="#FFFF" /> {date}
      </Text>
      <Text style={styles.appointmentTitle}>
        <MaterialIcons name="access-time" size={20} color="#FFFF" /> {time}
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
