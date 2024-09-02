import { View, Image, Text, Button, StyleSheet, TextInput, Pressable, Platform, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../Home';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

type GrupoProps = NativeStackScreenProps<RootStackParamList, 'Add_grupo'>;
const AddGrupoProfesoresScreen = ({ navigation, route }:GrupoProps) => {
    const {subject_id} = route.params;    
    const [name_group, setName_group] = useState('');    
    
    const post_grupo = async () => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
            //console.log("HORAAAAA",{selectedTime})
            //console.log("DAYYY",{selectedDay})
            const response = await axios.post(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/groups/`, {name:name_group})
                
            /* console.log("GRUPO AGREGADO") */
            //console.log("RESPONSE axios result", response)
            //console.log("axios result", response.data)
            navigation.goBack();
            
        } catch (error) {
            /* console.error("Error:", error); */
        }
      };

    return (
    <View style ={styles.container}>        
        <View style={styles.form}>     
            <View style={styles.inputContainer}>
                <Text style={styles.placeholderText}>Nombre del grupo:</Text>
                <View style={styles.onlyinputContainer}>
                    <TextInput style={styles.input} placeholder="Nombre del grupo" onChangeText={(text: string) => setName_group(text)} value={name_group} />    
                </View>
            </View>  
                           
        </View>          
        <Button onPress={post_grupo} title="Crear" />           
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
        height: 40, // Ajusta la altura según sea necesario
        width:250,
        borderColor: '#ccc', // Ajusta el color del borde según sea necesario
        borderWidth: 1, // Ajusta el grosor del borde según sea necesario
        borderRadius: 5, // Ajusta el radio del borde según sea necesario
        paddingHorizontal: 10, // Ajusta el relleno según sea necesario
    },
    placeholderText: {
        width:100,
        marginRight: 10, // Ajusta el margen según sea necesario
        fontSize: 16, // Ajusta el tamaño de fuente según sea necesario
        color: '#333', // Ajusta el color del texto según sea necesario
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

export default AddGrupoProfesoresScreen