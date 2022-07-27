import { View, Text, Button, StyleSheet, TextInput } from "react-native"
import React, { useState } from "react";
import { auth } from "../../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterScreen = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleRegisterButton = () => {
        // redirect to register screen
    }


    return (
        <View style={styles.root}>
            <Text>Register screen</Text>

            <View style={styles.inputContainer}>
                <TextInput placeholder="email" value={email} onChangeText={text => setEmail(text)} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput placeholder="password" value={password} onChangeText={text => setPassword(text)} />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Register" onPress={() => { }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        paddingTop: 150
    },
    inputContainer: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: 'e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10
    },
    buttonContainer: {
        marginTop: 50,
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '70%',
    },

})

export default RegisterScreen;