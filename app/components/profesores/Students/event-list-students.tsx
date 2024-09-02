import { Text, View, FlatList, RefreshControl } from "react-native";
import React from "react";
import EventItem from "../Disciplines/Subjects/event-item-subjects";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../screens/Home";
import EventItemAlumnosComplete from "./event-item-students";
//import { RootStackParamList } from "../screens/Home";

interface alumno {
  id: string;
  lastname:string;
  firstname:string;
}



interface EventListAlumnosProps {
  data2: alumno[];
  navigation: NativeStackNavigationProp<RootStackParamList>;
}


  
const EventList_alumnos_complete: React.FC<EventListAlumnosProps> = ({data2,navigation }) => {    
    //console.log("datalistalumnos",data)
    const renderItem = ({ item }: { item: alumno }) => (
      <View>
        <EventItemAlumnosComplete alumno_id={item.id} firstname={item.firstname} lastname={item.lastname} navigation={navigation} />
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
  
 
export default EventList_alumnos_complete;