import { View, Image, Text, Button, StyleSheet, TextInput, Pressable, Platform, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../Home';
import { useFocusEffect } from '@react-navigation/native';


import EventList_students_select_group from '../../../../../components/profesores/Disciplines/Subjects/Grupos/event-list-s-select-grupo';

interface alumno {
    id: string;
    lastname: string;
    firstname: string;
  }
type EditGrupoAlumnosProps = NativeStackScreenProps<RootStackParamList, 'Edit_grupo_alumnos'>;
const EditGrupoAlumnosProfesoresScreen = ({ navigation, route }:EditGrupoAlumnosProps) => {
    const { subject_id,grupo_id } = route.params;        
    const [alumnos, setAlumnos] = useState<alumno[]>([])
    useFocusEffect(
        React.useCallback(() => {            
            fetchData();                
        }                
        ,[])
    );
    const fetchData = async () => {
    try {        
        const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/groups/${grupo_id}/no-students/`, {});           
        /* console.log("Fetchdata1"); */
        setAlumnos(response.data);    
        /* console.log("ALUMNOS Fuera:", response.data); */        
    } catch (error) {
        /* console.error("Error:", error);   */          
    }
    }
    
    const handleRemoveFromList = (alumno_idToRemove: string) => {
        const updatedData2 = alumnos.filter(student => student.id !== alumno_idToRemove);
        setAlumnos(updatedData2);
      };

    return (
    <View style ={styles.container}>        
        <EventList_students_select_group data2={alumnos} navigation={navigation} subject_id={subject_id} handleRemoveFromList={handleRemoveFromList} grupo_id={grupo_id}/>
    </View>
  );
};
const styles = StyleSheet.create({
    image: {
        width:'25%',
        height:'25%',
        resizeMode: 'contain',
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

export default EditGrupoAlumnosProfesoresScreen