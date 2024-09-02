
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet,Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../../screens/Home";

//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;

interface EventItemProfesoresProps {
    profesor_id: string;
    firstname:string;
    lastname:string;
    navigation: NativeStackNavigationProp<RootStackParamList>;
  }

const EventItemProfesores: React.FC<EventItemProfesoresProps> = ({ profesor_id,firstname,lastname, navigation }) => {
    return (       
        <TouchableOpacity key ={profesor_id} style = { styles.card }>
            <View>
                <Text style={styles.itemText}> {firstname} {lastname}</Text>
            </View>
            
        </TouchableOpacity>
       
     );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#c5c5c5',
        borderRadius: 10,
        padding: 10,
        alignSelf: 'stretch',
        marginBottom:2,
    },
    itemText: {
        textAlign: 'left',
    },
})

export default EventItemProfesores;