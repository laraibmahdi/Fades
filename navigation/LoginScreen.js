import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
import { auth,firestore } from '../firebase'
import { collection, addDoc,setDoc, doc, getDoc } from "@firebase/firestore"; 


const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, user => {
  //     if (user.Type === 'customer') {
  //       navigation.replace("MainContainer")
  //     } else if (user.Type === 'admin'){
  //       navigation.replace("AdminContainer")
  //     }
  //   })

  //   return unsubscribe
  // }, [auth])

  const handleSignUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      console.log('Registered with:', user.email);
  
      // Store user's account type in Firestore with the same user ID
      await setDoc(doc(firestore, "users", user.uid), {
        Email: email,
        Type: 'customer'
      });
  
      // After signing up, directly navigate based on user's type
      navigation.replace("MainContainer");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      console.log('Logged in with:', user.email);
  
      // After logging in, directly navigate based on user's type
      const userRef = doc(firestore, "users", user.uid);
      console.log(user.uid);
      const docSnapshot = await getDoc(userRef);
      if (docSnapshot.exists()) {
        const userType = docSnapshot.data().Type;
        if (userType === 'customer') {
          navigation.replace("MainContainer");
        } else if (userType === 'admin') {
          navigation.replace("AdminContainer");
        }
      } else {
        // Handle case when user document doesn't exist
        console.log("User document not found");
      }
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
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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
})