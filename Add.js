import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { datasource } from './Data.js';

const Add = ({ navigation }) => {
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('Income');

    const handlePriceChange = (text) => {
        const numericValue = text.replace(/[^0-9.]/g, ''); 
        setPrice(numericValue);
    };

    const generateId = () => {
        // Generate a string-based unique ID using timestamp and a random number
        return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Price:</Text>
            <TextInput
                keyboardType="numeric" 
                style={styles.textBox}
                value={price}
                onChangeText={handlePriceChange}
                placeholder="Enter a price"
            />
            <Text style={styles.label}>Category:</Text>
            <TextInput
                style={styles.textBox}
                onChangeText={(text) => setCategory(text)}
                placeholder="Enter a category"
            />
            <Text style={styles.label}>Type:</Text>
            <RNPickerSelect
                onValueChange={(value) => setType(value)}
                items={[
                    { label: 'Income', value: 'Income' },
                    { label: 'Expense', value: 'Expense' },
                ]}
                value={type}
            />
            <Button
                title="Submit"
                onPress={() => {
                    if (!price || !category) {
                        alert("Please enter both price and category.");
                        return;
                    }

                    const newItem = { 
                        id: generateId(), // Generate a unique string-based ID
                        key: parseFloat(price), 
                        category 
                    };
                    const indexnum = type === "Income" ? 0 : 1;

                    datasource[indexnum].data.push(newItem);
                    navigation.navigate("Home");
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    textBox: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#fff",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
});

export default Add;
