import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../Home";
import React from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import { styles } from "../../../../../styles/stylesheet";
import EventListSRowClass from "../../../../../components/apoderados/Disciplines/Subjects/Clases/event-list-row-s-class";
import { useAuth } from "../../../../../context/AuthContext";
import EventListAsistencias from "../../../../../components/apoderados/Disciplines/Subjects/Clases/event-list-asistencias";

type ClaseDetailProps = NativeStackScreenProps<RootStackParamList,'Clase_detail'>; 


const ClaseDetailApoderadosScreen: React.FC<ClaseDetailProps> = ({navigation,route}) => {  
    const { clase_id,subject_id } = route.params;    
    const { selectedProfile } = useAuth();  
    const [state, setState] = useState('')
    const [date, setDate] = useState('')   
    const [time_start, setTime_start] = useState('')
    const [time_end, setTime_end] = useState('')
    const [asistencias, setAsistencias] = useState([])
    const [alumnos, setAlumnos] = useState([])
    const [teachers, setTeachers] = useState([])
    const [num_max_alumnos, setNum_max_alumnos] = useState('')
    const [mode, setMode] = useState('')
    const [label, setLabel] = useState('')    
    const [loading, setLoading] = useState(true);        
    const [loading2, setLoading2] = useState(true);        
    const [isRolled,setIsRolled] = useState(false)
    
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
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/apoderados/subjects/${subject_id}/class/${clase_id}/?student_id=${selectedProfile?.id}`, {
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
            setIsRolled(response.data.rolled)

            //setData(response.data.subjects_from_teacher );
        } catch (error) {
            /* console.error("Error:", error); */
        } finally{
            setLoading(false)
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
            
            
        } catch (error) {
            /* console.error("Error:", error); */
        } finally{
            setLoading2(false)
        }
       
    }

    const ChangePreviousStateTrue= async() => {
        try {           
            const response = await axios.patch(`https://catolica-backend.vercel.app/apiv1/apoderados/class/${clase_id}/change-previous-state/?student_id=${selectedProfile?.id}`, {user_previous_state:'asistire'
               
            });         
            
        } catch (error) {
            /* console.error("Error:", error); */
        }finally{
            Alert.alert(
                'Se ha enviado tu respuesta', 
            )     
            fetchData2()          
        }
       
    }
    const ChangePreviousStateFalse = async() => {
        try {           
            const response = await axios.patch(`https://catolica-backend.vercel.app/apiv1/apoderados/class/${clase_id}/change-previous-state/?student_id=${selectedProfile?.id}`, {user_previous_state:'no-asistire'
               
            });         
            
        } catch (error) {
            /* console.error("Error:", error); */
        } finally{
            Alert.alert(
                'Se ha enviado tu respuesta', 
            )     
            fetchData2()          
        }
       
    }
    
    if (loading || loading2) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    if(!isRolled){
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container_header}>
                    <View style={styles.box_header_left}>                                       
                        <Text style={styles.title}>Label: {label}</Text>
                    </View>
                    
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
                <Text style={styles2.notEnrolledMessage}>No estás inscrito a esta clase</Text>
                
            </ScrollView>
        );
    } else{
    
    
    return ( 
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container_header}>
                <View style = {styles.box_header_left}>
                    <Text style={styles.title}>Label: {label}</Text>
                </View>                
            </View> 
            <View style={styles2.headerInfo}>
                    <Text style={styles2.headerText}>Máximo de Alumnos: {num_max_alumnos}</Text>
                    <Text style={styles2.headerText}>Modo: {mode}</Text>
                    <Text style={styles2.headerText}>Estado: {state}</Text>
                    <Text style={styles2.headerText}>Fecha: {date}</Text>
                    <Text style={styles2.headerText}>Hora de Inicio: {time_start}</Text>
                    <Text style={styles2.headerText}>Hora de Fin: {time_end}</Text>
                    <Text style={styles2.headerText}>Estado: {state}</Text>
                
                    

                </View>
            <View>
                 
                <TouchableOpacity style={styles.editbutton} onPress={ChangePreviousStateTrue}>        
                    <Text style={styles.text_edit_button}>Asistiré</Text>
                </TouchableOpacity>            
                <TouchableOpacity style={styles.editbutton} onPress={ChangePreviousStateFalse}>        
                    <Text style={styles.text_edit_button}>No asistiré</Text>
                </TouchableOpacity>            
                
            </View>
                        
            <Text style={styles.subtitle}>Lista de Alumnos</Text>            
            <View>                    
                <EventListAsistencias data2={asistencias} navigation={navigation} subject_id={subject_id}/>
                
            </View> 
            
            
            
            

            
            
        </ScrollView>
    );
}


    
    
}
 
export default ClaseDetailApoderadosScreen
;
const styles2 = StyleSheet.create({
    container: { 
        flex: 1 
    },
    notEnrolledMessage: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff0000',
        marginTop: 10,
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