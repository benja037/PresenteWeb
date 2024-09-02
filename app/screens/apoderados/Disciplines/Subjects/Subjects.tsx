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
import EventListSubjects from "../../../../components/apoderados/Disciplines/Subjects/event-list-subjects";
/* interface SubjectProps {    
    navigation: NativeStackNavigationProp<RootStackParamList>;
  } */

type SubjectProps = NativeStackScreenProps<RootStackParamList, 'Subjects'>;

const SubjectsApoderadosScreen: React.FC<SubjectProps> = ({ navigation, route }) => {   
    const [data,setData] = useState([])
    const { authState,selectedProfile } = useAuth();    
    const {discipline_id,discipline_name} = route.params;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
   
    useFocusEffect(      
      React.useCallback(() => {         
        /* console.log("SubjectsAlumnosScreen")   */    
        /* console.log("selected profile",selectedProfile)   */   
        fetchData2()                     
    },[])
  );
    

   
    
    const fetchData2 = async () => {
      try {          
          const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/apoderados/disciplines/${discipline_id}/subjects/?student_id=${selectedProfile?.id}`, {});
          /* console.log("ALL subcjects:", response.data); */
          setData(response.data );
          //setData(response.data.subjects_from_teacher );
          /* ALL subcjects: [{"discipline": 1, "finished": false, "id": 1, "mode": "moderado", "num_max_students": 5, "rolled": false, 
          "students": [[Object]], "subject_name": "Primeros pasos", "teachers": [[Object]]}, {"discipline": 1, "finished": false, "id": 2, "mode": "moderado",
           "num_max_students": 10, "rolled": false, "students": [[Object], [Object], [Object]], "subject_name": "Pro", "teachers": [[Object]]}] */
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
          
        </View>
        <View style={styles.container_list}>                
        <EventListSubjects data={data} navigation={navigation} />   
        
        </View> 
       
      </View>
      )
    }



export default SubjectsApoderadosScreen