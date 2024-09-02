import { Text, View,StyleSheet } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { RootStackParamList } from "./Home";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

type DetailUserProps = NativeStackScreenProps<RootStackParamList,'Profile'>;

const Profile:React.FC<DetailUserProps> = ({navigation,route}) => {
  const [date_of_birth,setDate_of_birth] =useState('')
  const [firstname,setFirstname] =useState('')
  const [lastname,setLastname] =useState('')
  const [gender,setGender] =useState('')
  const [phone_number,setPhone_number] =useState('')
  const [document_type,setDocument_number] =useState('')
  const [document_number,setDocument_type] =useState('')
  useFocusEffect(
    React.useCallback(() => {            
    fetchData()                   
  },[])
  );

  const fetchData = async() => {
    try {
       

        const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/profile/`, {
        });
        /* console.log("USER RETRIEVE",response.data) */
        setDate_of_birth(response.data.date_of_birth)
        setFirstname(response.data.firstname)
        setLastname(response.data.lastname)
        setGender(response.data.gender)
        setPhone_number(response.data.phone_number)
        setDocument_number(response.data.document_number)
        setDocument_type(response.data.document_type)
       
    } catch (error) {
        /* console.error("Error:", error); */
        
    }
   
}

  return (
    <View style={{flex:1,alignItems:'center'}}>
            <View style={styles2.headerInfo}>        
                <Text>Nombre: {firstname}</Text>           
                <Text>Apellido: {lastname}</Text>           
                <Text>Fecha de Nacimiento: {date_of_birth}</Text>
                <Text>Género: {gender}</Text>
                <Text>Phone_number: {phone_number}</Text>
                <Text>Document_type: {document_type}</Text>
                <Text>Document_number: {document_number}</Text>            
            </View>
        </View>
        
  )
}

export default Profile

const styles2 = StyleSheet.create({
  headerInfo: {
      marginBottom: 10,
      marginTop:10,
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      width:'90%'
  
  },
  headerText: {
      fontSize: 18,
      color: '#333',
  },
}
);