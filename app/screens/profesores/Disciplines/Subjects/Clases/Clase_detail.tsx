import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../Home";
import React from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import EventListAsistencias from "../../../../../components/profesores/Disciplines/Subjects/Clases/event-list-asistencias";
import { styles } from "../../../../../styles/stylesheet";
import EventListProfesores from "../../../../../components/profesores/Disciplines/Subjects/event-list-profesores";

type ClaseDetailProps = NativeStackScreenProps<RootStackParamList,'Clase_detail'>; 


const ClaseDetailProfesoresScreen: React.FC<ClaseDetailProps> = ({navigation,route}) => {  
    const [loading, setLoading] = useState(true);    
    const { clase_id,subject_id } = route.params;    
    const [state, setState] = useState('')
    const [date, setDate] = useState('')   
    const [time_start, setTime_start] = useState('')
    const [time_end, setTime_end] = useState('')
    const [asistencias, setAsistencias] = useState([])
    const [alumnos, setAlumnos] = useState([])
    const [teachers, setTeachers] = useState([])
    const [num_max_alumnos, setNum_max_alumnos] = useState('')
    const [mode, setMode] = useState('privado')
    const [label, setLabel] = useState('')
    
   // const [data2, setData2] = React.useState<any>(null); // Usando un estado para almacenar los datos obtenidos
    useFocusEffect(
        React.useCallback(() => {            
        fetchData()
        fetchData2()                   
    },[])
    );

    const fetchData = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/class/${clase_id}/`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            /* console.log("ClaseDetail:", response.data); */
            setDate(response.data.date)          
            setTime_start(response.data.time_start)
            setTime_end(response.data.time_end)
            setState(response.data.state)
            setAlumnos(response.data.students)
            setTeachers(response.data.teachers)
            setNum_max_alumnos(response.data.num_max_students)
            setMode(response.data.mode)
            setLabel(response.data.label)


            //setData(response.data.subjects_from_teacher );
        } catch (error) {
            /* console.error("Error:", error); */
        }
       
    }
    const fetchData2 = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/class/${clase_id}/attendances/`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            /* console.log("Asistencias:", response.data); */
            setAsistencias(response.data)   
            setLoading(false)
            
        } catch (error) {
            /* console.error("Error:", error); */
        }
       
    }

    
    if (loading) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    
    return (
        <ScrollView contentContainerStyle={styles2.scrollViewContent}>
            <View style={styles2.container_header}>
                <View style={styles2.box_header_left}>
                    <Text style={styles2.title}>Label: {label}</Text>
                </View>
            </View>
            <View style = {styles2.container_boxes_row}>
                <TouchableOpacity style={styles.editbutton} onPress={() => navigation.navigate("Clase_config",{subject_id,clase_id,num_max_alumnos:num_max_alumnos,mode:mode,label:label,state:state,time_start:time_start,time_end:time_end,date:date})}>        
                    <Text style={styles.text_edit_button}>Configurar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editbutton} onPress={() => navigation.navigate('Edit_clase_alumnos', { subject_id, clase_id })}>        
                    <Text style={styles.text_edit_button}>Agregar Estudiantes</Text>
                </TouchableOpacity>
            </View>   
            <View style={styles2.headerInfo}>
                    <Text style={styles2.headerText}>Máximo de Alumnos: {num_max_alumnos}</Text>
                    <Text style={styles2.headerText}>Modo:{mode}</Text>
                    <Text style={styles2.headerText}>Estado:{state}</Text>
                    <Text style={styles2.headerText}>Fecha: {date}</Text>
                    <Text style={styles2.headerText}>Hora de Inicio: {time_start}</Text>
                    <Text style={styles2.headerText}>Hora de Fin: {time_end}</Text>
                    <Text style={styles2.headerText}>Estado: {state}</Text>
                    <Text style={styles2.headerText}></Text>
                    

            </View>
            <View>
                <Text style={{fontSize:16,fontWeight:"bold"}}>Profesor</Text>
                <EventListProfesores data={teachers} navigation={navigation} />
            </View>
            <View style={{marginTop:15}}>                 
                <EventListAsistencias subject_id={subject_id} data2={asistencias} navigation={navigation} clase_id={clase_id} />
            </View>
        </ScrollView>
    );
}

export default ClaseDetailProfesoresScreen;

const styles2 = StyleSheet.create({
    scrollViewContent: {
        padding: 16,
    },
    container_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    box_header_left: {
        flex: 1,
    },
    box_header_right: {
        flex: 1,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    editbutton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    text_edit_button: {
        color: 'white',
        fontSize: 16,
    },
    container_boxes_row : {               
        width:'95%',
        height:'8%',      
        flexDirection:'row',
        flexWrap:'wrap',  
    },
    headerInfo: {
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    
    },
    headerText: {
        fontSize: 18,
        color: '#333',
    },
});