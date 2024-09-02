import { View, Image, Text, Button, StyleSheet, TextInput, Pressable, Platform, Touchable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Home';
import { useFocusEffect } from '@react-navigation/native';
import EventList_students_select from '../../../../components/profesores/Disciplines/Subjects/event-list-students_select';

interface alumno {
    id: string;
    lastname: string;
    firstname: string;
  }
type EditSubjectAlumnosProps = NativeStackScreenProps<RootStackParamList, 'Edit_subject_alumnos'>;
const EditSubjectAlumnosProfesoresScreen = ({ navigation, route }:EditSubjectAlumnosProps) => {
    const { subject_id } = route.params;        
    const [alumnos, setAlumnos] = useState<alumno[]>([])
    const [loading, setLoading] = useState(true);  
    useFocusEffect(
        React.useCallback(() => {            
            fetchData();                
        }                
        ,[])
    );
    const fetchData = async () => {
    try {        
        const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/no-students/`, {});           
        /* console.log("Fetchdata1"); */
        setAlumnos(response.data);    
        /* console.log("ALUMNOS Fuera:", response.data);       */  
    } catch (error) {
        /* console.error("Error:", error);     */        
    }
    finally {
        setLoading(false);
    }
    }
    
    const handleRemoveFromList = (alumno_idToRemove: string) => {
        const updatedData2 = alumnos.filter(student => student.id !== alumno_idToRemove);
        setAlumnos(updatedData2);
      };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    return (
    <View style ={styles.container}>    
        {alumnos.length === 0 ? (
        <Text style={styles.message}>No hay más alumnos en la asignatura para agregar</Text>
        ) : (
        <View style ={{marginTop:15}}>
            <EventList_students_select data2= {alumnos} navigation={navigation} subject_id={subject_id} handleRemoveFromList={handleRemoveFromList}/>
        </View>    
        )}
    </View>
  );
};
const styles = StyleSheet.create({
    image: {
        width:'25%',
        height:'25%',
        resizeMode: 'contain',
    },
    message: {
        fontSize: 18,
        color: 'gray',
    },
    form: {
        gap: 10,
        width:'60%',
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',

    },
    container: {
        alignItems: 'center',
        width: '100%',

    },
    button:{
        height:50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: '#075985'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#fff"
    },
    datePicker: {
        height: 120,
        marginTop: -10,
    },
    pickerButton: {
        paddingHorizontal: 20,
    },


});

export default EditSubjectAlumnosProfesoresScreen