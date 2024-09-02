 import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../Home";
import React from "react";
import EventList_alumnos_complete from "../../../../components/profesores/Disciplines/Subjects/event-list-alumnos-row";
import GrupoEventList from "../../../../components/profesores/Disciplines/Subjects/Grupos/event-list-grupos";
import { styles } from "../../../../styles/stylesheet";


import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import EventListProfesores from "../../../../components/profesores/Disciplines/Subjects/event-list-profesores";

import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import 'moment/locale/es';
import ClasesEventList from "../../../../components/profesores/Disciplines/Subjects/Clases/event-list-clases";

type DetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;

interface Item {
    id:string;    
    name:string;
  }
interface Profesor {
    id:string;
    firstname:string;
    lastname:string;
    gender:string;
    date_of_birth:string;
}

interface Clase {
    id:string;
    subject_id: string;
    state: string;
    staff_id: Profesor[];
    date:string;
    time_start:string;
    time_end:string;
    label:string;
    num_max_students:string;
    mode:string;

  }


const SubjectDetailProfesoresScreen: React.FC<DetailSubjectsProps> = ({navigation,route}) => {  
    
    const { subject_id } = route.params;    
    const [subject_name,setSubject_name] = useState("");
    const [num_max_alumnos,setNum_max_alumnos] = useState('');
    const [mode,setMode] = useState('');
    const [isFinished,setIsFinished] = useState(false);
    
    
    const [loading, setLoading] = useState(true);    
    const [isLoadingClases, setIsLoadingClases] = useState(false);
    const [isRolled,setIsRolled] = useState(false)
      
    const [alumnos, setAlumnos] = useState([])
    const [profesores, setProfesores] = useState([])

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedDateString,setSelectedDateString] = useState("");
    const [formattedDate,setFormattedDate] = useState("");
    const [classes, setClasses] = useState<Clase[]>([]);
   
    useFocusEffect(
        useCallback(() => {
            const getData = async () => {
                await fetchData();
                setLoading(false);
            };
            getData();
            /* console.log("Rolled",isRolled) */
            
        }, [isRolled])
    );
    
            
   
    useEffect(() => {   
        /* console.log("Primera Fecha") */   
        if(selectedDate){
            setSelectedDateString(formatDate(selectedDate));       
            setFormattedDate(moment(selectedDate).format('dddd, DD MMMM YYYY'));
        }
      
               
    }, []);

    useFocusEffect(
        React.useCallback(() => {
        if(isRolled){        
            fetchClasses();  
        }      
    
    },[isRolled,selectedDateString])
    );

    

    const fetchData = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/`, {});           
            /* console.log("Fetchdata1"); */
            /* console.log("SUBJECT DETAIL:", response.data); */
            setAlumnos(response.data.students );            
            setProfesores(response.data.teachers);
            setSubject_name(response.data.subject_name);
            setNum_max_alumnos(response.data.num_max_students);
            setMode(response.data.mode);
            setIsFinished(response.data.finished);
            setIsRolled(response.data.rolled)
        } catch (error) {
            /* console.error("Error:", error);    */         
        }
       
    }

    const formatDate = (rawDate: Date | string) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let formattedMonth  = month < 10 ? `0${month}` : month;
        let formattedDay = day < 10 ? `0${day}` : day;

        return `${year}-${formattedMonth}-${formattedDay}`;

    }

    const fetchClasses = async () => {
        try {

          // Realiza la solicitud fetch para obtener las clases del día seleccionado
            if(selectedDateString != ""){
                setIsLoadingClases(true);            
                
                const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/class-date/${selectedDateString}/`, {});    
                //Necesito una url que me obtenga todas las clases de un subject filtrados por dia y despues para alumno un url que obtenga todas las clases que tiene el para cierto dia
                //Seria mejor que cada clase tenga un subject y que en vez de existir horario... o no se en vez de tener los.
                //NONO el pensamiento de ayer era que si es un alumno en clase particular el horario fuese 1 alumno y la asistencia 1 alumno, que pasa con fech
                /* console.log("CLASES FETCH CLASES",response.data); */
                setClasses(response.data);
            }
            
          
        } catch (error) {
          /* console.error('Error al obtener las clases:', error); */
        } finally {
            setIsLoadingClases(false);
        }
      };

   
    const handleDateSelected = (date: Date) => {
        /* console.log("CAMBIO DATES"); */
        const newSelectedDateString = formatDate(date);
        const newFormattedDate = moment(newSelectedDateString).format('dddd D [de] MMMM YYYY');

        setSelectedDate(date);
        setSelectedDateString(newSelectedDateString);
        setFormattedDate(newFormattedDate);
        /* console.log("SELECTED_DATE", date, "SELECTED_DATE_STRING", newSelectedDateString, "FORMATTED_DATE", newFormattedDate); */
    };
    
    if (loading) {
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
                    <View style = {styles.box_header_left}>
                        <Text style={styles.subjectTitle}>{subject_name}</Text>
                    </View>
                </View>
                <View style={styles.sub_container}>
                    <Text>No eres profesor de este curso</Text>
                </View>
            </ScrollView>
        );
    } else{
    
    
    return ( 
        <ScrollView contentContainerStyle={styles2.scrollViewContent}>
            <View style={styles.container_header}>
                <View style = {styles.box_header_left}>
                    <Text style={styles.subjectTitle}>{subject_name}</Text>
                </View>                
                
            </View>
            <View style={styles2.container_boxes_row}>
                <TouchableOpacity style={styles.editbutton} onPress={() => navigation.navigate("Subject_config",{subject_id,subject_name:subject_name,num_max_alumnos:num_max_alumnos,mode:mode,isfinished:isFinished})}>        
                    <Text style={styles.text_edit_button}>Configurar</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.editbutton} onPress={() => navigation.navigate("Subject_informe",{subject_id})}>        
                    <Text style={styles.text_edit_button}>Informe</Text>
                </TouchableOpacity>                         
                <TouchableOpacity style={styles.editbutton} onPress={() => navigation.navigate("Grupo_subject",{subject_id})}>        
                    <Text style={styles.text_edit_button}>Grupos</Text>
                </TouchableOpacity>      
            </View>
            <View style={styles2.headerInfo}>
                <Text style={styles2.headerText}>Máximo de Alumnos: {num_max_alumnos}</Text>
                <Text style={styles2.headerText}>Modo: {mode}</Text>
                <Text style={styles2.headerText}>{isFinished ? 'Terminado' : 'En curso'}</Text>
            </View>
            
            
            <View >
                <Text style={styles2.subtitle}>Profesor</Text>
            </View>
            
            <View>
                <EventListProfesores data={profesores} navigation={navigation} />
            </View>
            <View style={styles2.sectionRow}>
                <View>
                    <Text style={styles2.subtitle}>Lista de Alumnos</Text> 
                </View> 
                <View>
                    <TouchableOpacity style={styles.editbutton2} onPress={()=>navigation.navigate('Edit_subject_alumnos',{subject_id})}>        
                        <Text style={styles.text_edit_button}>Agregar Estudiantes</Text>
                    </TouchableOpacity>
                </View>  
            </View>
               
                       
            <EventList_alumnos_complete data2={alumnos} navigation = {navigation} subject_id={subject_id} />
              
           
            
            <View style={styles2.container}>
                <CalendarStrip
                    style={{height:200, paddingTop: 20, paddingBottom: 10}}
                    calendarColor={'#3343CE'}
                    calendarHeaderStyle={{color: 'white'}}
                    dateNumberStyle={{color: 'white'}}
                    dateNameStyle={{color: 'white'}}
                    iconContainer={{flex: 0.1}}
                    onDateSelected={handleDateSelected}
                />
            </View>
            {isLoadingClases && (
                <View style={{padding: 20 }}>
                    <View style={{padding:9}}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                    
                    <View style={styles2.container_class}>    
                        <View style={{alignItems:'center'}}>
                            <TouchableOpacity style={styles2.addButtonTouch} onPress={() => navigation.navigate('Add_clase',{subject_id})}>
                                <Text style={styles2.addButtonText}>Añadir Clase  </Text> 
                            </TouchableOpacity>
                        </View>                    
                        
                    </View>
                </View>
                
            )}

            {/* Mostrar las clases solo si no está cargando */}
            {!isLoadingClases && (
                <View style={{ padding: 20 }}>
                    {/* <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Clases del día: {selectedDateString ? selectedDateString : 'Ninguna'}</Text> */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Clases del día: {formattedDate ? formattedDate : 'Ninguna'}</Text>
                    <View style={styles2.container_class}>
                        <ClasesEventList data={classes} navigation={navigation} subject_id={subject_id}/>                    
                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity style={styles2.addButtonTouch} onPress={() => navigation.navigate('Add_clase',{subject_id})}>
                            <Text style={styles2.addButtonText}>Añadir Clase  </Text> 
                        </TouchableOpacity>
                    </View>
                    
                    
                    
                    
                </View>
            )}
            <View style={styles2.section_clases}>
                
            </View>
            
        </ScrollView>
    );
}
}
 
export default SubjectDetailProfesoresScreen
;
const styles2 = StyleSheet.create({
    container: { 
        flex: 1 
    },
    container_class : {               
        marginBottom:5,

        
    },
    container_boxes_row : {               
        width:'95%',      
        flexDirection:'row',
        flexWrap:'wrap',  
    },
    sectionRow : {               
        width:'95%',      
        flexDirection:'row',
        flexWrap:'wrap',     
    },
    headerInfo: {
        marginBottom: 10,
        marginTop:10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    
    },
    headerText: {
        fontSize: 18,
        color: '#333',
    },
    addButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    addButtonTouch: {
        backgroundColor: '#FFD700', // yellow background
        width:"55%",
        padding: 15,
        borderRadius: 10,
        alignItems:'center'
    },
    addButtonText: {
        fontSize: 18,
        color: '#3343CE',
        fontWeight: 'bold',
    },
    section:{
        alignItems: 'center',
        paddingBottom:40,
    },
    section_clases:{
        alignItems: 'center',
        paddingBottom:40,
    },
    subtitle: {
        fontSize: 20, 
        padding:8,  
        fontWeight: 'bold',       
    },
    scrollViewContent: {
        paddingVertical: 20,
        paddingHorizontal: 5,
        backgroundColor: 'fff',
        flexGrow: 1
    },
}
);