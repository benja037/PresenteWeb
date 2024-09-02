import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../Home";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import { ScrollView,Text,Button, View,StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";


type DetailAlumnoProps = NativeStackScreenProps<RootStackParamList,'Alumno_perfil_subject'>;

const AlumnoDetailSubjectProfesoresScreen: React.FC<DetailAlumnoProps> = ({navigation,route}) => {  
    const { alumno_id,subject_id } = route.params;
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
           /*  console.error("Error:", error); */
            
        }
       
    }
    
    const go_off_student = async () => {
        // Antes de eliminar, pedir confirmación al usuario
        Alert.alert(
            'Confirmar eliminación',
            '¿Estás seguro que quieres remover el estudiante?',
            [
                {
                    text: 'Cancelar',
                    /* onPress: () => console.log('Cancelado'), */
                    style: 'cancel',
                },
                {
                    text: 'Sí',
                    onPress: async () => {    
                        try {                    
                            const response = await axios.delete(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/students/${alumno_id}/`)
                            navigation.goBack()
                        } catch(error) {
                           /*  console.error("Errors:", error);   */    
                               
                        }
                },
                },
            ],
            { cancelable: false }
        );
    };
    return ( 
        <View style={{flex:1,alignItems:'center'}}>
            <View style={styles.headerInfo}>
                <Text>ID: {alumno_id}</Text>           
                <Text>Nombre: {firstname}</Text>           
                <Text>Apellido: {lastname}</Text>           
                <Text>Fecha de Nacimiento: {date_of_birth}</Text>
                <Text>Género: {gender}</Text>
                <Text>Phone_number: {phone_number}</Text>
                <Text>Document_type: {document_type}</Text>
                <Text>Document_number: {document_number}</Text>            
            </View>
            <View style={styles.buttonContainer}>        
                <TouchableOpacity onPress={go_off_student} style={styles.deleteButton}>
                    <Text style={styles.buttonText2}>Remover de la asignatura</Text>
                </TouchableOpacity> 
            </View>
        </View>
        
    );
}
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',// Ajusta el margen según sea necesario
        width:150
    },
    headerInfo: {
        marginBottom: 10,
        marginTop:10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width:'90%'
    
    },
    onlyinputContainer: {
        flexDirection: 'column',
        alignItems: 'center',// Ajusta el margen según sea necesario
        width:150,        
        marginLeft:50
    },
    image: {
        width:'25%',
        height:'25%',
        resizeMode: 'contain',
    },
    form: {
        gap: 10,
        width:'60%',
    },
    placeholderText: {
        width:100,
        marginRight: 10, // Ajusta el margen según sea necesario
        fontSize: 16, // Ajusta el tamaño de fuente según sea necesario
        color: '#333', // Ajusta el color del texto según sea necesario
    },
    input: {        
        height: 40, // Ajusta la altura según sea necesario
        width:250,
        borderColor: '#ccc', // Ajusta el color del borde según sea necesario
        borderWidth: 1, // Ajusta el grosor del borde según sea necesario
        borderRadius: 5, // Ajusta el radio del borde según sea necesario
        paddingHorizontal: 10, // Ajusta el relleno según sea necesario
    },
    container: {
        alignItems: 'flex-start',
        flex: 1,
        justifyContent: 'space-between', // Alinea los elementos de manera uniforme verticalmente
        paddingHorizontal: 20, // Espacio horizontal en los lados de la pantalla
        paddingBottom: 20, // Espacio inferior

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
    checkbox: {
        margin: 8,
    },
    buttonContainer: {
        alignItems: 'center', // Alinea los elementos al centro horizontalmente
        marginBottom:250
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop:5
    },
    buttonText2: {
        color: 'white',
        fontWeight: 'bold',
    },


});
export default AlumnoDetailSubjectProfesoresScreen;