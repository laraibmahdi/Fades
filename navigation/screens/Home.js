import * as React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, SafeAreaView } from 'react-native';
import { Image, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Home({ navigation }) {
    const data = [
      { key: '1', text: 'Hair Affair',  image: require('../../assets/icon.png') },
      //{ key: '2', text: 'Medussa',  image: require('../../assets/icon.png')  },
      //{ key: '3', text: 'Sike 3',  image: require('../../assets/icon.png')  },
      //{ key: '4', text: 'Sike 4',  image: require('../../assets/icon.png')  },
      //{ key: '5', text: 'Sike 5',  image: require('../../assets/icon.png')  },
      //{ key: '6', text: 'Sike 6',  image: require('../../assets/icon.png')  },
      //{ key: '7', text: 'Sike 7',  image: require('../../assets/icon.png')  },
      //{ key: '8', text: 'Sike 8',  image: require('../../assets/icon.png')  },
      // Add more items as needed
    ];
  
  const Item = ({title, image}) => (
    <View style={styles.item}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.infoContainer}>
      <Ionicons name="heart" size={25} color="red" style={styles.icon} />
      <Text style={styles.ratings}>5.0</Text>
    </View>
      <Text style={styles.ratings}>Distance: 200m </Text>
    </View>
  );

  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={({item}) => <Item title={item.text} image={item.image}/>}
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
        //backgroundColor: '#000',
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
        marginLeft: -3, // Adjust the margin to move the icon to the left
      },
      ratings: {
        fontSize: 16,
        color: '#888', // Adjust the color as needed
      },
  });
