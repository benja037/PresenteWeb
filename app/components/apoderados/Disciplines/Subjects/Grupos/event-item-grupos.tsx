
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet,Text, TouchableOpacity, View ,Image, Button, Alert } from "react-native";
import { RootStackParamList } from "../../../../../screens/Home";
import {styles_card_horario} from "../../../../../styles/stylesheet"
import { AntDesign } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store'
import axios from "axios";
//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;
interface GrupoEventItemProps {    
    grupo_id: string;
    name:string; 
    subject_id:string;   
    navigation: NativeStackNavigationProp<RootStackParamList>; 
}


const GrupoEventItem: React.FC<GrupoEventItemProps> = ({subject_id,grupo_id,name,navigation}) => {    
    return (       
        <TouchableOpacity onPress={()=>navigation.navigate("Grupo_detail",{grupo_id,subject_id})}>         
            <View style={styles.container}>
                <View style={styles.cardContainer}>                      
                        <View style={styles.infoStyle}>                            
                            <Text style={styles.titleStyle}>{name}</Text>                          

                            <View style={styles.iconLabelStyle}>
                            </View>
                        </View>
                </View>
            </View>
        </TouchableOpacity>
       
     );
}
const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'flex-start',
      marginTop: 5,
      marginBottom:15,
      marginLeft:15,
      //borderWidth:1,
      //borderColor:"black",
    },
    cardContainer: {
      width: '90%',
      backgroundColor: '#ffeaad',
      height: 70,
      borderRadius:20,
      marginLeft:5,
      shadowColor: '#000',
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 9,
      justifyContent: 'flex-start', // Esto mantiene el contenido del Card alineado a la izquierda horizontalmente
      alignItems: 'center', // Esto centrará verticalmente el contenido del Card
    },
    
    titleStyle: {
      fontSize: 20,
      fontWeight: '400',
    },
    categoryStyle: {
      fontWeight: '200',
    },
    infoStyle: {
      marginHorizontal: 10,
      marginTop: 15,
    },
    iconLabelStyle: {
      flexDirection: 'row',
      marginTop: 10,
    },
  });



export default GrupoEventItem;