
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet,Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../../../screens/Home";
import Checkbox from 'expo-checkbox';
import axios from "axios";
import * as SecureStore from 'expo-secure-store'

//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;

interface EventItemAlumnosProps {
    alumno_id: string;
    asistencia_id: string;
    firstname:string;
    lastname:string;
    state:boolean;
    user_previous_state:string;
    navigation: NativeStackNavigationProp<RootStackParamList>;
    subject_id: string;
  }

const EventItemAlumnosAsistencias: React.FC<EventItemAlumnosProps> = ({subject_id,asistencia_id,alumno_id,firstname,lastname,state,user_previous_state, navigation }) => {
    const [isChecked, setIsChecked] = useState(state);
    /* console.log("estado", state, " de", firstname)  */   
    return (      
        
        <View style={styles.row}>
            <View style={styles.box_left}>
                <Text>{firstname} {lastname} ({user_previous_state}) {state}</Text>
                
            </View> 
            <View style={styles.box_right}>
            {isChecked ? (
                <Text>Presente</Text>
            ) : (
                <Text>Ausente</Text>
            )}
            </View>
        </View>      
       
     );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#c5c5c5',
        borderRadius: 10,
        padding: 10,
    },
    checkbox: {
        margin: 8,
    },
    row:{
        flexDirection:'row',
        flexWrap:'wrap', 
        backgroundColor:'#fff'

    },
    box_left: {        
        width: '80%',
        height: '100%',
        padding:5,

        
        // justifyContent: 'center',
    },
    box_right: {        
        width: '20%',
        height: '100%',
        padding:5,
        
        // justifyContent: 'center',
},
})

export default EventItemAlumnosAsistencias;