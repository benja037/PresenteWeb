import { Text, View, FlatList, RefreshControl } from "react-native";
import React from "react";
import EventItem from "./event-item-disciplines";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../screens/Home";
//import { RootStackParamList } from "../screens/Home";

interface Item {
    id: string;
    discipline_name: string;
  }
  


interface EventListDisciplinesProps{
    data: Item[];
    navigation: NativeStackNavigationProp<RootStackParamList>;
    
  }
  
  const EventList: React.FC<EventListDisciplinesProps> = ({ data,navigation }) => {
    
    const renderItem = ({ item }: { item: Item }) => (
      <View>
        <EventItem discipline_id={item.id} discipline_name={item.discipline_name} navigation={navigation}/>
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
  
 
export default EventList;