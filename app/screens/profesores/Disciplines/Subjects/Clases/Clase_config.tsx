import { View, Image, Text, Button, StyleSheet, TextInput, Pressable, Platform, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../Home';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import 'moment/locale/es';
import { useFocusEffect } from '@react-navigation/native';

type ConfigClaseProps = NativeStackScreenProps<RootStackParamList, 'Clase_config'>;
const ConfigClaseProfesoresScreen = ({ navigation, route }:ConfigClaseProps) => {
    const {subject_id,clase_id,num_max_alumnos,state,mode,date,time_start,time_end,label} = route.params;
    const [new_estado, setNew_estado] = useState(state);   
    
    //TIME1
    const [selectedTime, setSelectedTime] = useState(time_start);   //Start String Final 
    const [newTime, setNewTime] = useState(time_start);    //Start String Inicial
    const [newTime_date,setNewTime_date] = useState(new Date()); //Start Date
    //TIME2
    const [selectedTimeEnd, setSelectedTimeEnd] = useState(time_end);  //End String Final
    const [newTimeEnd, setNewTimeEnd] = useState(time_end);     //End String Inicial
    const [newTimeEnd_date,setNewTimeEnd_date] = useState(new Date()); //End Date
    //DATE
    const [dateString, setDateString] = useState(date); //Date Final String
    const [newDate, setNewDate] = useState(date); //Date String Inicial    
    const [newDate_date, setNewDate_date] = useState(new Date()); //Date String Inicial    
    


    useEffect(
                    
            (
                ()=>{
                    /* console.log("subject_id", subject_id)
                    console.log("clase_id", clase_id)
                    console.log("num_max_alumnos", num_max_alumnos)
                    console.log("state", state)
                    console.log("mode", mode)
                    console.log("date", date)
                    console.log("time_start", time_start)
                    console.log("time_end", time_end)
                    console.log("label", label)  */                
                    
                    
                    //TIME1
                    const [hours, minutes, seconds] = newTime.split(':');                             
                    newTime_date.setHours(Number(hours));
                    newTime_date.setMinutes(Number(minutes));
                    newTime_date.setSeconds(Number(seconds));
                    
                    //TIME2                      
                    const [hours_end, minutes_end, seconds_end] = newTimeEnd.split(':');                     
                    newTimeEnd_date.setHours(Number(hours_end));
                    newTimeEnd_date.setMinutes(Number(minutes_end));
                    newTimeEnd_date.setSeconds(Number(seconds_end));

                    /* console.log("newTime_date", newTime_date)
                    console.log("newTimeEnd_date", newTimeEnd_date) */

                    //DATE
                    const [year_date, month_date, day_date] = newDate.split('-').map(Number);
                    setNewDate_date(new Date(year_date, month_date - 1, day_date));
                }
            )                      
    ,[])
    ;
    
    
    

    //DATE
    
    
    
    const [showPicker, setShowPicker] = useState(false);
    const [showPickerTime, setShowPickerTime] = useState(false);
    const [showPickerTimeEnd, setShowPickerTimeEnd] = useState(false);
    const [new_num_max_alumnos,setNew_num_max_alumnos] = useState(num_max_alumnos)
    const [new_label,setNew_label] = useState(label)
    const [new_mode,setNew_mode] = useState(mode)

    //TIME1
    const toggleTimepicker = () => {
        setShowPickerTime(!showPickerTime)
    }; 
    //TIME2
    const toggleTimeEndpicker = () => {
        setShowPickerTimeEnd(!showPickerTimeEnd)
    }; 
    //TIME1
    const onChangeTime = ({ type }: { type: string },selectedTime:any) => {
        if (type == "set"){
            const currentTime = selectedTime;
            setNewTime_date(currentTime);
            
            if (Platform.OS === "android"){
                toggleTimepicker();
                setSelectedTime(formatTime(newTime_date));
            }

        } else {
            toggleTimepicker();
        }

    };
    //TIME1
    const confirmIOSTime = () =>{
        setSelectedTime(formatTime(newTime_date));
        toggleTimepicker();

    };
    //TIME1
    const formatTime = (rawDate: Date | string) => {
        const date = typeof rawDate === 'string' ? new Date(rawDate) : rawDate;
        if (isNaN(date.getTime())) {
            /* console.error("La fecha proporcionada no es válida"); */
            return ""; // Retorna una cadena vacía si la fecha no es válida
        }
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = '00';

        

        return `${hours}:${minutes}:${seconds}`;

    };
    //TIME2
    const formatTime2 = (rawDate: Date | string) => {
        const date = typeof rawDate === 'string' ? new Date(rawDate) : rawDate;
        if (isNaN(date.getTime())) {
            /* console.error("La fecha proporcionada no es válida"); */
            return ""; // Retorna una cadena vacía si la fecha no es válida
        }
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = '00';

        

        return `${hours}:${minutes}:${seconds}`;

    };
    //TIME2
    const onChangeTimeEnd = ({ type }: { type: string },selectedTimeEnd:any) => {
        if (type == "set"){
            const currentTimeEnd = selectedTimeEnd;
            setNewTimeEnd_date(currentTimeEnd);
            
            if (Platform.OS === "android"){
                toggleTimeEndpicker();
                setSelectedTimeEnd(formatTime2(newTimeEnd_date));
            }

        } else {
            toggleTimeEndpicker();
        }

    };
    //TIME2
    const confirmIOSTimeEnd = () =>{
        setSelectedTimeEnd(formatTime2(newTimeEnd_date));
        toggleTimeEndpicker();

    };
    
   
    //DATE
    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    }; 
    //DATE
    const onChange = ({ type }: { type: string },selectedDate:any) => {
        if (type == "set"){
            const currentDate = selectedDate;
            setNewDate_date(currentDate);
            
            if (Platform.OS === "android"){
                toggleDatepicker();
                setDateString(formatDate(newDate_date));
            }

        } else {
            toggleDatepicker();
        }

    };
    //DATE
    const confirmIOSDate = () =>{
        setDateString(formatDate(newDate_date));
        toggleDatepicker();
    };
    //DATE
    const formatDate = (rawDate: Date | string) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let formattedMonth  = month < 10 ? `0${month}` : month;
        let formattedDay = day < 10 ? `0${day}` : day;

        return `${year}-${formattedMonth}-${formattedDay}`;

    }
    
    const patch_clase = async () => {
        try {
            /* console.log("PUT PARAMETERS",dateString,selectedTime,selectedTimeEnd,new_num_max_alumnos,new_mode,new_label,new_estado) */
            
            const response = await axios.patch(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/class/${clase_id}/`, {date:dateString,time_start:selectedTime,time_end:selectedTimeEnd,num_max_students:new_num_max_alumnos,mode:new_mode,label:new_label,state:new_estado,
                
            });
            /* console.log("RESPONSE axios result", response)
            console.log("axios result", response.data) */
            navigation.goBack();
            
        } catch (error) {
            /* console.error("Error:", error); */
        }
      };
      const delete_clase = async () => {
        try {
            // Antes de eliminar, pedir confirmación al usuario
            Alert.alert(
                'Confirmar eliminación',
                '¿Estás seguro que quieres eliminar la clase?',
                [
                    {
                        text: 'Cancelar',
                        /* onPress: () => console.log('Cancelado'), */
                        style: 'cancel',
                    },
                    {
                        text: 'Sí',
                        onPress: async () => {
                            const response = await axios.delete(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/class/${clase_id}/`);
                            //console.log("axios result", response.data)
                            Alert.alert('Clase borrada', 'Se ha borrado la clase exitosamente', [
                                { text: 'OK', onPress: () => navigation.popToTop() }
                            ]);
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            /* console.error("Error:", error); */
        }
      };
    const go_off_clase = async () => {
        try {
            // Antes de eliminar, pedir confirmación al usuario
            Alert.alert(
                'Confirmar eliminación',
                '¿Estás seguro que dejar de ser Profesor de esta clase?',
                [
                    {
                        text: 'Cancelar',
                        /* onPress: () => console.log('Cancelado'), */
                        style: 'cancel',
                    },
                    {
                        text: 'Sí',
                        onPress: async () => {
                            const response = await axios.delete(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/class/${clase_id}/go-off/`);
                            //console.log("axios result", response.data)
                            Alert.alert('Saliste de la clase', 'Dejaste la clase exitosamente', [
                                { text: 'OK', onPress: () => navigation.popToTop() }
                            ]);
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
           /*  console.error("Error:", error); */
        }
      };

    return (
    <View style ={styles.container}>        
        <View style={styles.form}> 
            <View style={styles.inputContainer}>
                <View style={{width:'15%'}}>
                    <Text style={styles.placeholderText}>Fecha: </Text>
                </View>
                
                <View style={styles.onlyinputContainer}>
                {/* DATE  */}
                {showPicker && (<DateTimePicker  
                timeZoneName={'America/Santiago'}
                locale="es"         
                mode="date"
                display='spinner'
                value={newDate_date}
                onChange={onChange}
                style = {styles.datePicker}
                />
                )}
                {showPicker && Platform.OS === "ios" && (
                    <View
                        style = {{ flexDirection:"row",
                        justifyContent: 'space-around'}}
                    >
                        <TouchableOpacity style={[
                            styles.button,
                            styles.pickerButton,
                            { backgroundColor: "#11182711"}
                        ]}
                        onPress = {toggleDatepicker}
                        >
                            <Text style={[
                                styles.buttonText,
                                { color: "#075985"}
                            ]}
                            >Cancel</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={[
                            styles.button,
                            styles.pickerButton,
                            
                        ]}
                        onPress = {confirmIOSDate}
                        >
                            <Text style={[
                                styles.buttonText,                            
                            ]}
                            >Confirm</Text>

                        </TouchableOpacity>

                </View>
            
                )}               
            
            {!showPicker && (
                <Pressable onPress = {toggleDatepicker}>
                    
                    <TextInput
                        style={styles.input}
                        placeholder={date}
                        value = {dateString}
                        onChangeText = {setDateString}
                        placeholderTextColor={'#11182744'}
                        editable={false}
                        onPressIn = {toggleDatepicker}
                        />
                </Pressable>
            )}

                    
                </View>
            </View>
            {/* TIME */}
            <View style={styles.inputContainer}>
                <View style={{width:'15%'}}>
                    <Text style={styles.placeholderText}>Hora_inicio: </Text>
                </View>
                <View style={styles.onlyinputContainer}>
            {showPickerTime && (<DateTimePicker  
            timeZoneName={'America/Santiago'}          
            mode="time"
            display='spinner'
            value={newTime_date}
            onChange={onChangeTime}
            style = {styles.datePicker}
            />
            )}
            {showPickerTime && Platform.OS === "ios" && (
                <View
                    style = {{ flexDirection:"row",
                    justifyContent: 'space-around'}}
                >
                    <TouchableOpacity style={[
                        styles.button,
                        styles.pickerButton,
                        { backgroundColor: "#11182711"}
                    ]}
                    onPress = {toggleTimepicker}
                    >
                        <Text style={[
                            styles.buttonText,
                            { color: "#075985"}
                        ]}
                        >Cancel</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={[
                        styles.button,
                        styles.pickerButton,
                        
                    ]}
                    onPress = {confirmIOSTime}
                    >
                        <Text style={[
                            styles.buttonText,                            
                        ]}
                        >Confirm</Text>

                    </TouchableOpacity>

                </View>
            )}
            {!showPickerTime && (
                <Pressable onPress = {toggleTimepicker} style={{width:'80%'}}>
                    
                    <TextInput
                        style={styles.input}
                        placeholder={time_start}
                        value = {selectedTime}
                        onChangeText = {setSelectedTime}
                        placeholderTextColor={'#11182744'}
                        editable={false}
                        onPressIn = {toggleTimepicker}
                        />
                </Pressable>
            )}  
        </View>
        </View>
        {/* TIME2 */}
        <View style={styles.inputContainer}>
            <View style={{width:'15%'}}>
                <Text style={styles.placeholderText}>Hora_fin: </Text>
            </View>
                <View style={styles.onlyinputContainer}>
        {showPickerTimeEnd && (<DateTimePicker  
            timeZoneName={'America/Santiago'}          
            mode="time"
            display='spinner'
            value={newTimeEnd_date}
            onChange={onChangeTimeEnd}
            style = {styles.datePicker}
            />
            )}
            {showPickerTimeEnd && Platform.OS === "ios" && (
                <View
                    style = {{ flexDirection:"row",
                    justifyContent: 'space-around'}}
                >
                    <TouchableOpacity style={[
                        styles.button,
                        styles.pickerButton,
                        { backgroundColor: "#11182711"}
                    ]}
                    onPress = {toggleTimeEndpicker}
                    >
                        <Text style={[
                            styles.buttonText,
                            { color: "#075985"}
                        ]}
                        >Cancel</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={[
                        styles.button,
                        styles.pickerButton,
                        
                    ]}
                    onPress = {confirmIOSTimeEnd}
                    >
                        <Text style={[
                            styles.buttonText,                            
                        ]}
                        >Confirm</Text>

                    </TouchableOpacity>

                </View>
            )}
            {!showPickerTimeEnd && (
                <Pressable onPress = {toggleTimeEndpicker}>
                    
                    <TextInput
                        style={styles.input}
                        placeholder={time_end}
                        value = {selectedTimeEnd}
                        onChangeText = {setSelectedTimeEnd}
                        placeholderTextColor={'#11182744'}
                        editable={false}
                        onPressIn = {toggleTimeEndpicker}
                        />
                </Pressable>
            )}
            </View>
        </View>
        <View style={styles.inputContainer}>
            <View style={{width:'15%'}}>
                <Text style={styles.placeholderText}>Número Máximo Estudiantes</Text>
            </View>
            <View style={styles.onlyinputContainer}>       
                <TextInput style={styles.input} placeholder={new_num_max_alumnos.toString()} onChangeText={(text: string) => setNew_num_max_alumnos(text)} value={new_num_max_alumnos} />
            </View>
        </View>
        <View style={styles.inputContainer}>
            <View style={{width:'15%'}}>
                <Text style={styles.placeholderText}>Label</Text>
            </View>
            <View style={styles.onlyinputContainer}>       
                <TextInput style={styles.input} placeholder={label} onChangeText={(text: string) => setNew_label(text)} value={new_label} />
            </View>
        </View>
        <View style={styles.ContainerRow}>            
            <View style={styles.pickerRight}>
                <Picker
                    selectedValue={new_estado}
                    onValueChange={(itemValue, itemIndex) =>
                    setNew_estado(itemValue)
                    }>
                <Picker.Item label="proximamente" value="proximamente" />
                <Picker.Item label="realizada" value="realizada" />
                <Picker.Item label="cancelada" value="cancelada" />
                </Picker>                                              
            </View>
        </View>
        <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.editbutton} onPress={patch_clase}>        
                <Text style={styles.text_edit_button}>Guardar</Text>
            </TouchableOpacity>
        </View>            
        
        {/* <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={delete_clase} style={styles.deleteButton}>
                <Text style={styles.buttonText2}>Borrar clase</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={go_off_clase} style={styles.deleteButton}>
                <Text style={styles.buttonText2}>Salir de la clase</Text>
            </TouchableOpacity> 
        </View> */}

            
        
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
    ContainerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',// Ajusta el margen según sea necesario
        
    },
    pickerRight: {
        width:170,
        height:200,  
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',// Ajusta el margen según sea necesario
        width:'100%',
    },
    onlyinputContainer: {
        flexDirection: 'column',
        alignItems: 'baseline',// Ajusta el margen según sea necesario
        width:'80%',        
        marginLeft:40,
    },
    placeholderText: {
        width:100,
        marginRight: 10, // Ajusta el margen según sea necesario
        fontSize: 16, // Ajusta el tamaño de fuente según sea necesario
        color: '#333', // Ajusta el color del texto según sea necesario
    },
    checkbox: {
        margin: 8,
    },
    image: {
        width:'25%',
        height:'25%',
        resizeMode: 'contain',
    },
    form: {
        gap: 10,
        width:'100%',
        
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        width:200,
        backgroundColor: '#fff',

    },
    container: {
        alignItems: 'flex-start',
        flex: 1,
        justifyContent: 'space-between', // Alinea los elementos de manera uniforme verticalmente
        paddingHorizontal: 20, // Espacio horizontal en los lados de la pantalla
        paddingBottom: 20, // Espacio inferior

    },
    button:{
        height:50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: '#075985'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#fff"
    },
    datePicker: {
        height: 120,
        marginTop: -10,
        width:'90%',
    },
    pickerButton: {
        paddingHorizontal: 20,
    },
    buttonContainer: {
        alignItems: 'center', // Alinea los elementos al centro horizontalmente
        marginBottom:250
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop:5
    },
    buttonText2: {
        color: 'white',
        fontWeight: 'bold',
    },
    editbutton: {
        position:"relative",
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:90,
        height:40,
        backgroundColor:'#c2f4be',
        borderRadius:50,
        marginTop:5,
      },
    text_edit_button: {
        fontSize: 9, 
        padding:8         
      },


});

export default ConfigClaseProfesoresScreen