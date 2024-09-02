import { View, Image, Text, Button, StyleSheet, TextInput, Pressable, Platform, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Home';
import { useFocusEffect } from '@react-navigation/native';
import EventList_alumnos_complete from '../../../components/profesores/Students/event-list-students';


type EditSubjectAlumnosProps = NativeStackScreenProps<RootStackParamList, 'Students'>;
const StudentsConfigProfesoresScreen = ({ navigation, route }:EditSubjectAlumnosProps) => {            
    const [alumnos, setAlumnos] = useState([])  
    useFocusEffect(
        React.useCallback(() => {            
            fetchData();                
        }                
        ,[])
    );
    const fetchData = async () => {
    try {        
        const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/students/`, {});           
        /* console.log("Fetchdata1"); */
        setAlumnos(response.data);    
        /* console.log("ALUMNOS:", response.data);  */       
    } catch (error) {
        /* console.error("Error:", error);  */           
    }
    }

    return (
    <View style={styles.screen}>
        <View style={styles.container_header}>
            <View style={styles.box_header_left}>
                <Text>Lista de estudiantes:</Text>
            </View>
            <View style={styles.box_header_right}>
                <TouchableOpacity style={styles.circularbutton} onPress={() => navigation.navigate("Add_student_profesor")}>        
                <Text>+</Text>
                </TouchableOpacity>  
            </View>

        </View>
        <View style ={styles.container}> 
            
            <EventList_alumnos_complete data2= {alumnos} navigation={navigation}/>
        </View>
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
    circularbutton: {
        position:"relative",
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'#c2f4be',
        borderRadius:50,
      },
    container_header: {
        width: '100%',  
        height:50,
        backgroundColor:"#a5c8eb",
        justifyContent: 'center',
        borderBottomStartRadius:20,
        flexDirection:'row',
        flexWrap:'wrap',   
    },
    box_header_left: {        
        width: '70%',
        height: '100%',    
       
    },
    box_header_right: {        
        width: '25%',
        height: '100%',
        
    },
    screen: {  
        flex:1,
        alignItems: 'center',
        

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
    
    


});

export default StudentsConfigProfesoresScreen