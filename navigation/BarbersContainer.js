import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import RNPickerSelect from 'react-native-picker-select';


export default function Barbers({ route }) {
    const { barbershop } = route.params;
    const [barbers, setBarbers] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);


    useEffect(() => {
        const fetchBarbers = async () => {
            try {
                const barbersID = barbershop.barbersID;

                if (barbersID && barbersID.length > 0) {
                    const barbersCollection = collection(firestore, 'barbers');
                    const q = query(barbersCollection, where('__name__', 'in', barbersID));
                    const barbersSnapshot = await getDocs(q);
                    const barbersList = barbersSnapshot.docs.map(doc => ({
                        ...doc.data(),
                        key: doc.id,
                    }));
                    setBarbers(barbersList);
                }
            } catch (error) {
                console.error('Error fetching barbers: ', error);
            }
        };
        fetchBarbers();
    }, [barbershop]);


    const renderItem = ({ item }) => (
        <View style={styles.barberContainer}>
            <Image source={require('../assets/barbers/John Doe.jpg')} style={styles.profilePic} />
            <View style={styles.barberInfo}>
                <Text style={styles.barberName}>{item.firstName} {item.lastName}</Text>
            </View>
            <View>
            <RNPickerSelect
                    onValueChange={(value) => setSelectedTime(value)}
                    items={item.availability.map(time => ({ label: time, value: time }))}
                    style={pickerSelectStyles}
                    placeholder={{ label: "Select a time...", value: null }}
                />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={barbers}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    barberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    barberInfo: {
        flex: 1,
    },
    barberName: {
        fontSize: 18,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        width: 150, // Adjust width as necessary
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        width: 150, // Adjust width as necessary
    },
});