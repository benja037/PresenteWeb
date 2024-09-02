
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Alert, StyleSheet,Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../../../screens/Home";
import axios from "axios";

//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;

interface EventItemAlumnosProps {
    alumno_id: string;
    firstname:string;
    lastname:string;
    navigation: NativeStackNavigationProp<RootStackParamList>;   
    clase_id:string;
    subject_id:string;
    handleRemoveFromList: (alumno_id: string) => void;
  
  }

const EventItemStudentsSelectClass: React.FC<EventItemAlumnosProps> = ({ subject_id,clase_id,alumno_id,firstname,lastname, navigation,handleRemoveFromList }) => {   
    const post_alumno = async () => {         
        try { 
            const response = await axios.post(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/class/${clase_id}/students/`, {student_pk:alumno_id
                
            });
            /* console.log("axios result", response.data) */
            handleRemoveFromList(alumno_id);
   
            //navigation.goBack();
            
        } catch (error:any) {
            /* console.error("Errors:", error);  */           
            if (error.response.data) {
                //console.log("axios result", error.response.data)
                alert(error.response.data.message);
            }
        
        }
    }
    const handlePostStudent = () => {        
        post_alumno()
      };
    return ( 
        <View style={{flexDirection:'row',marginTop:15}}> 
            <View style={{width:'70%'}}>
                <TouchableOpacity key ={alumno_id} style = { styles.card } onPress={()=>navigation.navigate("Alumno_perfil",{alumno_id})}>
                    <View>
                        <Text style={styles.itemText}> {alumno_id} {firstname} {lastname}</Text>
                    </View>                    
                </TouchableOpacity>
            </View>
            <View style = {{marginLeft:15}}>
                <TouchableOpacity style={styles.addButtonTouch} onPress={handlePostStudent}>
                    <Text style={styles.addButtonTouch}>Agregar</Text>
                </TouchableOpacity>
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
        alignSelf: 'stretch',
        marginBottom:2,
    },
    itemText: {
        textAlign: 'left',
    },
    addButtonTouch: {
        backgroundColor: 'green', // yellow background
        width:"100%",
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 9,
        color: '#231f20',
        fontWeight: 'bold',
    },
})

export default EventItemStudentsSelectClass;