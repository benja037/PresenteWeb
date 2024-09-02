import { Text, View, FlatList, RefreshControl } from "react-native";
import React from "react";
import EventItem from "./event-item-subjects";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../screens/Home";
import EventItemAlumnosComplete from "./event-item-students-select";
import EventItemProfesores from "./event-item-profesores";
//import { RootStackParamList } from "../screens/Home";

interface profesor {
  id: string;
  lastname:string;
  firstname:string;
}



interface EventListProfesoresProps {
  data: profesor[];
  navigation: NativeStackNavigationProp<RootStackParamList>;
}


  
const EventListProfesores: React.FC<EventListProfesoresProps> = ({data,navigation }) => {    
    //console.log("datalistalumnos",data)
    const renderItem = ({ item }: { item: profesor }) => (
      <View>
        <EventItemProfesores profesor_id={item.id} firstname={item.firstname} lastname={item.lastname} navigation={navigation} />
      </View>
      );
   
    return ( 
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          horizontal={true}          
        />
      </View>
    );
  };
  
 
export default EventListProfesores;