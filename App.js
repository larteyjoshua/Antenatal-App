import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Layout from './components/Layout';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import { AxiosProvider } from './context/AxiosContext';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    
    <AuthProvider>
    <AxiosProvider>
      <SafeAreaProvider>
      <SafeAreaView  style={styles.container} >
   
    <View style={styles.container}>
     <Layout/>
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
    </SafeAreaProvider>
    </AxiosProvider>
     </AuthProvider>
    
     </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
    
  },
});
