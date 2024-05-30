import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { doc, addDoc, updateDoc, collection } from '@firebase/firestore';
import { firestore, auth } from '../../firebase'; // Import your Firestore instance

export default function Appointment({ navigation }) {
    const handleAppointment = async () => {
    try {
        const currentUser = auth.currentUser;
        const customerId = currentUser.uid; // Get the currently logged-in user's ID
        // Add appointment document to Firestore
        const appointment = await addDoc(collection(firestore, 'appointments'), {
            customerId: customerId,
            // the admin should be the id of the box the user clicks on (barbershop)
            adminId: "K7tUIjjlmCx5PTxAG4is",
            status: 'pending' // Initial status is pending
        });
        const barberRef = doc(firestore, "barbers", "16wHhpxMlierOnPopbD6laQUS2k2");
        await updateDoc(barberRef, {
            appointmentRef: appointment.id
        });
        console.log('Appointment request sent successfully:', appointment.id);
        return appointment.id; // Return the ID of the newly created appointment document
    } catch (error) {
        console.error('Error sending appointment request:', error);
        throw new Error('Failed to send appointment request. Please try again later.');
    }
};

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={handleAppointment}>
                <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Click to Request Appointment</Text>
            </TouchableOpacity>
        </View>
    );
}
// for admins to get a notification whenever a user books an appointment

// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp();

// exports.sendAppointmentNotification = functions.firestore
//     .document('appointments/{appointmentId}')
//     .onCreate(async (snapshot, context) => {
//         const appointmentData = snapshot.data();
//         const adminId = appointmentData.adminId;

//         // Get admin's device token from Firestore
//         const adminDoc = await admin.firestore().collection('admins').doc(adminId).get();
//         const adminData = adminDoc.data();
//         const adminDeviceToken = adminData.deviceToken;

//         // Notification payload
//         const payload = {
//             notification: {
//                 title: 'New Appointment Request',
//                 body: 'You have received a new appointment request.',
//             }
//         };

//         // Send notification to admin's device
//         return admin.messaging().sendToDevice(adminDeviceToken, payload);
//     });
