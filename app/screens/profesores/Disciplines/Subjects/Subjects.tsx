import { useEffect, useState } from "react"
import { ActivityIndicator, Button, Text, TouchableOpacity, View } from "react-native"
import EventList from "../../../../components/profesores/Disciplines/Subjects/event-list-subjects";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../Home";
import * as SecureStore from 'expo-secure-store'
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import {styles} from "../../../../styles/stylesheet"
import { useAuth } from "../../../../context/AuthContext";
/* interface SubjectProps {    
    navigation: NativeStackNavigationProp<RootStackParamList>;
  } */

type SubjectProps = NativeStackScreenProps<RootStackParamList, 'Subjects'>;

const SubjectsProfesoresScreen: React.FC<SubjectProps> = ({ navigation, route }) => {   
    const [data,setData] = useState([])
    const { authState } = useAuth();
    const {discipline_id,discipline_name} = route.params;
    const [loading, setLoading] = useState(true);
   
    useFocusEffect(      
      React.useCallback(() => { 
        /* console.log("SubjectsProfesoresScreen")     */       
        fetchData2()                     
    },[])
  );
    

   
    
    const fetchData2 = async () => {
      try {          
          const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/disciplines/${discipline_id}/subjects/`, {});
          /* console.log("ALL subcjects:", response.data); */
          setData(response.data );
          //setData(response.data.subjects_from_teacher );
          /* ALL subcjects: [{"course_id": 1, "id": 1, "profesores": [[Object]], "subject_name": "Tenis 1999-2000"}
          , {"course_id": 1, "id": 5, "profesores": [], "subject_name": "Tenis 2000-2001"}, {"course_id": 1, "id": 6, "profesores": [],
           "subject_name": "Tenis 2000-2001A"}, {"course_id": 1, "id": 7, "profesores": [], "subject_name": "tenis2.0"}, {"course_id": 1,
            "id": 8, "profesores": [], "subject_name": "tenis9"}, {"course_id": 1, "id": 9, "profesores": [], "subject_name": "Tenis pilates"}, {"course_id": 1, "id": 14, "profesores": [], "subject_name": "Tenis Imaginario3"}, {"course_id": 1, "id": 15, "profesores": [], "subject_name": "Creado"}, {"course_id": 1, "id": 16, "profesores": [], "subject_name": "Hola"}, {"course_id": 1, "id": 17, "profesores": [], "subject_name": "Holaa"}, {"course_id": 1, "id": 18, "profesores": [], "subject_name": "Probabdo"}, {"course_id": 1, "id": 19, "profesores": [], "subject_name": "SSSSS"}, {"course_id": 1, "id": 20, "profesores": [], "subject_name": "SSSSS"}, {"course_id": 1, "id": 21, "profesores": [], "subject_name": "SSSSSaaa"}, {"course_id": 1, "id": 22, "profesores": [], "subject_name": "SSSSSaaa"}, {"course_id": 1, "id": 25, "profesores": [], "subject_name": "Eeey"}] */
      } catch (error) {
          /* console.error("Error:", error); */
      } finally {
        setLoading(false);
    }
    }
  
    if (loading) {
      return (
          <View style={styles.container}>
              <ActivityIndicator size="large" color="#0000ff" />
          </View>
      );
    }
    return (
      <View style = {styles.container}>
        <View style = {styles.container_up}>
          <View style = {styles.box_left}>
            <Text style={styles.principalTitle}>{discipline_name}</Text>        
          </View>  
          <View style = {styles.box_right}>
            <TouchableOpacity style={styles.circularbutton} onPress={() => navigation.navigate("Add_subject",{discipline_id})}>        
              <Text>+</Text>
            </TouchableOpacity>               
          </View>
        </View>
        <View style={styles.container_list}>                
        <EventList data={data} navigation={navigation} />   
        
        </View> 
       
      </View>
      )
    }



export default SubjectsProfesoresScreen