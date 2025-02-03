import React, { useState, useEffect } from "react";
import { StatusBar, Button, FlatList, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    listStyle: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#f8f9fa",
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
});

const Home = ({ navigation }) => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        fetch("https://1ca745efb821452ea1fafb834a0af55f.api.mockbin.io/")
            .then((response) => response.json())
            .then((myJson) => {
                console.log("API Response:", myJson); // ✅ Debug: Check API structure
                setMyData(myJson.records || myJson || []);
            });
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.listStyle}>
                <Text>👤 Username: {item.username}</Text>
                <Text>📧 Email: {item.email}</Text>
                <Text>📞 Phone: {item.number}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.title}>Registered Users</Text>
            <Button title="Register New User" onPress={() => navigation.navigate("Add", { datastr: JSON.stringify(myData) })} />
            <FlatList data={myData} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
        </View>
    );
};

export default Home;
