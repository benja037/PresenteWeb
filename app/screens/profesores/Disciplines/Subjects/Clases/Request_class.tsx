import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../Home";
import React from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import RequestItem from "../../../../../components/profesores/Disciplines/Subjects/Request/request-item";




type DetailSubjectsProps = any;

interface Request {
    id: string;
    student: { id: string; firstname: string; lastname:string;}; // Asume que el estudiante tiene un id y un nombre.
    state: string;
}
const RequestClassProfesoresScreen: React.FC<DetailSubjectsProps> = ({ navigation, route }) => {
    const { clase_id,subject_id } = route.params;
    const [loading, setLoading] = useState(true);
    const [requestList, setRequestList] = useState<Request[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            fetchData2();
        }, [])
    );

    const fetchData2 = async () => {
        try {            
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/class/${clase_id}/requests/`, {});
            /* console.log("Fetchdata2");
            console.log("Lista Requests of Subject:", response.data); */
            setRequestList(response.data);
        } catch (error) {
            /* console.error("Error:", error); */
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (requestId: string) => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
            await axios.patch(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/class/${clase_id}/requests/${requestId}/acceptordeny-subject/`, { accept: true }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchData2(); // Refrescar la lista después de aceptar.
        } catch (error) {
           /*  console.error("Error al aceptar la solicitud:", error); */
        }
    };

    const handleReject = async (requestId: string) => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
            await axios.patch(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/class/${clase_id}/requests/${requestId}/acceptordeny-subject/`, { accept: false }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchData2(); // Refrescar la lista después de rechazar.
        } catch (error) {
            /* console.error("Error al rechazar la solicitud:", error); */
        }
    };

    if (loading) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container_header}>
                <View style={styles.box_header_left}>
                    <Text style={styles.title}>Request</Text>
                </View>
            </View>
            <View style={styles.requestList}>
                {requestList.map((single_request) => (
                    <RequestItem
                        key={single_request.id}
                        request={single_request}
                        onAccept={handleAccept}
                        onReject={handleReject}
                    />
                ))}
            </View>
        </ScrollView>
    );
}


 
export default RequestClassProfesoresScreen
;
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    scrollViewContent: {
        flexGrow: 1,
        padding: 20,
    },
    container_header: {
        marginBottom: 20,
    },
    box_header_left: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    requestList: {
        marginTop: 20,
    },
});