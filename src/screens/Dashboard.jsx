import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {/* Total Students */}
      <View style={[styles.card, styles.totalStudentsCard]}>
        <View>
          <Text style={styles.label}>Total Students</Text>
          <Text style={[styles.value, { color: "#FF0000" }]}>25</Text>
        </View>
        <View style={styles.iconContainerGreen}>
          <Text style={styles.icon}>👶</Text>
        </View>
      </View>

      {/* Classes Today */}
      <View style={styles.card}>
        <View>
          <Text style={styles.label}>Classes Today</Text>
          <Text style={styles.value}>3</Text>
        </View>
        <View style={styles.iconContainerBlue}>
          <Text style={styles.icon}>🏫</Text>
        </View>
      </View>

      {/* Pending Reports */}
      <View style={styles.card}>
        <View>
          <Text style={styles.label}>Pending Reports</Text>
          <Text style={styles.value}>2</Text>
        </View>
        <View style={styles.iconContainerYellow}>
          <Text style={styles.icon}>📝</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#25A0DD",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  totalStudentsCard: {
    backgroundColor: "#4287f5",
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
  },
  value: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 8,
    color: "#111827",
  },
  iconContainerGreen: {
    backgroundColor: "#D1FAE5",
    borderRadius: 50,
    padding: 12,
  },
  iconContainerBlue: {
    backgroundColor: "#DBEAFE",
    borderRadius: 50,
    padding: 12,
  },
  iconContainerYellow: {
    backgroundColor: "#FEF3C7",
    borderRadius: 50,
    padding: 12,
  },
  icon: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Dashboard;
