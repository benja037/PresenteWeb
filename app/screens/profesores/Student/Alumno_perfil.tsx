import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Home";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import { ScrollView,Text,Button, View,StyleSheet } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";


type DetailAlumnoProps = NativeStackScreenProps<RootStackParamList,'Alumno_perfil'>;

const AlumnoDetailProfesoresScreen: React.FC<DetailAlumnoProps> = ({navigation,route}) => {  
    const { alumno_id } = route.params;
    const [date_of_birth,setDate_of_birth] =useState('')
    const [firstname,setFirstname] =useState('')
    const [lastname,setLastname] =useState('')
    const [gender,setGender] =useState('')
    const [phone_number,setPhone_number] =useState('')
    const [document_type,setDocument_number] =useState('')
    const [document_number,setDocument_type] =useState('')
    useFocusEffect(
        React.useCallback(() => {            
        fetchData()                  
        fetchData2()                  
    },[])
    );

    const fetchData = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/students/${alumno_id}/`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            /* console.log("ALUMNO_RETRIEVE",response.data) */
            setDate_of_birth(response.data.date_of_birth)
            setFirstname(response.data.firstname)
            setLastname(response.data.lastname)
            setGender(response.data.gender)
            setPhone_number(response.data.phone_number)
            setDocument_number(response.data.document_number)
            setDocument_type(response.data.document_type)
           
        } catch (error) {
            /* console.error("Error:", error); */
            
        }
       
    }
    const fetchData2 = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/students/${alumno_id}/`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            /* console.log("ALUMNO_RETRIEVE",response.data) */
            setDate_of_birth(response.data.date_of_birth)
            setFirstname(response.data.firstname)
            setLastname(response.data.lastname)
            setGender(response.data.gender)
           
        } catch (error) {
            /* console.error("Error:", error); */
            
        }
       
    }
    return ( 
        <View style={{flex:1,alignItems:'center'}}>
            <View style={styles2.headerInfo}>
                <Text>ID: {alumno_id}</Text>           
                <Text>Nombre: {firstname}</Text>           
                <Text>Apellido: {lastname}</Text>           
                <Text>Fecha de Nacimiento: {date_of_birth}</Text>
                <Text>Género: {gender}</Text>
                <Text>Phone_number: {phone_number}</Text>
                <Text>Document_type: {document_type}</Text>
                <Text>Document_number: {document_number}</Text>            
            </View>
        </View>
        
        
    );
}
export default AlumnoDetailProfesoresScreen;

const styles2 = StyleSheet.create({
    headerInfo: {
        marginBottom: 10,
        marginTop:10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width:'90%'
    
    },
    headerText: {
        fontSize: 18,
        color: '#333',
    },
}
);