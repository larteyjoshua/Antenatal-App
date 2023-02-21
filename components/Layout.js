import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Home from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import HeaderTitle from './HeaderTitle';



const Stack = createNativeStackNavigator();

const Layout = () => {
    const authContext = useContext(AuthContext);

  return (
    <NavigationContainer >
    <Stack.Navigator >

{(authContext?.authState?.authenticated)? (
    <Stack.Group screenOptions={{ headerTitle: (prop) => <HeaderTitle {...prop} />
      }}>
    <Stack.Screen name= "Home" component={Home} />
</Stack.Group>
  ) : (
<Stack.Group screenOptions={{ headerShown: false }}>
<Stack.Screen name="Login" component={Login} />
  </Stack.Group>
  )}

    </Stack.Navigator>
    </NavigationContainer>
  );
  
}

export default Layout;
