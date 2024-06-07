import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function Barbers({ route }) {
    const { barbershop } = route.params;
    const barbers = [
        { key: '1', name: 'Barber A' },
        { key: '2', name: 'Barber B' },
        { key: '3', name: 'Barber C' },
        // Add more barbers as needed
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{barbershop.text}</Text>
            <FlatList
                data={barbers}
                renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
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
    item: {
        padding: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
