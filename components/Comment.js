import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import moment from 'moment';

const Comment = ({comment}) => {
  const dateTimeAgo = moment(new Date(comment?.dateAdded)).fromNow();

  return (
    <View>
    <View style={styles.container}>
      <Text style={styles.commentText}>{comment?.message}</Text>
    </View>
    <View  style={styles.timeStyle}>
      <Text >{dateTimeAgo}</Text>
      </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
      display: 'flex',
      justifyContent: 'flex-start',
      backgroundColor: '#FFFF',
      color: "#FFFF",
      width: screenWidth * 0.95,
      height: 'auto',
      flexWrap: 'wrap',
      borderRadius: 10,
      padding: 4,
       backgroundColor: "#E6E6FA"
      

    },
    timeStyle:{
      display: 'flex',
     alignItems: 'flex-end'

    },

    commentText: {
        fontSize: 15,
        color: '#000',
        fontStyle: 'italic',
        padding: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    commentDate: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        fontSize: 15,
        color: '#000',
        fontStyle: 'italic',
    },
   
  });

export default Comment;
