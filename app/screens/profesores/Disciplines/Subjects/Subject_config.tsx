import { View, Image, Text, Button, StyleSheet, TextInput, Pressable, Platform, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Home';
import Checkbox from 'expo-checkbox';
import {Picker} from '@react-native-picker/picker';

type SubjectProps = NativeStackScreenProps<RootStackParamList, 'Subject_config'>;
const ConfigSubjectProfesoresScreen = ({ navigation, route }:SubjectProps) => {
    const {subject_id,subject_name,num_max_alumnos,mode,isfinished} = route.params;
    const [newSubject_name, setNewSubject_name] = useState(subject_name);  
    const [newNum_max_alumnos,setNewNum_max_alumnos] = useState(num_max_alumnos.toString())
    const [newMode,setNewMode] = useState(mode)
    const [newIsfinished,setNewIsfinished] = useState(isfinished)

    //CAMBIAR POST POR PATCH 
    const patch_subject = async () => {
        try { 
            const response = await axios.patch(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/`, {subject_name:newSubject_name,num_max_students:newNum_max_alumnos,mode:newMode,finished:newIsfinished
                
            });
            /* console.log("axios result", response.data) */
            navigation.goBack();
            
        } catch (error) {
            /* console.error("Error:", error); */
        }
      };
    const delete_subject = async () => {
        try {
            // Antes de eliminar, pedir confirmación al usuario
            Alert.alert(
                'Confirmar eliminación',
                '¿Estás seguro que quieres eliminar el subject?',
                [
                    {
                        text: 'Cancelar',
                        /* onPress: () => console.log('Cancelado'), */
                        style: 'cancel',
                    },
                    {
                        text: 'Sí',
                        onPress: async () => {
                            const response = await axios.delete(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/`);
                            //console.log("axios result", response.data)
                            Alert.alert('Subject borrado', 'Se ha borrado el subject exitosamente', [
                                { text: 'OK', onPress: () => navigation.popToTop() }
                            ]);
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            /* console.error("Error:", error); */
        }
      };
    const go_off_subject = async () => {
        try {
            // Antes de eliminar, pedir confirmación al usuario
            Alert.alert(
                'Confirmar eliminación',
                '¿Estás seguro que dejar de ser Profesor de este subject?',
                [
                    {
                        text: 'Cancelar',
                        /* onPress: () => console.log('Cancelado'), */
                        style: 'cancel',
                    },
                    {
                        text: 'Sí',
                        onPress: async () => {
                            const response = await axios.delete(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/go-off/`);
                            //console.log("axios result", response.data)
                            Alert.alert('Subject borrado', 'Se ha borrado el subject exitosamente', [
                                { text: 'OK', onPress: () => navigation.popToTop() }
                            ]);
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            /* console.error("Error:", error); */
        }
      };
    /* const handleCheckboxChange = async () => {
        setIspublic(prev=> !prev);
    } */
    return (
    <View style ={styles.container}>        
        <View style={styles.form}>  
            <View style={styles.inputContainer}>
                <Text style={styles.placeholderText}>Nombre: </Text>
                <View style={styles.onlyinputContainer}>
                    <TextInput style={styles.input} placeholder={newSubject_name} onChangeText={(text: string) => setNewSubject_name(text)} value={newSubject_name} />            
                </View>                       
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.placeholderText}>Num. Max. Alumnos: </Text>
                <View style={styles.onlyinputContainer}>
                    <TextInput style={styles.input} placeholder={newNum_max_alumnos} onChangeText={(text: string) => setNewNum_max_alumnos(text)} value={newNum_max_alumnos} />
                </View>                       
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.placeholderText}>Terminado</Text>
                <View style={styles.onlyinputContainer}>     
                    <Checkbox style={styles.checkbox} value={newIsfinished} onValueChange={setNewIsfinished}/>
                </View>                   
            </View>                                             
                       
            <TouchableOpacity style={styles.editbutton} onPress={patch_subject}>        
                <Text style={styles.text_edit_button}>Guardar</Text>
            </TouchableOpacity>
                    
                
           
        </View>
        {/* <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={delete_subject} style={styles.deleteButton}>
                <Text style={styles.buttonText2}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={go_off_subject} style={styles.deleteButton}>
                <Text style={styles.buttonText2}>Salir de la asignatura</Text>
            </TouchableOpacity> 
        </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
    pickerRight: {
        width:200,
        height:300,        
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',// Ajusta el margen según sea necesario
        width:150
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
    editbutton: {
        position:"relative",
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:90,
        height:40,
        backgroundColor:'#c2f4be',
        borderRadius:50,
        marginTop:5,
      },
    text_edit_button: {
        fontSize: 9, 
        padding:8         
      },


});

export default ConfigSubjectProfesoresScreen