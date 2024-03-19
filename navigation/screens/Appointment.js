import * as React from 'react';
import { View, Text } from 'react-native';

export default function DetailsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Appointment Screen</Text>
        </View>
    );
}

// here on the appointment screen if a user clicks an email it send a message to the AdminContainer that the user wants to book an appointment