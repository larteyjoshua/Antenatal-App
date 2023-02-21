import React, {useContext, useState, useEffect} from 'react';
import { View, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
 import Comment from '../components/Comment';
 import { useQuery } from "react-query";
 import { AuthContext } from '../context/AuthContext';
 import axios from 'axios';
 import Splash from '../components/Splash';

const Comments = () => {
  const authContext = useContext(AuthContext);
  const [comments, setComments]= useState([]);
  const userId = authContext.authState.userId;

  const { isLoading, refetch: getComments } = useQuery(
    "comments",
    async () => {
      return await axios.get(`http://192.168.8.165:8000/v1/comments-expected-mother/${userId}`,
    );
    },
    {
       enabled: false,
       retry: 1,
     
      onSuccess: (res) => {
        setComments(res.data);

      },
      onError: (err) => {
        Alert.alert("Failure",err.message);
      },
    }
  );
  useEffect(() => {
    getComments();
  },[]);

  if(isLoading) {
    return <Splash/>
  };

  return (
    <View style={styles.container}>
     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <Pressable>
    <View style= {styles.commentArea}>
    {comments && comments.map(comment =>
                        
                        <Comment  key = {comment.id} comment={comment} />
                         )}
        </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    commentArea: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
   
  });

export default Comments;
