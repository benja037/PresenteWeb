import { View, Image, Text, Button, StyleSheet, TextInput, Pressable, Platform, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../Home';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import 'moment/locale/es';

interface Grupo {
    id:string;
    name:string;    
}

type AddClaseProps = NativeStackScreenProps<RootStackParamList, 'Add_clase'>;
const AddClaseProfesoresScreen = ({ navigation, route }:AddClaseProps) => {
    const {subject_id} = route.params;
    const [estado, setEstado] = useState('proximamente');
    //TIME1
    const [selectedTime, setSelectedTime] = useState('');    
    const [time, setTime] = useState(new Date());
    //TIME2
    const [selectedTimeEnd, setSelectedTimeEnd] = useState('');    
    const [timeEnd, setTimeEnd] = useState(new Date());
    

    //DATE
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState('');
    
    const [showPicker, setShowPicker] = useState(false);
    const [showPickerTime, setShowPickerTime] = useState(false);
    const [showPickerTimeEnd, setShowPickerTimeEnd] = useState(false);
    const [num_max_alumnos,setNum_max_alumnos] = useState('')
    const [label,setLabel] = useState('')
    const [mode,setMode] = useState('privado')
    const [grupos,setGrupos] = useState<Grupo[]>([]);
    const [selectedGroup,setSelectedGroup] = useState('')
    


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
            setTime(currentTime);
            
            if (Platform.OS === "android"){
                toggleTimepicker();
                setSelectedTime(formatTime(time));
            }

        } else {
            toggleTimepicker();
        }

    };
    //TIME1
    const confirmIOSTime = () =>{
        setSelectedTime(formatTime(time));
        toggleTimepicker();

    };
    //TIME1
    const formatTime = (rawDate: Date | string) => {
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const seconds = '00';

        

        return `${hours}:${minutes}:${seconds}`;

    };
    //TIME2
    const formatTime2 = (rawDate: Date | string) => {
        const hours = timeEnd.getHours().toString().padStart(2, '0');
        const minutes = timeEnd.getMinutes().toString().padStart(2, '0');
        const seconds = '00';

        

        return `${hours}:${minutes}:${seconds}`;

    };
    //TIME2
    const onChangeTimeEnd = ({ type }: { type: string },selectedTimeEnd:any) => {
        if (type == "set"){
            const currentTimeEnd = selectedTimeEnd;
            setTimeEnd(currentTimeEnd);
            
            if (Platform.OS === "android"){
                toggleTimeEndpicker();
                setSelectedTimeEnd(formatTime2(timeEnd));
            }

        } else {
            toggleTimeEndpicker();
        }

    };
    //TIME2
    const confirmIOSTimeEnd = () =>{
        setSelectedTimeEnd(formatTime2(timeEnd));
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
            setDate(currentDate);
            
            if (Platform.OS === "android"){
                toggleDatepicker();
                setDateString(formatDate(date));
            }

        } else {
            toggleDatepicker();
        }

    };
    //DATE
    const confirmIOSDate = () =>{
        setDateString(formatDate(date));
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
    const fetchGrupos = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/groups/`, {});
           
            /* console.log("Fetchdata2");
            console.log("Grupos:", response.data); */
            setGrupos(response.data);          
        } catch (error) {
            /* console.error("Error:", error);  */           
        }
       
    }
    useEffect(() => {
        fetchGrupos();
    }, []);
    
    const post_clase = async () => {
        try {          
            /* console.log("DATETIME",time)   */          
            const response = await axios.post(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/class/`, {date:dateString,time_start:selectedTime,time_end:selectedTimeEnd,num_max_students:num_max_alumnos,mode:mode,label:label,state:'proximamente',group_id:selectedGroup
                
            });
            /* console.log("RESPONSE axios result", response)
            console.log("axios result", response.data) */
            navigation.goBack();
            
        } catch (error) {
            /* console.error("Error:", error); */
        }
      };

    return (
    <View style ={styles.container}>        
        <View style={styles.form}> 
            <View style={styles.inputContainer}>
                <View style={styles.onlytextContainer}>
                    <Text style={styles.placeholderText}>Fecha</Text>
                </View>
                <View style={{flexDirection:"column",width:'100%'}}>
                    {/* DATE  */}
                {showPicker && (<DateTimePicker  
                timeZoneName={'America/Santiago'}
                locale="es"         
                mode="date"
                display='spinner'
                value={date}
                onChange={onChange}
                style = {styles.datePicker}
                />
                )}
                {showPicker && Platform.OS === "ios" && (
                    <View
                        style = {{ flexDirection:"row",
                        justifyContent: 'center'}}
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
                    <Pressable onPress = {toggleDatepicker} style={{width:'60%'}}>
                        <View style={styles.onlyinputTimeContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder={formatDate(date)}
                                value = {dateString}
                                onChangeText = {setDateString}
                                placeholderTextColor={'#11182744'}
                                editable={false}
                                onPressIn = {toggleDatepicker}
                                />
                        </View>
                    </Pressable>
                )}
                </View>
                

            </View>
            
            {/* TIME */}
            <View style={styles.inputContainer}>
                <View style={styles.onlytextContainer}>
                    <Text style={styles.placeholderText}>Hora de Inicio</Text>
                </View>
            {showPickerTime && (<DateTimePicker  
            timeZoneName={'America/Santiago'}          
            mode="time"
            display='spinner'
            value={time}
            onChange={onChangeTime}
            style = {styles.timePicker}
            />
            )}
            {showPickerTime && Platform.OS === "ios" && (
                <View
                    style = {{ flexDirection:"column",
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
                <Pressable onPress = {toggleTimepicker} style={{width:'60%'}}>
                    <View style={styles.onlyinputTimeContainer}>           
                        <TextInput
                            style={styles.input}
                            placeholder='12:00:00'
                            value = {selectedTime}
                            onChangeText = {setSelectedTime}
                            placeholderTextColor={'#11182744'}
                            editable={false}
                            onPressIn = {toggleTimepicker}
                            />
                    </View>
                </Pressable>
            )}  
        </View>
        {/* TIME2 */}
        <View style={styles.inputContainer}>
            <View style={styles.onlytextContainer}>
                <Text style={styles.placeholderText}>Hora de Fin</Text>
            </View>
        {showPickerTimeEnd && (<DateTimePicker  
            timeZoneName={'America/Santiago'}          
            mode="time"
            display='spinner'
            value={timeEnd}
            onChange={onChangeTimeEnd}
            style = {styles.timePicker}
            />
            )}
            {showPickerTimeEnd && Platform.OS === "ios" && (
                <View
                    style = {{ flexDirection:"column",
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
                <Pressable onPress = {toggleTimeEndpicker} style={{width:'60%'}}>
                    <View style={styles.onlyinputTimeContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='12:00:00'
                            value = {selectedTimeEnd}
                            onChangeText = {setSelectedTimeEnd}
                            placeholderTextColor={'#11182744'}
                            editable={false}
                            onPressIn = {toggleTimeEndpicker}
                            />
                    </View>
                </Pressable>
            )}
        </View>
        <View style={styles.inputContainer}>
            <View style={styles.onlytextContainer}>
                <Text style={styles.placeholderText}>Número Máximo Estudiantes</Text>
            </View>
            <View style={styles.onlyinputContainer}>       
                <TextInput style={styles.input} placeholder="num max. alumnos" onChangeText={(text: string) => setNum_max_alumnos(text)} value={num_max_alumnos} />
            </View>
        </View>
        <View style={styles.inputContainer}>
            <View style={styles.onlytextContainer}>
                <Text style={styles.placeholderText}>Titulo</Text>
            </View>            
            <View style={styles.onlyinputContainer}>       
                <TextInput style={styles.input} placeholder="Titulo" onChangeText={(text: string) => setLabel(text)} value={label} />
            </View>
        </View>
        <View style={styles.ContainerRow}>
        
        <View style={styles.picker2}>
            <Picker
                selectedValue={selectedGroup}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedGroup(itemValue)
                }>
                <Picker.Item label="-" value="" />
                {grupos.map(grupo => (
                    <Picker.Item key={grupo.id} label={grupo.name} value={grupo.id} />
                ))}
            </Picker>                                              
        </View>

        </View>
        <TouchableOpacity style={styles.editbutton} onPress={post_clase}>        
            <Text style={styles.text_edit_button}>Crear</Text>
        </TouchableOpacity>


         
           
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
    picker2: {
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
        alignItems: 'center',// Ajusta el margen según sea necesario
        width:'60%', 
    },
    onlyinputTimeContainer: {
        flexDirection: 'column',
        alignItems: 'center',// Ajusta el margen según sea necesario
        width:'100%', 
    },
    onlytextContainer: {
        alignItems:'baseline',// Ajusta el margen según sea necesario
        width:'30%',    
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
        padding:20,
        gap: 10,
        width:'100%',
    },
    input: {
        height: 44,
        width: '100%',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,

    },
    container: {
        flex:1,
        alignItems: 'flex-start',
        width: '100%',
        backgroundColor:"#ffffff"

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
        width: '75%',
        marginTop: -10,
    },
    timePicker: {
        height: 120,
        width: '45%',
    },
    pickerButton: {
        paddingHorizontal: 20,
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

export default AddClaseProfesoresScreen