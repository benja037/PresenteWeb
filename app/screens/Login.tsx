import { View, Image, Text, Button, StyleSheet, TextInput, Pressable,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URL, useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from '@react-navigation/native';
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
    password:string;
    email:string;
    
}
const initialValues: FormData = {    
    password: '',
    email: '',    
};

interface LoginScreenProps {
    navigation: any; // Esto puede ser definido de manera más específica
}
const SignupSchema = Yup.object().shape({    
    password: Yup.string()      
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),    
     
});

const Login: React.FC<LoginScreenProps> = ({ navigation })=> {    
    const { onLogin, onRegister } = useAuth();
  
  const login = async (formData:FormData) => {
    const {  password, email } = formData;
    const result = await onLogin!(email,password);
    if (result && result.error) {
        /* console.log(result) */
        alert(result.message);
    }
  };

    return (
    <View style ={styles.container}>
        <Image source = {require('./images/Presente.png')} style={styles.image}/>
        <View style = {styles.containerform}>
            <Formik
                    initialValues={initialValues}
                    validationSchema={SignupSchema}
                    validateOnChange={false}
                    onSubmit={(values) => {     
                        login(values);
                    }}
            >
            {(props: FormikProps<FormData>) => ( 
            <View style={styles.form}>
                <View style={{alignItems:'baseline'}}>
                    <View style={styles.inputContainer}>
                        <View style={styles.onlytextContainer}>
                            <Text style={styles.placeholderText}>Email:</Text>
                        </View>
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
                                          
                </View>
                <View style={{alignItems:'baseline'}}>
                    <View style={styles.inputContainer}>
                        <View style={styles.onlytextContainer}>
                            <Text style={styles.placeholderText}>Contraseña:</Text>
                        </View>
                        
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
                </View>
                
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity style = {styles.button}onPress={() => props.handleSubmit()}>
                        <Text style={styles.textButton}>Enviar</Text>
                    </TouchableOpacity>                    
                </View>
            </View>
            )}
            </Formik> 
        </View>
        <View style ={{alignItems:'center',marginTop:15}}>
            <Button onPress={() => navigation.navigate('Register')} title="Registrar" />
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',// Ajusta el margen según sea necesario
        alignContent:'space-around',
        width:'80%',       
    },
    onlyinputContainer: {
        flexDirection: 'column',// Ajusta el margen según sea necesario
        width:'90%',
    },
    onlytextContainer: {
        flexDirection: 'column',// Ajusta el margen según sea necesario
        width:'45%', 
    },
    placeholderText: {
        width:100,
        marginRight: 10, // Ajusta el margen según sea necesario
        fontSize: 16, // Ajusta el tamaño de fuente según sea necesario
        color: '#333', // Ajusta el color del texto según sea necesario
    },
    input: {        
        height: 40, // Ajusta la altura según sea necesario
        width:'100%',
        borderColor: '#ccc', // Ajusta el color del borde según sea necesario
        borderWidth: 1, // Ajusta el grosor del borde según sea necesario
        borderRadius: 5, // Ajusta el radio del borde según sea necesario
        paddingHorizontal: 10, // Ajusta el relleno según sea necesario
    },
    image: {
        width:'50%',
        height:'50%',
        resizeMode: 'contain',
    },
    form: {
        gap: 10,
        width:'80%',
    },
    
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor:'#fff',

    },
    containerform: {
        alignItems: 'center',
        width: '95%',

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


});

export default Login