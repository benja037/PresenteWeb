import { View, Image, Text, Button, StyleSheet, TextInput, Pressable, Platform, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Home';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
  } from 'formik'

import * as Yup from 'yup';
import { CommonActions } from '@react-navigation/native';

interface FormData {       
    document_type:string;
    document_number:string;

}
const initialValues: FormData = {    
    document_type:'rut',
    document_number:'',
    
};
const formatRut = (rut: string) => {
    // Eliminar puntos y guiones
    rut = rut.replace(/\./g, '').replace(/\-/g, '');

    // Separar el número y el dígito verificador
    let rutNumber = rut.slice(0, -1);
    let rutDV = rut.slice(-1).toUpperCase();

    // Formatear el número
    let formattedRut = '';
    while (rutNumber.length > 3) {
        formattedRut = '.' + rutNumber.slice(-3) + formattedRut;
        rutNumber = rutNumber.slice(0, -3);
    }
    formattedRut = rutNumber + formattedRut;

    // Agregar el guion y el dígito verificador
    formattedRut = formattedRut + '-' + rutDV;

    return formattedRut;
};
// Función para validar el RUT
const validateRut = (rut:any) => {
    // Eliminar puntos y guión
    rut = rut.replace(/\./g, '').replace(/\-/g, '');

    // Separar el número y el dígito verificador
    let rutNumber = rut.slice(0, -1);
    let rutDV = rut.slice(-1).toUpperCase();

    // Validar el formato del número y el dígito verificador
    if (!/^[0-9]+$/i.test(rutNumber) || (rutDV !== 'K' && !/^[0-9K]+$/i.test(rutDV))) {
        return false;
    }

    // Calcular el dígito verificador esperado
    let suma = 0;
    let multiplo = 2;
    for (let i = rutNumber.length - 1; i >= 0; i--) {
        suma += parseInt(rutNumber.charAt(i)) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    let dvEsperado = 11 - (suma % 11);

    // Validar el dígito verificador
    let dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    return dvCalculado === rutDV;
};

const SignupSchema = Yup.object().shape({    
    document_number: Yup.string()     
        .test('is-rut-valid', 'Invalid RUT', (value) => validateRut(value)) 
        .transform((value, originalValue) => {
            return validateRut(originalValue) ? formatRut(originalValue) : originalValue;
        })
        .required('Required'),
    
});

type CheckRutProps = NativeStackScreenProps<RootStackParamList, 'Check_rut'>;
const CheckRutProfileApoderadosScreen = ({ navigation, route }:CheckRutProps) => {     

    const STUDENT_ALREADY_LINKED = "El estudiante ya está creado y tiene un usuario asociado.";
    const STUDENT_NOT_FOUND = "El estudiante no está creado.";
    const STUDENT_ALREADY_ADDED = "El estudiante ya está creado pero no tiene un usuario asociado.";
    
    const check_rut = async (formData: FormData) => {
        const { document_type, document_number } = formData;      
        try { 
          const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/students/check-rut/${document_type}/${document_number}/`,{});
      
          const message = response.data.message; // Asumiendo que la respuesta de la API contiene un campo "message"
          /* console.log("rut",document_number,"axios result", message); */
      
          if (message === STUDENT_ALREADY_LINKED) {
            // Si el usuario ya está vinculado, no hacer nada o mostrar un mensaje de error
            /* console.error("Error: El usuario ya está vinculado a otro propietario."); */
            alert("El usuario ya está vinculado a otro propietario.");
          } else if (message === STUDENT_NOT_FOUND) {
            // Si el usuario no está en los registros, navegar a Add_student
            navigation.navigate("Add_student_apoderado",{document_type,document_number});
          } else if (message === STUDENT_ALREADY_ADDED) {
            navigation.pop();
          } else {
            // Manejar cualquier otro caso o mensaje
            /* console.error("Error inesperado:", message); */
          }
        } catch (error) {
          /* console.error("Error:", error); */
          alert("Hubo un error al verificar el RUT. Por favor, inténtalo de nuevo.");
        }
      };

    
    return (  
    

        <View style ={styles.container}>                
            <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                validateOnChange={false}
                onSubmit={(values) => {
                    const formatRutBeforeSubmit = () => {
                        const formattedRut = formatRut(values.document_number);
                        return formattedRut;
                    };
                    values.document_number = formatRutBeforeSubmit(); // Formatea el RUT antes de enviar el formulario
                    check_rut(values);
                }}
            >
                {(props: FormikProps<FormData>) => ( 
                <View>                    
                    <View style={styles.inputContainer}>
                        <View style={styles.pickerLeft}>
                            <Picker
                                selectedValue={props.values.document_type}
                                onValueChange={(itemValue, itemIndex) =>
                                    props.setFieldValue('document_type', itemValue)
                                }>
                                <Picker.Item label="rut" value="rut" />
                                <Picker.Item label="pasaporte" value="pasaporte" />
                            </Picker>                                              
                        </View>
                        <View style={styles.onlyinputContainer}>
                            <TextInput
                            placeholder='rut o pasaporte (11.111.111-0)'
                            autoCapitalize="none"
                            style={styles.input}                        
                            value={props.values.document_number}
                            onChangeText={props.handleChange('document_number')}
                            onBlur={() => {
                                const formattedRut = formatRut(props.values.document_number);
                                props.setFieldValue('document_number', formattedRut);
                            }}
                            />
                            {props.errors.document_number && (
                                <Text>{props.errors.document_number}</Text>
                            )}   
                        </View>                     
                    </View>    
                    
                    
                    <Button onPress={() => props.handleSubmit()} title="Submit" />
                </View>

                    )}
                        
                            
            </Formik>   
        
       
    </View>
  );
};
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    onlyinputContainer: {
        flexDirection: 'column',
        alignItems: 'center',// Ajusta el margen según sea necesario
        width:150,        
        marginLeft:50
    },
    pickerContainer: {
        flexDirection: 'row',        
        width:350,
        height:200,
        
    },
    pickerLeft: {
        width:150,
        height:250,        
    },
    pickerRigth: {
        width:200,
        height:300,        
    },
    placeholderText: {
        width:100,
        marginRight: 10, // Ajusta el margen según sea necesario
        fontSize: 16, // Ajusta el tamaño de fuente según sea necesario
        color: '#333', // Ajusta el color del texto según sea necesario
    },
    input: {        
        height: 40, // Ajusta la altura según sea necesario
        width:200,
        borderColor: '#ccc', // Ajusta el color del borde según sea necesario
        borderWidth: 1, // Ajusta el grosor del borde según sea necesario
        borderRadius: 5, // Ajusta el radio del borde según sea necesario
        paddingHorizontal: 10, // Ajusta el relleno según sea necesario
    },
    inputContainerDate: {
        flexDirection: 'column',
        alignItems: 'center',// Ajusta el margen según sea necesario
        width:250
    },
    image: {
        width:'25%',
        height:'25%',
        resizeMode: 'contain',
    },
    form: {
        gap: 10,
        width:'65   %',
    },    
    container: {
        flex: 1,
        justifyContent: 'center',
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
        width:2450,
        marginTop: -10,
    },
    pickerButton: {
        paddingHorizontal: 20,
    },


});

export default CheckRutProfileApoderadosScreen