import { Text, View, FlatList, RefreshControl,StyleSheet } from "react-native";
import React from "react";

import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../../screens/Home";
import ClasesEventItem from "./event-item-clases";
//import { RootStackParamList } from "../screens/Home";

interface Item {
    id:string;
    date: string;
    time_start:string;
    time_end:string;
    state: string;
    num_max_students:string;
    mode:string;
    label:string;

  }  

interface ClaseListProps {
    data: Item[];
    navigation: NativeStackNavigationProp<RootStackParamList>;
    subject_id:string;
    
  }
  
  const ClasesEventList: React.FC<ClaseListProps> = ({ data,subject_id,navigation }) => {
    
    const renderItem = ({ item }: { item: Item }) => (
      <View>
        <ClasesEventItem  subject_id = {subject_id} clase_id = {item.id} date = {item.date} time_start={item.time_start} time_end={item.time_end} state ={item.state} label={item.label} mode={item.mode} num_max_students={item.num_max_students} navigation={navigation}/>
      </View>
    );
  
    return (
      <View style={styles.container_flatlist}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>
    );
  };
  const styles = StyleSheet.create({
    container_flatlist: {
        flex:1              
    },
    

});  
 
export default ClasesEventList;