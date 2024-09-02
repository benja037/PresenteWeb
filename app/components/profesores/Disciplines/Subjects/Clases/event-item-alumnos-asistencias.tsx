
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
    clase_id:string;
  }

const EventItemAlumnosAsistencias: React.FC<EventItemAlumnosProps> = ({subject_id,asistencia_id,alumno_id,firstname,lastname,state,user_previous_state, navigation,clase_id }) => {
    const [isChecked, setIsChecked] = useState(state);
    /* console.log("estado", state, " de", firstname) */
    const handleCheckboxChange = async () => {
        if (isChecked==false){
            setIsChecked(true); // Cambia el estado del checkbox
            /* console.log("estadoo_ischecked",isChecked) */
            // Aquí colocarías la lógica para hacer la solicitud PUT
            try {
                const token = await SecureStore.getItemAsync('tikin');
    
                const response = await axios.put(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/attendances/${asistencia_id}/`, {state:true,
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });
                /* console.log("PUT:", response.data);  */           
        
            } catch (error) {
                /* console.error("Error:", error); */            
            } 
        } else {
            setIsChecked(false); // Cambia el estado del checkbox
            /* console.log("estadoo_ischecked",isChecked) */
            try {
                const token = await SecureStore.getItemAsync('tikin');
    
                const response = await axios.put(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/attendances/${asistencia_id}/`, {state:false,
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });
                /* console.log("PUT:", response.data);  */           
        
            } catch (error) {
                /* console.error("Error:", error);   */          
            } 
        }
    }
    return (      
        
        <View style={styles.row}>
            <TouchableOpacity key ={alumno_id} style = { styles.card } onPress={()=>navigation.navigate("Alumno_perfil_clase",{alumno_id,clase_id,subject_id})}>
                <View>
                    <Text style={styles.itemText}> {firstname} {lastname} ({user_previous_state})</Text>
                </View>           
            
            </TouchableOpacity>
            <View style={styles.box_right}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={handleCheckboxChange} />
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
        flex:1
    },
    checkbox: {
        margin: 8,
    },
    row:{
        flexDirection:'row', 

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
    itemText: {
        textAlign: 'left',
    },
})

export default EventItemAlumnosAsistencias;