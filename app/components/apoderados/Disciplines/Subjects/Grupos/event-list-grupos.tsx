import { Text, View, FlatList, RefreshControl,StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import HorarioEventItem from "./event-item-grupos";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../../screens/Home";
import GrupoEventItem from "./event-item-grupos";
//import { RootStackParamList } from "../screens/Home";

interface Item {
    id:string;    
    name:string;  
  }
  


interface GrupoListProps {
    data: Item[];    
    navigation: NativeStackNavigationProp<RootStackParamList>;    
    subject_id:string,
  }



  
const GruposEventList: React.FC<GrupoListProps> = ({ subject_id,data,navigation}) => {  
  
  const renderItem = ({ item }: { item: Item }) => (
    <View >
      <GrupoEventItem  grupo_id={item.id} name={item.name} navigation={navigation} subject_id={subject_id}/>
    </View>
  );

  return (
    <View>      
        <View>          
          <FlatList
            data={data}
            horizontal={true}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()} // Usando el índice como clave única
          />
        </View>
      
    </View>
  );
};
  
  
 
export default GruposEventList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },
  dayHeader: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 5,
  },
  
});