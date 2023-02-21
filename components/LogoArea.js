import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import coverLogo from '../assets/pwoman.png';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const LogoArea = () => {
  return (
    <View style ={styles.container}>
    <View style ={styles.imageArea}>
    <Image source={coverLogo} style= {styles.coverImage} resizeMode='stretch'/>
    <Text style={styles.appName}>Antenatal Report App</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        justifyContent: 'center',
        
    },
    imageArea: {
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        width: screenWidth ,
        height: screenHeight * 0.5,
        backgroundColor: '#FFFF',
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40
    },
        coverImage: {
        marginTop: 50,
        display: 'flex',
        width: screenWidth *0.65,
        height:screenHeight * 0.3,
    },
    appName: {
        marginTop: 20,
          color: "purple",
          fontSize: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }
  });

export default LogoArea;