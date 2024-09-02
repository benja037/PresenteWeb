import { Text, View, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../../screens/Home";
import EventItemStudentsSelectClass from "./event-item-s-select-class";
//import { RootStackParamList } from "../screens/Home";

interface alumno {
  id: string;
  lastname:string;
  firstname:string;
}



interface EventListAlumnosProps {
  data2: alumno[];
  navigation: NativeStackNavigationProp<RootStackParamList>;
  subject_id:string;
  clase_id:string;
  handleRemoveFromList: (alumno_id: string) => void;
}


  
const EventList_students_select_class: React.FC<EventListAlumnosProps> = ({data2,navigation,subject_id,clase_id,handleRemoveFromList }) => { 
  
    //console.log("datalistalumnos",data)
    const renderItem = ({ item }: { item: alumno }) => (
      <View>
        <EventItemStudentsSelectClass clase_id={clase_id} alumno_id={item.id} firstname={item.firstname} lastname={item.lastname} navigation={navigation} subject_id={subject_id} handleRemoveFromList={handleRemoveFromList}/>
      </View>
      );
   
    return ( 
      <View>
        <FlatList
          data={data2}
          keyExtractor={item => item.id}
          renderItem={renderItem}          
        />
      </View>
    );
  };
  
 
export default EventList_students_select_class;