import { View, Image, Text, Button, StyleSheet, TextInput, Pressable, Platform, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URL, useAuth } from '../context/AuthContext';
import axios from 'axios';
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
    password:string;
    email:string;
    date_of_birth:string;
    user_type:string;
    gender:string;
    confirmPassword:string;
    phone_number:string;
    document_type:string;
    document_number:string;
}
const initialValues: FormData = {
    date_of_birth:'',    
    firstname: '',
    lastname: '',
    password: '',
    email: '',
    gender: 'Hombre',
    user_type: 'apoderado',
    confirmPassword: '',
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
    password: Yup.string() 
        .min(8,'Minimo 8 caracteres')     
        .required('Required'),
    email: Yup.string()        
        .email('Invalid email')
        .required('Required'),    
    user_type: Yup.string()
        .required('Required'),
    confirmPassword: Yup.string()
        .min(8,'Minimo 8 caracteres')
        .required('Required')
        .oneOf([Yup.ref('password')],'Tu contraseñas no coinciden'),  
    document_number: Yup.string()     
        .test('is-rut-valid', 'Invalid RUT', (value) => validateRut(value)) 
        .transform((value, originalValue) => {
            return validateRut(originalValue) ? formatRut(originalValue) : originalValue;
        })
        .required('Required'),
});
const Register = () => {    
    const { onLogin, onRegister } = useAuth();
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    

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

    const login = async (formData:FormData) => {
        const {  password, email } = formData;
        const result = await onLogin!(email,password);
        if (result && result.error) {
            alert(result.msg);
        } 
        };
    // We automatically call the login after a succesful registration
    const register_post = async (formData:FormData) => {
        const { date_of_birth,user_type,firstname, lastname, password, email, gender,phone_number,document_type,document_number } = formData;
        /* console.log("date_of_birth",date_of_birth,user_type,firstname, lastname, password, email, gender,phone_number) */
        const result = await onRegister!(password,email,date_of_birth,user_type,firstname,lastname,gender,phone_number,document_type,document_number);
        if (result && result.error) {
            /* console.log(result) */
            alert(result.msg.error);
        } else {            
            login(formData)
        } 
    };
   

    return (
    <View style ={styles.container}>        
        <View style={{marginTop:45,marginLeft:5}}>
        <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                validateOnChange={false}
                onSubmit={(values) => {     
                    register_post(values);
                }}
            >
                {(props: FormikProps<FormData>) => ( 
                <View>
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
                    <View style={styles.inputContainer}>
                        <Text style={styles.placeholderText}>Email:</Text>
                        <View style={styles.onlyinputContainer}>
                            <TextInput
                            placeholder='Email'
                            autoCapitalize="none"
                            style={styles.input}                        
                            value={props.values.email}
                            onChangeText={props.handleChange('email')}
                            />
                            {props.errors.email && (
                                <Text>{props.errors.email}</Text>
                            )}
                        </View>                        
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.placeholderText}>Contraseña:</Text>
                        <View style={styles.onlyinputContainer}>
                            <TextInput
                            placeholder='Contraseña'
                            style={styles.input}  
                            secureTextEntry={true}                      
                            value={props.values.password}
                            onChangeText={props.handleChange('password')}
                            />
                            {props.errors.password && (
                                <Text>{props.errors.password}</Text>
                            )} 
                        </View>                       
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.placeholderText}>Confirmar Contraseña:</Text>
                        <View style={styles.onlyinputContainer}>
                            <TextInput
                            placeholder='Confirmar Contraseña'
                            style={styles.input}      
                            secureTextEntry={true}                  
                            value={props.values.confirmPassword}
                            onChangeText={props.handleChange('confirmPassword')}
                            />
                            {props.errors.confirmPassword && (
                                <Text>{props.errors.confirmPassword}</Text>
                            )} 
                        </View>                       
                    </View>
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
                                                  
                        <View style={styles.onlyinputContainerRut}>
                            <TextInput
                            placeholder='rut o pasaporte (11.111.111-0)'
                            autoCapitalize="none"
                            style={styles.inputRut}                        
                            value={props.values.document_number}
                            onChangeText={props.handleChange('document_number')}
                            />
                            {props.errors.document_number && (
                                <Text>{props.errors.document_number}</Text>
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
                        
                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity style = {styles.button}onPress={() => props.handleSubmit()}>
                            <Text style={styles.textButton}>Registrar</Text>
                        </TouchableOpacity>  
                    </View>
                    
                    
                            
                    </View>

                    )}
                        
                            
            </Formik>   
        
        </View>       
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
    onlyinputContainerRut: {
        flexDirection: 'column',
        alignItems: 'center',// Ajusta el margen según sea necesario
        width:140,        
        marginLeft:60,
        marginTop:70,
        
    },
    pickerContainer: {
        flexDirection: 'row',        
        width:250,
        height:200,
        alignContent:"flex-end"
        
    },
    pickerLeft: {
        width:150,
        height:150,   
        marginBottom:5,
        marginTop:5,
         
    },
    pickerRight: {
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
    inputRut: {        
        height: 40, // Ajusta la altura según sea necesario
        width:180,
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
        alignItems: 'flex-start',
        backgroundColor:'#fff',
        

    },
    button:{       
        alignItems: 'center', 
        justifyContent: 'center',
        height:40,
        width:100,
        borderRadius: 5,        
        backgroundColor: '#012677',
    },
    textButton:{
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
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

export default Register