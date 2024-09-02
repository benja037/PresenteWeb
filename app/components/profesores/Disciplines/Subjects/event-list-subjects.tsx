import { Text, View, FlatList, RefreshControl } from "react-native";
import React from "react";
import EventItem from "./event-item-subjects";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../screens/Home";
import EventItemSubject from "./event-item-subjects";
//import { RootStackParamList } from "../screens/Home";

interface Item {
    id: string;
    subject_name: string;
    discipline_id: string;
    mode:string;
    num_max_students:string;
    rolled: boolean;
    students: object[];
  }
  


interface EventListSubjectsProps {
    data: Item[];
    navigation: NativeStackNavigationProp<RootStackParamList>;
    
  }
  
  const EventListSubjects: React.FC<EventListSubjectsProps> = ({ data,navigation }) => {
    
    const renderItem = ({ item }: { item: Item }) => (
      <View>
        <EventItemSubject subject_id={item.id} subject_name={item.subject_name} navigation={navigation} rolled={item.rolled} num_max_students={item.num_max_students} cant_estudiantes_actuales={item.students.length}/>
      </View>
    );
  
    return (
      <View style={{width:'100%'}}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}          
        />
      </View>
    );
  };
  
 
export default EventListSubjects;