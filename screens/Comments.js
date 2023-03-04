import React, {useContext, useState, useEffect} from 'react';
import { View, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
 import Comment from '../components/Comment';
 import { useQuery } from "react-query";
 import Splash from '../components/Splash';
 import { AxiosContext } from '../context/AxiosContext';
 import { useIsFocused } from "@react-navigation/native"; 

const Comments = () => {

  const isFocused = useIsFocused();
  const { authAxios } = useContext(AxiosContext);
  const [comments, setComments]= useState([]);

  const { isLoading, refetch: getComments } = useQuery(
    "comments",
    async () => {
      return await authAxios.get(`/comments-expected-mother`,
    );
    },
    {
       enabled: false,
       retry: 1,
     
      onSuccess: (res) => {
        setComments(res?.data);

      },
      onError: (err) => {
        Alert.alert("Failure",err.message);
      },
    }
  );
  useEffect(() => {
    getComments();
  },[isFocused]);

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
