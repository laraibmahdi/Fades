import * as React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home({ navigation }) {
    const data = [
        { key: '1', text: 'Hair Affair', image: require('../../assets/icon.png') },
        // Add more items as needed
    ];

    const handlePress = (item) => {
        navigation.navigate('Barbers', { barbershop: item });
    };

    const Item = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.text}</Text>
            <View style={styles.infoContainer}>
                <Ionicons name="heart" size={25} color="red" style={styles.icon} />
                <Text style={styles.ratings}>5.0</Text>
            </View>
            <Text style={styles.ratings}>Distance: 200m </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.key}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        height: 280,
        borderRadius: 25,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 28,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 15,
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 5,
        marginLeft: -3,
    },
    ratings: {
        fontSize: 16,
        color: '#888',
    },
});
