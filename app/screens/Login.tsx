import { View, Image, Text, Button, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Formik,
    FormikProps,
} from 'formik';
import * as Yup from 'yup';

interface FormData {    
    password: string;
    email: string;
}

const initialValues: FormData = {    
    password: '',
    email: '',    
};

interface LoginScreenProps {
    navigation: any; // Esto puede ser definido de manera más específica
}

const SignupSchema = Yup.object().shape({    
    password: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {    
    const { onLogin } = useAuth();
    const [isLoading, setIsLoading] = useState(false); // Estado de carga
  
    const login = async (formData: FormData) => {
        setIsLoading(true); // Activar el estado de carga
        const { password, email } = formData;
        const result = await onLogin!(email, password);
        setIsLoading(false); // Desactivar el estado de carga
        if (result && result.error) {
            alert(result.message);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('./images/Presente.png')} style={styles.image}/>
            <View style={styles.containerform}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={SignupSchema}
                    validateOnChange={false}
                    onSubmit={(values) => login(values)}
                >
                    {(props: FormikProps<FormData>) => (
                        <View style={styles.form}>
                            <View style={{alignItems: 'baseline'}}>
                                <View style={styles.inputContainer}>
                                    <View style={styles.onlytextContainer}>
                                        <Text style={styles.placeholderText}>Email:</Text>
                                    </View>
                                    <View style={styles.onlyinputContainer}>
                                        <TextInput
                                            placeholder="Email"
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
                            <View style={{alignItems: 'baseline'}}>
                                <View style={styles.inputContainer}>
                                    <View style={styles.onlytextContainer}>
                                        <Text style={styles.placeholderText}>Contraseña:</Text>
                                    </View>
                                    <View style={styles.onlyinputContainer}>
                                        <TextInput
                                            placeholder="Contraseña"
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
                            <View style={{alignItems: 'center'}}>
                                <TouchableOpacity
                                    style={[styles.button, isLoading && styles.buttonLoading]}
                                    onPress={() => props.handleSubmit()}
                                    disabled={isLoading} // Desactivar el botón durante la carga
                                >
                                    {isLoading ? (
                                        <ActivityIndicator size="small" color="#fff" />
                                    ) : (
                                        <Text style={styles.textButton}>Enviar</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
            <View style={{alignItems: 'center', marginTop: 15}}>
                <Button onPress={() => navigation.navigate('Register')} title="Registrar" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-around',
        width: '80%',
    },
    onlyinputContainer: {
        flexDirection: 'column',
        width: '90%',
    },
    onlytextContainer: {
        flexDirection: 'column',
        width: '45%',
    },
    placeholderText: {
        width: 100,
        marginRight: 10,
        fontSize: 16,
        color: '#333',
    },
    input: {        
        height: 40,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    image: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain',
    },
    form: {
        gap: 10,
        width: '80%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },
    containerform: {
        alignItems: 'center',
        width: '95%',
    },
    button: {       
        alignItems: 'center', 
        justifyContent: 'center',
        height: 40,
        width: 100,
        borderRadius: 5,
        backgroundColor: '#012677',
    },
    buttonLoading: {
        backgroundColor: '#005bb5', // Cambiar el color del botón durante la carga
    },
    textButton: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default Login;
