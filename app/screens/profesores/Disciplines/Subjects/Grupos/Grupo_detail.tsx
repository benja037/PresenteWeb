import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../Home";
import React from "react";

import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import EventList_alumnos_row_grupo from "../../../../../components/profesores/Disciplines/Subjects/Grupos/event-list-s-row-grupos";
import { TouchableOpacity } from "react-native-gesture-handler";

//import EventList_alumnos_complete from "../../../../../components/profesores/Disciplines/Subjects/Grupos/event-list-s-row-grupo";

type GrupoDetailProps = NativeStackScreenProps<RootStackParamList,'Grupo_detail'>;

const GrupoDetailProfesoresScreen: React.FC<GrupoDetailProps> = ({navigation,route}) => {  
    const { grupo_id,subject_id } = route.params;        
    const [alumnos, setAlumnos] = useState([])    
    const [group_name, setGroup_name] = useState([])    
    const [loading, setLoading] = useState(true);
    
   // const [data2, setData2] = React.useState<any>(null); // Usando un estado para almacenar los datos obtenidos
    useFocusEffect(
        React.useCallback(() => {            
            async function getData() {
                await fetchData();
            }getData()                  
    },[])
    );

    const fetchData = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/groups/${grupo_id}/`, {});            
            setAlumnos(response.data.students );
            setGroup_name(response.data.name );
            /* console.log("ALUMNOS",response.data.alumnos)   */          
            
        } catch (error) {
            /* console.error("Error:", error); */
        } finally {
            setLoading(false);
        }
       
    }
    


    const renderAlumnoItem = ({ item }: { item: any }) => (
        <View>
            <Text>{item.id} - {item.admin.firstname} - {item.admin.lastname}</Text> 
        </View>
    );
    

    if (loading) {
        return (
            <View style={styles2.screen}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    return ( 
        <View style={styles2.screen}>
            <Text style={{fontSize:22,marginBottom:15}}>{group_name}</Text>
            <Text>Lista de Alumnos:</Text>
            <EventList_alumnos_row_grupo data2={alumnos} navigation={navigation} subject_id={subject_id} grupo_id={grupo_id} />   
            <TouchableOpacity style={styles2.editbutton} onPress={()=> navigation.navigate("Edit_grupo_alumnos",{grupo_id,subject_id})}>
                <Text style={styles2.text_edit_button}>Agregar Alumnos</Text>
            </TouchableOpacity>        
            
        </View>
     
    );
}
 
export default GrupoDetailProfesoresScreen
;
const styles2 = StyleSheet.create({
    screen: {
        padding: 20,
    },
    editbutton: {
        position:"relative",
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:130,
        height:40,
        backgroundColor:'#c2f4be',
        borderRadius:50,
        marginTop:5,
      },
    text_edit_button: {
        fontSize: 12, 
        padding:8
         
      },
})