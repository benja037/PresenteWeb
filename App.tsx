import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import Home from './app/screens/Home'
import Login from './app/screens/Login'
import Register from './app/screens/Register'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MustChooseStudentProfileApoderadosScreen from './app/screens/apoderados/Student/Choose_student_must';
import AddStudentProfileApoderadosScreen from './app/screens/apoderados/Student/Add_student';
import CheckRutProfileApoderadosScreen from './app/screens/apoderados/Student/Check_rut';





const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <AuthProvider>
      <Layout/>      
    </AuthProvider>
  );
}

export const Layout = () => {  
  const { authState, selectedProfile, onLogout } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {!authState?.authenticated ? (
          <>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
          </>
        ) : authState.user_type === 'apoderado' && !selectedProfile ? (
          <>
          <Stack.Screen name='Choose_student' component={MustChooseStudentProfileApoderadosScreen} options ={{contentStyle: { backgroundColor: '#fff' }}}/>
          <Stack.Screen name='Add_student_apoderado' component={AddStudentProfileApoderadosScreen} options ={{contentStyle: { backgroundColor: '#fff' }}}/>
          <Stack.Screen name='Check_rut' component={CheckRutProfileApoderadosScreen} options ={{contentStyle: { backgroundColor: '#fff' }}} />
          </>

          
        ) : (
          <Stack.Screen 
            name="Home" 
            component={Home}
            options={{
              headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};