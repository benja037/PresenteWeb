import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity,StyleSheet,Image  } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Home';
import { styles } from '../../../styles/stylesheet';


type Choose_studentProps = NativeStackScreenProps<RootStackParamList, 'Choose_student'>;
const MustChooseStudentProfileApoderadosScreen = ({ navigation }: Choose_studentProps) => {
  const { profiles, fetchProfiles, selectProfile,onLogout } = useAuth();

  useFocusEffect(
    React.useCallback(() => {
    if (fetchProfiles) {
      fetchProfiles();
    }
  },[])
);

const handleProfileSelect = async (profile: any) => {
  if (selectProfile) {
    await selectProfile(profile);
  }
};
const handleLogout = () => {
  
  try {
    if (onLogout){    
      onLogout(); // Intenta llamar a onLogout
    }
  } catch (error) {
    /* console.error('Error al cerrar sesión:', error); */ // Maneja cualquier error que ocurra durante el cierre de sesión
  }
};

  return (
    <View style={styles2.container}>
      <View style={styles2.block_header}>        
      </View>
      <View style={styles2.container_boxes_row}>
                <TouchableOpacity style={styles2.editbutton} onPress={handleLogout}>        
                    <Text style={styles.text_edit_button}>Cerrar Sesión</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles2.editbutton} onPress={() => navigation.navigate("Check_rut")}>        
                    <Text style={styles.text_edit_button}>Agregar Estudiante</Text>
                </TouchableOpacity>                        
                
     </View>
      <View style={styles2.container_profiles}>
        <Text style={{backgroundColor:'#fff'}}>Escoge el estudiante</Text>
      </View>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProfileSelect(item)} style={styles2.profileContainer}>
            <View style={styles2.imageContainer}>
            <Image source = {require('../../images/imagen-perfil.png')} style={styles2.profileImage}/>
            </View>
            <Text>{item.firstname} {item.lastname}</Text>
          </TouchableOpacity>
        )}
      />    
    </View>
  );
};

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_profiles: {
    marginBottom: 5,
    backgroundColor: "#e8e9d8"
  },
  block_header: {
    marginBottom: 5,
    width: '100%',
    height: 100,    
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    width: '90%',
  },
  imageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,    
    backgroundColor:'#ffff'
  },
  profileName: {
    marginTop: 5,
    textAlign: 'center',
  },
  addButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editbutton: {
    position:"relative",
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:90,
    height:40,
    backgroundColor:'#007BFF',
    borderRadius:50,
    marginTop:5,
    marginLeft:5,
    marginBottom:15
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    marginBottom:60
  },
  container_boxes_row : {               
    width:'95%',      
    flexDirection:'row',
    flexWrap:'wrap',  
  },
});
export default MustChooseStudentProfileApoderadosScreen;