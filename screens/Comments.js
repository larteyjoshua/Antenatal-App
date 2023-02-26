import React, {useContext, useState, useEffect} from 'react';
import { View, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
 import Comment from '../components/Comment';
 import { useQuery } from "react-query";
 import { AuthContext } from '../context/AuthContext';
 import Splash from '../components/Splash';
 import { AxiosContext } from '../context/AxiosContext';

const Comments = () => {
  const authContext = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);
  const [comments, setComments]= useState([]);
  const userId = authContext.authState.userId;

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
