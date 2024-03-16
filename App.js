// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
// import MainContainer from './navigation/MainContainer';
// import { initializeApp } from '@firebase/app';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './navigation/LoginScreen';
import MainContainer from './navigation/MainContainer';

// const firebaseConfig = {
//   apiKey: "AIzaSyAGqdwWQzpWvGLP-zaFCq1cnY6jPE4EHxw",
//   authDomain: "hair-486ae.firebaseapp.com",
//   projectId: "hair-486ae",
//   storageBucket: "hair-486ae.appspot.com",
//   messagingSenderId: "476959662144",
//   appId: "1:476959662144:web:3d3cf864d3634a4a3abfa5",
//   measurementId: "G-R10YS1L15D"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
//   return (
//     <View style={styles.container}>
//        <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

//        <TextInput
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Email"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         value={password}
//         onChangeText={setPassword}
//         placeholder="Password"
//         secureTextEntry
//       />
//       <View style={styles.buttonContainer}>
//         <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
//       </View>

//       <View style={styles.bottomContainer}>
//         <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
//           {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
//         </Text>
//       </View>
//     </View>
//   );
// }


// export default App = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [user, setUser] = useState(null); // Track user authentication state
//   const [isLogin, setIsLogin] = useState(true);

//   const auth = getAuth(app);
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, [auth]);

  
//   const handleAuthentication = async () => {
//     try {
//       if (user) {
//         // If user is already authenticated, log out
//         console.log('User logged out successfully!');
//         await signOut(auth);
//       } else {
//         // Sign in or sign up
//         if (isLogin) {
//           // Sign in
//           await signInWithEmailAndPassword(auth, email, password);
//           console.log('User signed in successfully!');
//         } else {
//           // Sign up
//           await createUserWithEmailAndPassword(auth, email, password);
//           console.log('User created successfully!');
//         }
//       }
//     } catch (error) {
//       console.error('Authentication error:', error.message);
//     }
//   };

//   return (
//       user ? (
//         <MainContainer/>
//       ) : (
//         // Show sign-in or sign-up form if user is not authenticated
//         <AuthScreen
//           email={email}
//           setEmail={setEmail}
//           password={password}
//           setPassword={setPassword}
//           isLogin={isLogin}
//           setIsLogin={setIsLogin}
//           handleAuthentication={handleAuthentication}
//         />
//       )
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center', // Center horizontally
//     backgroundColor: '#f0f0f0',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     marginBottom: 16,
//     padding: 8,
//     borderRadius: 4,
//     width: '80%', // Adjust width as needed
//   },
//   buttonContainer: {
//     marginBottom: 16,
//     width: '80%', // Adjust width as needed
//   },
//   toggleText: {
//     color: '#3498db',
//     textAlign: 'center',
//   },
//   bottomContainer: {
//     marginTop: 20,
//   },
// });

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name= "MainContainer" component={MainContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});