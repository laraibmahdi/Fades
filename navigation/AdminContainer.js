import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { doc as firestoreDoc, getDoc, updateDoc ,onSnapshot } from '@firebase/firestore';
import { firestore } from '../firebase'; // Import your Firestore instance

let globalAppointmentRef = null;

export default function AdminContainer() {
    const [appointment, setAppointment] = useState(null);

    useEffect(() => {
        // i need to change this barber id here to the current barber id
        const barberId = "16wHhpxMlierOnPopbD6laQUS2k2";
        const barberRef = firestoreDoc(firestore, "barbers", barberId);

        const unsubscribe = onSnapshot(barberRef, async (doc) => {
            const appointmentRef = doc.data().appointmentRef;
            globalAppointmentRef = appointmentRef;
            console.log('Appointment reference:', appointmentRef);
            if (appointmentRef != "null") {
                try {
                    // Appointment reference exists, fetch appointment document
                    const appointmentDocRef = firestoreDoc(firestore, "appointments", appointmentRef);
                    const appointmentDoc = await getDoc(appointmentDocRef);
                    if (appointmentDoc.exists()) {
                        setAppointment(appointmentDoc.data());
                    } else {
                        setAppointment(null); // Appointment document not found
                    }
                } catch (error) {
                    console.error('Error fetching appointment document:', error);
                    setAppointment(null);
                }
            } else {
                setAppointment(null); // Appointment reference not populated
            }
        });

        return () => unsubscribe();
    }, []);

    const handleApproveAppointment = async () => {
        try {
            if (globalAppointmentRef) { // Check if appointmentRef is not null
                const appointmentRef = firestoreDoc(firestore, "appointments", globalAppointmentRef);
                await updateDoc(appointmentRef, {
                    status: 'approved'
                });
                console.log('Appointment status updated to approved');
            } else {
                console.error('Appointment reference is null');
            }
        } catch (error) {
            console.error('Error updating appointment status:', error);
        }
    };

    const handleCancelAppointment = async () => {
        try {
            if (globalAppointmentRef) { // Check if appointmentRef is not null
                const appointmentRef = firestoreDoc(firestore, "appointments", globalAppointmentRef);
                await updateDoc(appointmentRef, {
                    status: 'cancelled'
                });
                console.log('Appointment status updated to cancelled');
            } else {
                console.error('Appointment reference is null');
            }
        } catch (error) {
            console.error('Error updating appointment status:', error);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {appointment ? (
                <View>
                    <Text>Customer ID: {appointment.customerId}</Text>
                    <Text>Status: {appointment.status}</Text>
                    {appointment.status === 'pending' && (
                        <View>
                            <TouchableOpacity onPress={handleApproveAppointment}>
                                <Text>Approve Appointment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCancelAppointment}>
                                <Text>Cancel Appointment</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            ) : (
                <Text>No appointment found</Text>
            )}
        </View>
    );
}
