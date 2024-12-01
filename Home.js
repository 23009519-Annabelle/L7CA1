import React, { useState } from "react";
import {
  StatusBar,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { datasource as initialData } from "./Data.js";

const Home = ({ navigation }) => {
  const [datasource, setDatasource] = useState([...initialData]);

  const renderItem = ({ item, index, section }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        if (!item.key || !section.title) {
          alert("Invalid item data.");
          return;
        }
        navigation.navigate("Edit", {
          index,
          type: section.title,
          letter: item.key,
          category: item.category || "",
        });
      }}
    >
      <Text
        style={[
          styles.amountText,
          { color: section.title === "Income" ? "#236b2b" : "#8b0000" },
        ]}
      >
        ${item.key?.toFixed(2) || "0.00"}
      </Text>
      <Text style={styles.categoryText}>{item.category || "No Category"}</Text>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title, bgcolor, icon } }) => (
    <View style={[styles.headerContainer, { backgroundColor: bgcolor }]}>
      <FontAwesomeIcon icon={icon} size={20} style={styles.iconStyle} />
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <SectionList
        sections={datasource}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={() => navigation.navigate("Add")}
        >
          <Text style={styles.buttonText}>Add Income/Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.totalButton]}
          onPress={() => navigation.navigate("Total")}
        >
          <Text style={styles.buttonText}>Total Income/Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333", // Darkened text color for titles
  },
  iconStyle: {
    marginRight: 10,
    color: "#333333", // Matches darkened text color
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#4CAF50",
  },
  totalButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Home;
