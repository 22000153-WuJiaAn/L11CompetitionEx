import React, { useState } from "react";
import { StatusBar, View, Button, Text, TextInput, Alert, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eef2f3",
    },
    input: {
        width: "80%",
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
});

const Add = ({ navigation, route }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const handleSubmit = () => {
        if (!username || !email || !number) {
            Alert.alert("Error", "All fields are required!");
            return;
        }

        let mydata = route.params?.datastr ? JSON.parse(route.params.datastr) : [];
        let newUser = { username, email, number };
        mydata.push(newUser);

        fetch("https://1ca745efb821452ea1fafb834a0af55f.api.mockbin.io/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "AuthCode",
            },
            body: JSON.stringify({ records: mydata }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                Alert.alert("Success", "User registered successfully!");
                navigation.navigate("Home", { updatedData: mydata });
            })
            .catch((error) => {
                console.error("Error:", error);
                Alert.alert("Error", "Failed to register user.");
            });
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.title}>Register</Text>
            <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername} />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" onChangeText={setNumber} />
            <Button title="Sign Up" onPress={handleSubmit} />
        </View>
    );
};

export default Add;
