import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface Request {
    id: string;
    student: { id: string; firstname: string; lastname:string;}; // Asume que el estudiante tiene un id y un nombre.
    state: string;
}
interface RequestItemProps {
    request: Request;
    onAccept: (requestId: string) => void;
    onReject: (requestId: string) => void;
}

const RequestItem: React.FC<RequestItemProps> = ({ request, onAccept, onReject }) => {
    return (
        <View style={styles.requestItem}>
            <Text>{request.student.firstname}</Text>
            <Text>{request.student.lastname}</Text>
            <Button title="Aceptar" onPress={() => onAccept(request.id)} />
            <Button title="Rechazar" onPress={() => onReject(request.id)} />
        </View>
    );
};

const styles = StyleSheet.create({
    requestItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
});

export default RequestItem;