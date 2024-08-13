import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import filter from "lodash.filter";

const EndPoint_API = `https://randomuser.me/api/?results=100&nat=ng`;

const UserList = ({ navigation }) => {
  const [isload, setIsload] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsload(true);
    fetchData(EndPoint_API);
  }, []);

  const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      const jsonData = await res.json();
      setData(jsonData.results);
      setFullData(jsonData.results);
      setIsload(false);
    } catch (error) {
      setError(error);
    }
  };

  const searchFunc = (query) => {
    setSearch(query);
    const formatedQuery = query.toLowerCase();

    const filterData = filter(fullData, (user) => {
      return contains(user, formatedQuery);
    });

    setData(filterData);
  };

  const contains = ({ name, email }, query) => {
    const { first, last } = name;

    if (
      first.includes(query) ||
      last.includes(query) ||
      email.includes(query)
    ) {
      return true;
    }
  };

  if (isload) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="blue" />
        <Text>Please be patient.....</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>There was an error. Please try again later.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("UserProfile", { user: item })}
      >
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <View
            style={{
              backgroundColor: "#e0e0e0",
              borderRadius: 10,
              padding: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.picture.medium }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 10,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.name.first} {item.name.last}
              </Text>
              <Text style={{ color: "gray" }}>{item.email}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, marginTop: 30, marginHorizontal: 20 }}>
      <TextInput
        placeholder="Search here"
        clearButtonMode="always"
        style={{
          marginBottom: 10,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 25,
          backgroundColor: "#e0e0e0",
        }}
        autoCapitalize="none"
        autoCorrect={false}
        value={search}
        onChangeText={(query) => searchFunc(query)}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.login.username}
        renderItem={renderItem}
      />
    </View>
  );
};

export default UserList;
