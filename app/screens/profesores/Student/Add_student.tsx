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

interface FormData {   
    firstname: string;
    lastname: string;    
    date_of_birth:string;    
    gender:string;   
    phone_number:string;
    document_type:string;
    document_number:string;

}
const initialValues: FormData = {
    date_of_birth:'',    
    firstname: '',
    lastname: '',    
    gender: 'Hombre',
    phone_number:'',
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
    firstname: Yup.string()
        .min(1,'Too short')
        .max(20, 'Too long') 
        .required('Required'),    
    lastname: Yup.string()      
        .required('Required'),
    phone_number: Yup.string()      
        .required('Required'),
    document_number: Yup.string()     
        .test('is-rut-valid', 'Invalid RUT', (value) => validateRut(value)) 
        .transform((value, originalValue) => {
            return validateRut(originalValue) ? formatRut(originalValue) : originalValue;
        })
        .required('Required'),
    
});

type AddStudentProps = NativeStackScreenProps<RootStackParamList, 'Add_student_profesor'>;
const AddStudentProfesoresScreen = ({ navigation, route }:AddStudentProps) => {    
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    
    const post_student = async (formData:FormData) => {
        const { date_of_birth,firstname, lastname, gender,phone_number,document_type,document_number } = formData;
        try { 
            const response = await axios.post(`https://catolica-backend.vercel.app/apiv1/students/`, {gender:gender,date_of_birth:date_of_birth,firstname:firstname,lastname:lastname,phone_number:phone_number,document_type:document_type,document_number:document_number
                
            });
            /* console.log("axios result", response.data) */
            navigation.goBack();
            
        } catch (error) {
            /* console.error("Error:", error); */
        }
      };
    /* const handleCheckboxChange = async () => {
        setIspublic(prev=> !prev);
    } */
    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    }; 
    
    const confirmIOSDate = () =>{  

        toggleDatepicker();
    };
    const formatDate = (rawDate: Date | string) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let formattedMonth  = month < 10 ? `0${month}` : month;
        let formattedDay = day < 10 ? `0${day}` : day;

        return `${year}-${formattedMonth}-${formattedDay}`;

    }
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
                    values.document_number = formatRutBeforeSubmit();    
                    post_student(values);
                }}
            >
                {(props: FormikProps<FormData>) => ( 
                <View style={styles.container}>
                    <View style={styles.inputContainer}> 
                        <Text style={styles.placeholderText}>Fecha de Nacimiento</Text>   
                        <View style={styles.inputContainerDate}>        
                                                       
                            {showPicker && (<DateTimePicker  
                            timeZoneName={'America/Santiago'}
                            locale="es"          
                            mode="date"
                            display='spinner'
                            value={date}
                            onChange={(event, selectedDate:any) => {
                                if (event.type === 'set') {
                                    const currentDate = selectedDate || date;
                                    setDate(currentDate);                                
                                    props.setFieldValue('date_of_birth', formatDate(selectedDate));
                                }
                            }}
                            style={styles.datePicker}
                        
                        
                            />
                            )}
                            {showPicker && Platform.OS === "ios" && (
                                <View
                                    style = {{ flexDirection:"row",
                                    justifyContent: 'space-around'}}
                                >                                    

                                    <TouchableOpacity style={[
                                        styles.button,
                                        styles.pickerButton,
                                        
                                    ]}
                                    onPress = {confirmIOSDate}
                                    >
                                        <Text style={[
                                            styles.buttonText,                            
                                        ]}
                                        >Confirm</Text>

                                    </TouchableOpacity>

                                </View>
                            )}
                            {!showPicker && (
                                <Pressable onPress = {toggleDatepicker}>
                                    
                                    <TextInput
                                        style={styles.input}
                                        placeholder=''
                                        value = {props.values.date_of_birth}
                                        onChangeText = {props.handleChange('date_of_birth')}
                                        placeholderTextColor={'#11182744'}
                                        editable={false}
                                        onPressIn = {toggleDatepicker}
                                        />
                                </Pressable>
                            )}
                        </View>

                               
                            </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.placeholderText}>Nombre:</Text>
                        <View style={styles.onlyinputContainer}>
                            <TextInput
                            placeholder='Nombre'
                            autoCapitalize="none"
                            style={styles.input}                        
                            value={props.values.firstname}
                            onChangeText={props.handleChange('firstname')}
                            />
                            {props.errors.firstname && (
                                <Text>{props.errors.firstname}</Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.placeholderText}>Apellido:</Text>
                        <View style={styles.onlyinputContainer}>
                            <TextInput
                            placeholder='Apellido'
                            autoCapitalize="none"
                            style={styles.input}                        
                            value={props.values.lastname}
                            onChangeText={props.handleChange('lastname')}
                            />
                            {props.errors.lastname && (
                                <Text>{props.errors.lastname}</Text>
                            )}   
                        </View>                     
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.placeholderText}>Número de teléfono:</Text>
                        <View style={styles.onlyinputContainer}>
                            <TextInput
                            placeholder='Número de teléfono'
                            autoCapitalize="none"
                            style={styles.input}                        
                            value={props.values.phone_number}
                            onChangeText={props.handleChange('phone_number')}
                            />
                            {props.errors.phone_number && (
                                <Text>{props.errors.phone_number}</Text>
                            )}   
                        </View>                     
                    </View>    
                    <View style={styles.pickerContainer}>
                        <View style={styles.pickerLeft}>
                            <Picker
                                selectedValue={props.values.gender}
                                onValueChange={(itemValue, itemIndex) =>
                                    props.setFieldValue('gender', itemValue)
                                }>
                                <Picker.Item label="Hombre" value="Hombre" />
                                <Picker.Item label="Mujer" value="Mujer" />
                            </Picker>                                              
                        </View>
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
                        
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.placeholderText}>Documento (rut o pasaporte): </Text>
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
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity style={styles.editbutton} onPress={() => props.handleSubmit()}>        
                            <Text style={styles.text_edit_button}>Agregar</Text>
                        </TouchableOpacity>         
                    </View>
                        
                    </View>

                    )}
                        
                            
            </Formik>   
        
       
    </View>
  );
};
const styles = StyleSheet.create({
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
    pickerContainer: {
        flexDirection: 'row',        
        width:350,
        height:200,
        
    },
    pickerLeft: {
        width:150,
        height:300,        
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
        width:250,
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
        width: '100%',
        alignContent:'flex-end',

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

export default AddStudentProfesoresScreen