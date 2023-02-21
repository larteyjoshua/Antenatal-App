import React from "react";
import { View, Text, StyleSheet, Dimensions,ActivityIndicator} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Splash = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#FFFF" />
  </View>
  );

};
const styles = StyleSheet.create({
    container: {
     display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'purple',
      alignItems: 'center',
      height: windowHeight
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });
  

export default Splash;
