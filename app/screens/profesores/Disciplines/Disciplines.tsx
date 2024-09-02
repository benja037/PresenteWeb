import { useEffect, useState } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import EventList from "../../../components/profesores/Disciplines/event-list-disciplines";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Home";
import * as SecureStore from 'expo-secure-store'
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { styles } from "../../../styles/stylesheet";
import { useAuth } from "../../../context/AuthContext";


type DisciplinesProps = NativeStackScreenProps<RootStackParamList, 'Disciplines'>;

const DisciplinesProfesoresScreen: React.FC<DisciplinesProps> = ({ navigation, route }) => {
    
    const { authState,selectedProfile } = useAuth();      
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true);
    
    useFocusEffect(
        React.useCallback(() => {        
           
        fetchData2() 
                    
    }, [])
);    

    const fetchData2 = async () => {
        try {                  
            const response = await axios.get('https://catolica-backend.vercel.app/apiv1/disciplines/');
            //console.log("data courses:", response.data);
            //EJEMPLO: data courses: [{"course_name": "Clases de Tenis", "id": 1}, {"course_name": "Futbol", "id": 2}, {"course_name": "Padel", "id": 3}, {"course_name": "Rugby", "id": 4}]
            setData(response.data);
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
            {/* <Text>Bienvenido {authState?.user_type} que es Profesor: {authState?.firstname}</Text> */}        
            {/* <Text>Bienvenido: {authState?.firstname} {selectedProfile?.firstname}</Text> */}        
          </View>            
        </View>
        <View style={styles.container_list}>                
        <EventList data={data} navigation={navigation}/>   
        </View> 
       
      </View>
      )
    }



export default DisciplinesProfesoresScreen