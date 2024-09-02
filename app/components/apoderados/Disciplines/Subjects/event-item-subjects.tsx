
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet,Text, TouchableOpacity, View ,Image } from "react-native";
import { RootStackParamList } from "../../../../screens/Home";
import {styles_card} from "../../../../styles/stylesheet"
import { AntDesign } from '@expo/vector-icons';
//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;
interface EventItemProps {
    subject_id: string;
    subject_name: string;   
    mode:string;
    num_max_students:string;
    cant_estudiantes_actuales:number;
    navigation: NativeStackNavigationProp<RootStackParamList>;
    rolled:boolean;
 
}


const EventItemSubjects: React.FC<EventItemProps> = ({subject_id,subject_name,navigation,mode,num_max_students,cant_estudiantes_actuales,rolled}) => {
    //const {subject_id} = route.params || {}
    return (       
        <TouchableOpacity onPress={()=>navigation.navigate("Subjects_detail",{subject_id})}>         
            <View style={styles_card.container}>
                <View style={styles_card.cardContainer}>                    
                    <Image style={styles_card.imageStyle} source = {require('../../../../screens/images/Cancha.jpg')} />
                        <View style={styles_card.infoStyle}>
                            <Text style={styles_card.titleStyle}>{subject_name}</Text>
                            <Text style={styles_card.categoryStyle}>{cant_estudiantes_actuales}/{num_max_students} </Text>

                            <View style={styles_card.iconLabelStyle}>
                                <Image 
                                    style={styles_card.statusImageStyle} 
                                    source={rolled ? require('../../../../screens/images/Inscrito-sin-fondo.png') : require('../../../../screens/images/No-inscrito-sin-fondo.png')} 
                                />
                                </View>                        
                            </View>                        
                </View>
            </View>
        </TouchableOpacity>
       
     );
}




export default EventItemSubjects;