import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { auth, firestore } from '../firebase';
import { collection, addDoc, setDoc, doc, getDoc } from "@firebase/firestore";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleCustomerSignUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      console.log('Registered as a customer with:', user.email);
  
      // Store user's account type in Firestore with the same user ID
      await setDoc(doc(firestore, "users", user.uid), {
        Email: email,
        Type: 'customer'
      });
  
      // After signing up, directly navigate to the customer dashboard
      navigation.replace("MainContainer");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleBarberSignUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      console.log('Registered as a barber with:', user.email);
  
      // Store user's account type in Firestore with the same user ID
      await setDoc(doc(firestore, "barbers", user.uid), {
        Email: email,
        appointmentRef: null,
        availability: true,
        verified: false,
      });
  
      // After signing up, directly navigate to the barber dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      console.log('Logged in with:', user.email);
  
      // Check if the user exists in the "barbers" collection
      const barberRef = doc(firestore, "barbers", user.uid);
      const barberSnapshot = await getDoc(barberRef);
  
      if (barberSnapshot.exists()) {
        const barberData = barberSnapshot.data();
        
        // Check if the barber is verified
        if (barberData.verified === true) {
          navigation.replace("AdminContainer");
          return; // Exit the function early if the user is a verified barber
        } else {
          // Barber is not verified, show error message or handle accordingly
          console.log("Barber is not verified");
          return;
        }
      }
  
      // Check if the user exists in the "customers" collection
      const customerRef = doc(firestore, "users", user.uid);
      const customerSnapshot = await getDoc(customerRef);
      if (customerSnapshot.exists()) {
        navigation.replace("MainContainer");
        return; // Exit the function early if the user is a customer
      }
  
      // If the user is not found in either collection
      console.log("User document not found");
    } catch (error) {
      alert(error.message);
    }
  };
  
  


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCustomerSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register as Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleBarberSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register as Barber</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});