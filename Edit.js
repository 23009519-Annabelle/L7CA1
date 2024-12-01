import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { datasource } from "./Data.js";

const Edit = ({ navigation, route }) => {
    const { index, type = "Income", letter = 0 } = route.params || {};
    const [price, setPrice] = useState(letter.toString());
    const [category, setCategory] = useState(route.params?.category || "");
    const [newType, setNewType] = useState(type);

  const handlePriceChange = (text) => {
    const numericValue = text.replace(/[^0-9.]/g, "");
    setPrice(numericValue);
  };

  const handleSave = () => {
    const updatedItem = {
      id: Date.now().toString(),
      key: parseFloat(price),
      category,
    };

    const updatedData = [...datasource];

    const currentSectionIndex = type === "Income" ? 0 : 1;

    updatedData[currentSectionIndex].data = updatedData[
      currentSectionIndex
    ].data.filter((_, i) => i !== index);

    const newSectionIndex = newType === "Income" ? 0 : 1;
    updatedData[newSectionIndex].data.push(updatedItem);

    datasource.length = 0;
    updatedData.forEach((section) => datasource.push(section));

    navigation.navigate("Home");
  };

  const handleDelete = () => {
    Alert.alert("Are you sure?", "This action cannot be undone.", [
      {
        text: "Yes",
        onPress: () => {
          const updatedData = [...datasource];

          const currentSectionIndex = type === "Income" ? 0 : 1;

          updatedData[currentSectionIndex].data = updatedData[
            currentSectionIndex
          ].data.filter((_, i) => i !== index);

          datasource.length = 0;
          updatedData.forEach((section) => datasource.push(section));

          navigation.navigate("Home");
        },
      },
      { text: "No" },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Change Price:</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.textBox}
        value={price}
        onChangeText={handlePriceChange}
        placeholder="Enter a price"
      />
      <Text style={styles.label}>Change Category:</Text>
      <TextInput
        style={styles.textBox}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter a category"
      />
      <Text style={styles.label}>Change Type:</Text>
      <RNPickerSelect
        onValueChange={(value) => setNewType(value)}
        items={[
          { label: "Income", value: "Income" },
          { label: "Expenses", value: "Expenses" },
        ]}
        value={newType}
      />
      <View style={{ flexDirection: "row" }}>
        <View style={{ margin: 10, flex: 1 }}>
          <Button title="Save" onPress={handleSave} />
        </View>
        <View style={{ margin: 10, flex: 1 }}>
          <Button title="Delete" color="red" onPress={handleDelete} />
        </View>
      </View>
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
    pickerContainer: {
      backgroundColor: "#fff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    pickerText: {
      fontSize: 16,
      color: "#333",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
      borderRadius: 8,
      paddingVertical: 12,
      backgroundColor: "#4CAF50",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#fff",
    },
    deleteButton: {
      backgroundColor: "#E53935",
    },
  });
  

export default Edit;
