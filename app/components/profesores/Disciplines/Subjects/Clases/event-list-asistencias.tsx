import { Text, View, FlatList, RefreshControl } from "react-native";
import React from "react";
import EventItemAlumnosAsistencias from "./event-item-alumnos-asistencias";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../../screens/Home";
//import { RootStackParamList } from "../screens/Home";

interface asistencias {
  id: string;
  student:alumno;
  user_previous_state:string;
  state:boolean;
}
interface alumno {
  id: string;
  lastname:string;
  firstname:string;
}



interface EventListAsistenciasProps {
  data2: asistencias[];
  navigation: NativeStackNavigationProp<RootStackParamList>;
  subject_id: string;
  clase_id:string;
  
}
  
  const EventListAsistencias: React.FC<EventListAsistenciasProps> = ({subject_id,clase_id,data2,navigation}) => {    
    //console.log("datalistalumnos",data)
    const renderItem = ({ item }: { item: asistencias }) => (
      <View>
        <EventItemAlumnosAsistencias subject_id={subject_id} asistencia_id={item.id} user_previous_state={item.user_previous_state} alumno_id={item.student.id} firstname={item.student.firstname} lastname={item.student.lastname} state={item.state} navigation={navigation} clase_id={clase_id}/>        
      </View>
      );
   
    return ( 
      <View>
        <FlatList
          data={data2}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
          
        />
      </View>
    );
  };
  
 
export default EventListAsistencias;