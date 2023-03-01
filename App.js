import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Layout from './components/Layout';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import { AxiosProvider } from './context/AxiosContext';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true
    }
  }
});
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    
    <AuthProvider>
    <AxiosProvider>
      <SafeAreaProvider>
      <View  style={styles.container} >
     <Layout/>
      <StatusBar style="auto" />
    </View>
    </SafeAreaProvider>
    </AxiosProvider>
     </AuthProvider>
     </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    
    
  },
});
