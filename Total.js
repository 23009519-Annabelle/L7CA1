import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { datasource } from "./Data.js";

const TotalDisplay = () => {
  let totalIncome = 0;
  let totalExpenses = 0;

  datasource.forEach((section) => {
    if (section.title === "Income" && section.data) {
      totalIncome = section.data.reduce((sum, item) => sum + item.key, 0);
    } else if (section.title === "Expenses" && section.data) {
      totalExpenses = section.data.reduce((sum, item) => sum + item.key, 0);
    }
  });

  const netTotal = totalIncome - totalExpenses;

  return (
    <View style={styles.container}>
      <Text style={[styles.totalText, styles.income]}>
        Total Income: ${totalIncome.toFixed(2)}
      </Text>
      <Text style={[styles.totalText, styles.expenses]}>
        Total Expenses: ${totalExpenses.toFixed(2)}
      </Text>
      <Text
        style={[
          styles.totalText,
          styles.netTotal,
          { color: netTotal >= 0 ? "green" : "red" }, // Green if positive, red if negative
        ]}
      >
        Net Total: ${netTotal.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5", // Soft background for better readability
    justifyContent: "center",
    alignItems: "center",
  },
  totalText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "600",
  },
  income: {
    color: "#4CAF50", // Green for income
  },
  expenses: {
    color: "#f44336", // Red for expenses
  },
  netTotal: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default TotalDisplay;
