import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import { useAuth } from '../context/AuthContext';

import DisciplinesApoderadosScreen from './apoderados/Disciplines/Disciplines';
import SubjectsApoderadosScreen from './apoderados/Disciplines/Subjects/Subjects';
import SubjectDetailApoderadosScreen from './apoderados/Disciplines/Subjects/Subjects_detail';
import ClaseDetailApoderadosScreen from './apoderados/Disciplines/Subjects/Clases/Clase_detail';


import SubjectsProfesoresScreen from './profesores/Disciplines/Subjects/Subjects';
import SubjectDetailProfesoresScreen from './profesores/Disciplines/Subjects/Subjects_detail';
import ClaseDetailProfesoresScreen from './profesores/Disciplines/Subjects/Clases/Clase_detail';
import AlumnoDetailProfesoresScreen from './profesores/Student/Alumno_perfil';
import GrupoDetailProfesoresScreen from './profesores/Disciplines/Subjects/Grupos/Grupo_detail';
import DisciplinesProfesoresScreen from './profesores/Disciplines/Disciplines';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import ConfigSubjectProfesoresScreen from './profesores/Disciplines/Subjects/Subject_config';
import AddSubjectProfesoresScreen from './profesores/Disciplines/Subjects/Add_subject';
import EditSubjectAlumnosProfesoresScreen from './profesores/Disciplines/Subjects/Add_subject_alumnos';
import AddGrupoProfesoresScreen from './profesores/Disciplines/Subjects/Grupos/Add_grupo';
import AddClaseProfesoresScreen from './profesores/Disciplines/Subjects/Clases/Add_clase';

import StudentsConfigProfesoresScreen from './profesores/Student/Students';
import AddStudentProfesoresScreen from './profesores/Student/Add_student';
import AlumnoDetailSubjectProfesoresScreen from './profesores/Disciplines/Subjects/Alumno_perfil_subject';
import AlumnoDetailClaseProfesoresScreen from './profesores/Disciplines/Subjects/Clases/Alumno_perfil_clase';
import EditClaseAlumnosProfesoresScreen from './profesores/Disciplines/Subjects/Clases/Add_clase_alumnos';
import ConfigClaseProfesoresScreen from './profesores/Disciplines/Subjects/Clases/Clase_config';
import EditGrupoAlumnosProfesoresScreen from './profesores/Disciplines/Subjects/Grupos/Add_grupo_alumnos';
import SubjectInformeProfesoresScreen from './profesores/Disciplines/Subjects/Informe/Informe';
import AddStudentProfileApoderadosScreen from './apoderados/Student/Add_student';


import * as SecureStore from 'expo-secure-store'
import RequestSubjectProfesoresScreen from './profesores/Disciplines/Subjects/Request/Request_subject';
import GrupoSubjectProfesoresScreen from './profesores/Disciplines/Subjects/Grupos/Grupo_subject';
import RequestClassProfesoresScreen from './profesores/Disciplines/Subjects/Clases/Request_class';
import AlumnoDetailGrupoProfesoresScreen from './profesores/Disciplines/Subjects/Grupos/Alumno_perfil_grupo';




export type RootStackParamList = {
  'Disciplines':any;
  'Add_discipline':any;
  'Subjects': {discipline_id:string,discipline_name:string;};
  'Subject_informe': {subject_id:string};
  'Add_subject':{discipline_id:string}; 
  'Subjects_detail':{subject_id:string}; 
  'Subject_config':{subject_id:string,subject_name:string,num_max_alumnos:string,mode:string,isfinished:boolean};
  'Edit_subject_alumnos':{subject_id:string};
  'Edit_clase_alumnos':{subject_id:string,clase_id:string};
  'Edit_grupo_alumnos':{grupo_id:string,subject_id:string};
  'Alumno_perfil':{alumno_id:string}
  'Alumno_perfil_subject':{alumno_id:string,subject_id:string}
  'Alumno_perfil_clase':{alumno_id:string,subject_id:string,clase_id:string}
  'Alumno_perfil_grupo':{alumno_id:string,subject_id:string,grupo_id:string}
  'Grupo_detail':{subject_id:string,grupo_id:string}
  'Add_grupo':{subject_id:string}
  'Clase_detail':{clase_id:string,subject_id:string}
  'Clase_config':{subject_id:string,clase_id:string,num_max_alumnos:string,mode:string,state:string,date:string,time_start:string,time_end:string,label:string};
  'Add_clase':{subject_id:string}  
  'Profile':{}
  'Students':any;
  'Add_student_apoderado':{document_type:string,document_number:string};
  'Add_student_profesor':any;
  'Check_rut':any;
  'Choose_student':any;
  'Requests_subject':{subject_id:string};
  'Requests_class':{clase_id:string,subject_id:string};
  'Grupo_subject':{subject_id:string};
};
const Stack2 = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();


const ProfesorStack = () => {  
  return (
  <Stack2.Navigator
    screenOptions={{headerStyle:{backgroundColor:'#012677'},
    headerBackTitleVisible:false,
    headerTitleStyle:{
      color: '#fff',
      fontWeight: '600',
    },
    headerTintColor:'blue',     // Define el color de fondo de la pantalla
    }}>
    
    <Stack2.Screen name='Disciplines' component={DisciplinesProfesoresScreen} options ={{headerTitle: 'Disciplinas',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    <Stack2.Screen name='Subjects' component={SubjectsProfesoresScreen} options ={{headerTitle: 'Asignaturas',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    <Stack2.Screen name='Add_subject' component={AddSubjectProfesoresScreen} options ={{headerTitle: 'Añadir Asignatura',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    <Stack2.Screen name='Subjects_detail' component={SubjectDetailProfesoresScreen} options ={{headerTitle: 'Asignatura',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    <Stack2.Screen name='Subject_informe' component={SubjectInformeProfesoresScreen} options ={{headerTitle: 'Informe Asignatura',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    <Stack2.Screen name='Subject_config' component={ConfigSubjectProfesoresScreen} options ={{headerTitle: 'Configurar Asistencia',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    <Stack2.Screen name='Grupo_detail' component={GrupoDetailProfesoresScreen} options ={{headerTitle: 'Grupo',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    <Stack2.Screen name='Requests_subject' component={RequestSubjectProfesoresScreen} options ={{headerTitle: 'Solicitudes Asignatura',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    <Stack2.Screen name='Requests_class' component={RequestClassProfesoresScreen} options ={{headerTitle: 'Solicitudes Clase',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    <Stack2.Screen name='Grupo_subject' component={GrupoSubjectProfesoresScreen} options ={{headerTitle: 'Grupos de la Asignatura',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    <Stack2.Screen name='Alumno_perfil' component={AlumnoDetailProfesoresScreen}  options ={{headerTitle: 'Perfil Estudiante',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>  
    <Stack2.Screen name='Alumno_perfil_subject' component={AlumnoDetailSubjectProfesoresScreen}  options ={{headerTitle: 'Perfil Estudiante',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>  
    <Stack2.Screen name='Alumno_perfil_clase' component={AlumnoDetailClaseProfesoresScreen} options ={{headerTitle: 'Perfil Estudiante',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>  
    <Stack2.Screen name='Alumno_perfil_grupo' component={AlumnoDetailGrupoProfesoresScreen} options ={{headerTitle: 'Perfil Estudiante',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>  
    <Stack2.Screen name='Edit_subject_alumnos' component={EditSubjectAlumnosProfesoresScreen} options ={{headerTitle: 'Estudiantes Asignatura',contentStyle: { backgroundColor: '#fff' }}} ></Stack2.Screen>  
    <Stack2.Screen name='Edit_clase_alumnos' component={EditClaseAlumnosProfesoresScreen} options ={{headerTitle: 'Estudiantes Clase',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>  
    <Stack2.Screen name='Edit_grupo_alumnos' component={EditGrupoAlumnosProfesoresScreen} options ={{headerTitle: 'Estudiantes Grupo',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>  
    <Stack2.Screen name='Add_grupo' component={AddGrupoProfesoresScreen} options ={{headerTitle: 'Añadir Grupo',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>  
    <Stack2.Screen name='Clase_detail' component={ClaseDetailProfesoresScreen} options ={{headerTitle: 'Clase',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    <Stack2.Screen name='Clase_config' component={ConfigClaseProfesoresScreen} options ={{headerTitle: 'Configurar Clase',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    <Stack2.Screen name='Add_clase' component={AddClaseProfesoresScreen} options ={{headerTitle: 'Añadir clase',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    <Stack2.Screen name='Profile' component={Profile} options ={{headerTitle: 'Cuenta',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    <Stack2.Screen name='Students' component={StudentsConfigProfesoresScreen} options ={{headerTitle: 'Estudiantes',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    <Stack2.Screen name='Add_student_profesor' component={AddStudentProfesoresScreen} options ={{headerTitle: 'Agregar Estudiante',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
    
     
    
  </Stack2.Navigator>

  )};
  

const ApoderadoStack = () => {  
  
  return (
    <Stack2.Navigator
      screenOptions={{headerStyle:{backgroundColor:'#012677'},
      headerBackTitleVisible:false,
      headerTitleStyle:{
        color: '#fff',
        fontWeight: '600',
      },
      headerTintColor:'blue',
      }}>
        
      <Stack2.Screen name='Disciplines' component={DisciplinesApoderadosScreen} options ={{headerTitle: 'Disciplinas',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
      <Stack2.Screen name='Subjects' component={SubjectsApoderadosScreen} options ={{headerTitle: 'Asignaturas',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
      <Stack2.Screen name='Subjects_detail' component={SubjectDetailApoderadosScreen} options ={{headerTitle: 'Asignatura',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
      <Stack2.Screen name='Clase_detail' component={ClaseDetailApoderadosScreen} options ={{headerTitle: 'Clase',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>
      <Stack2.Screen name='Profile' component={Profile} options ={{headerTitle: 'Cuenta',contentStyle: { backgroundColor: '#fff' }}}></Stack2.Screen>      
         
        
    </Stack2.Navigator>
    
  )};


  const CustomDrawerContent = ({ navigation }: { navigation: any }) => {   
    const { onLogout,authState,selectProfile } = useAuth();
    
    const handleLogout = () => {
  
      try {
        if (onLogout){    
          onLogout(); // Intenta llamar a onLogout
        }
      } catch (error) {
        /* console.error('Error al cerrar sesión:', error); */ // Maneja cualquier error que ocurra durante el cierre de sesión
      }
    };
    const handleNavigation = (screenName: keyof RootStackParamList) => {
      navigation.navigate(screenName); // Navega a la pantalla especificada
    };
    const handleChangeProfile = () => {
      try {
          SecureStore.deleteItemAsync('selected_profile');
          if (selectProfile) {
              selectProfile(null); // Permitir null              
          }
      } catch (error) {
          /* console.error('Error al cambiar de perfil:', error); */ // Maneja cualquier error que ocurra durante el cambio de perfil
      }
  };
    
    
    return (
      <DrawerContentScrollView>
        {/* Aquí puedes personalizar el contenido del Drawer */}
        <View style={{ backgroundColor: 'green', paddingVertical: 20 }}>
        <DrawerItem
            label="Home"
            onPress={() => handleNavigation('Disciplines')}
          />
          <DrawerItem
            label="Perfil"
            onPress={() => handleNavigation('Profile')}
          />
          {authState && (authState.user_type === 'profesor' || authState.user_type === 'admin') && (
          <DrawerItem
              label="Estudiantes"
              onPress={() => handleNavigation('Students')}
            />
          )}
          {authState && (authState.user_type === 'apoderado') && (
          <DrawerItem
              label="Cambiar Estudiante"
              onPress={handleChangeProfile}
            />
          )}
          <DrawerItem
            label="Cerrar Sesión"
            onPress={handleLogout}
          />
          {/* Agrega más elementos del Drawer según sea necesario */}

        </View>
      </DrawerContentScrollView>
    );
  };

const Home = () => {
  const navigation = useNavigation(); 
  const { authState,selectedProfile } = useAuth();
  return (
    <Drawer.Navigator   drawerContent={(props) => <CustomDrawerContent navigation={navigation}  />} screenOptions={{
      drawerStyle: {
        backgroundColor: 'fff',
        width: 240,
      },
      swipeEnabled:false,
      
    }}>
      {authState && (authState.user_type === 'profesor' || authState.user_type === 'admin') && (
        <Drawer.Screen name="Profesor" component={ProfesorStack} options={{
          headerStyle: {
            backgroundColor: '#012677', // Cambia el color de fondo del header
          }
        }}/>
      )}      
      {authState && authState.user_type === 'apoderado' && (
        <Drawer.Screen name="Apoderado" component={ApoderadoStack} options={{
          headerStyle: {
            backgroundColor: '#012677', // Cambia el color de fondo del header
          },
          headerTitle: `Perfil: ${selectedProfile?.firstname ?? 'Seleccionado'}`, // Aquí mostramos el perfil seleccionado
          headerTitleStyle: {
            color: 'green', // Cambia el color del texto del header
          }
        }}/>
      )}
    </Drawer.Navigator>
     
    
  )}

export default Home