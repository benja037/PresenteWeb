
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet,Text, TouchableOpacity, View ,Image } from "react-native";
import { RootStackParamList } from "../../../../../screens/Home";
import {styles_card_horario} from "../../../../../styles/stylesheet"
import { AntDesign } from '@expo/vector-icons';
//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;
interface ClasesEventItemProps {    
    clase_id: string;
    date:string;
    time_start:string;
    time_end:string;
    label:string;
    mode:string;
    num_max_students:string;
    state:string;     
    navigation: NativeStackNavigationProp<RootStackParamList>;
    subject_id:string;
 
}

/* CLASES FETCH CLASES [{"date": "2024-05-10", "id": 1, "label": "A", "num_max_students": 5, "public": false, "state": "proximamente", "subject": 2, "teachers": [], "time_end": "21:55:00", "time_start": "19:55:00"}]
 */const ClasesEventItem: React.FC<ClasesEventItemProps> = ({subject_id,clase_id,date,time_start,time_end,label,num_max_students,mode,state,navigation}) => {
    //const {subject_id} = route.params || {}
    return (       
        <TouchableOpacity onPress={()=>navigation.navigate("Clase_detail",{clase_id,subject_id})}>         
            <View style={styles_card_horario.container}>
                <View style={styles_card_horario.cardContainer}>                      
                        <View style={styles_card_horario.infoStyle}>
                            <Text style={styles_card_horario.titleStyle}>{label}</Text>
                            <Text style={styles_card_horario.categoryStyle}> Fecha: {date}</Text>
                            <Text style={styles_card_horario.categoryStyle}> Hora de inicio: {time_start}</Text>
                            <Text style={styles_card_horario.categoryStyle}> Hora de fin: {time_end}</Text>
                            <Text style={styles_card_horario.categoryStyle}> Estado: {state}</Text>                            
                        </View>
                </View>
            </View>
        </TouchableOpacity>
       
     );
}




export default ClasesEventItem;