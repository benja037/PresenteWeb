import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../Home';

type InformeSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subject_informe'>;
type Item = [string, { firstname: string; lastname: string; True: number; False: number; }];

const SubjectInformeProfesoresScreen: React.FC<InformeSubjectsProps> = ({ navigation,route }) => {
  const { subject_id } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/info/`);
      setData(response.data);
      /* console.log(response.data); */
    } catch (error) {
      /* console.error("Error:", error); */
    }
  }
  const postInformeMail = async () => {
    try {
      const response = await axios.post(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/info-mail/`);   
    } catch (error) {
      /* console.error("Error:", error); */
    }
  }

  const renderItem = ({ item }: { item: Item }) => {
    const [id, { firstname, lastname, True, False }] = item;
    const chartData = [
      { x: 'Asistencias', y: True },
      { x: 'Inasistencias', y: False }
    ];

    return (
      <View style={styles.itemContainer}>
        <Text>{`${firstname} ${lastname}`}</Text>
        <VictoryChart width={200} height={250} theme={VictoryTheme.material} domainPadding={{ x: 15 }}>
          <VictoryAxis dependentAxis />
          <VictoryAxis />
          <VictoryBar data={chartData} x="x" y="y" style={{
      data: { fill: "#3d8ff4" }
    }}/>
        </VictoryChart>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={postInformeMail} style={styles.addButtonTouch}>
                <Text style={styles.addButtonText}>Enviar Asistencias del subject al Mail</Text>
        </TouchableOpacity> 
        <FlatList
            data={Object.entries(data)}
            renderItem={renderItem}
            keyExtractor={(item) => item[0]}
        />
   
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    marginBottom: 20,
  },
  addButtonTouch: {
    backgroundColor: '#FFD700', // yellow background
    width:"55%",
    padding: 15,
    borderRadius: 10,
    alignItems:'center'
},
addButtonText: {
    fontSize: 18,
    color: '#3343CE',
    fontWeight: 'bold',
},
});

export default SubjectInformeProfesoresScreen;