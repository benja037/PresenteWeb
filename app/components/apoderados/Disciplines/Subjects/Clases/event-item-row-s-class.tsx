
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet,Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../../../screens/Home";
import axios from "axios";

//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;

interface EventItemAlumnosRowProps {
    alumno_id: string;
    firstname:string;
    lastname:string;    
    navigation: NativeStackNavigationProp<RootStackParamList>;  
    clase_id:string;
    subject_id:string;
}  

const EventItemSRowClass: React.FC<EventItemAlumnosRowProps> = ({ subject_id,clase_id,alumno_id,firstname,lastname, navigation}) => {
    
    return (       
        <TouchableOpacity key ={alumno_id} style = { styles.card }>
            <View>
                <Text style={styles.itemText}> {alumno_id} {firstname} {lastname}</Text>
            </View>           
            
        </TouchableOpacity>
       
     );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#c5c5c5',
        borderRadius: 10,
        padding: 10,
        alignSelf: 'stretch',
        marginBottom:2,
    },
    itemText: {
        textAlign: 'left',
    },
})

export default EventItemSRowClass;