import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const UserProfile = ({ route }) => {
  const { user } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={{ uri: user.picture.large }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {user.name.first} {user.name.last}
        </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Email: {user.email}</Text>
          <Text style={styles.infoText}>Username: {user.login.username}</Text>
          <Text style={styles.infoText}>Phone: {user.phone}</Text>
          <Text style={styles.infoText}>
            Address: {user.location.street.number} {user.location.street.name},{" "}
            {user.location.city}, {user.location.state},{" "}
            {user.location.postcode}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e0e0e0",
  },
  profileCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  infoContainer: {
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
});

export default UserProfile;
