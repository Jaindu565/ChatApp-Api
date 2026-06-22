import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [chatData, setChatData] = useState();
  const [isRefresh, setIsRefresh] = useState(false);
  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");

  const router = useRouter();

  async function loadChat(mobile: string) {
    setIsRefresh(true);

    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;

      const response = await fetch(apiUrl + "/chat/get-chats?mobile=" + mobile);

      const data = await response.json();

      setIsRefresh(false);

      if (response.ok) {
        setChatData(data);
      } else {
        alert(response.status + " : " + data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getUser() {
      const userString = await AsyncStorage.getItem("user");

      if (userString) {
        const userObj = JSON.parse(userString);
        setUserName(userObj.fname);
        setUserMobile(userObj.mobile);
        loadChat(userObj.mobile);
      }
    }

    getUser();
  }, []);

  function timeFormat(time: string) {
    const formattedTime = new Date(time).toLocaleTimeString("en-Us", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return formattedTime;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Text style={{ fontSize: 18 }}>{userName}</Text>
        <FontAwesome5 name="bell" size={22} color="#666666" />
      </View>

      <View style={styles.searchView}>
        <Feather name="search" size={24} color="black" />
        <TextInput placeholder="Search" autoFocus={false} />
      </View>

      <FlatList
        data={chatData}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={styles.chatView}
              onPress={() => {
                router.push({
                  pathname: "/chat",
                  params: {
                    chatId: item.last_message.chat_chat_id,
                    userName: item.user.fname + " " + item.user.lname,
                    userMobile: item.user.mobile,
                  },
                });
              }}
            >
              <Image
                source={require("../../assets/images/person.png")}
                style={styles.profilePic}
              />
              <View style={{ gap: 3 }}>
                <Text style={styles.nameText}>
                  {item.user.fname + " " + item.user.lname}
                </Text>
                <Text style={styles.msgText}>{item.last_message.message}</Text>
              </View>

              <Text style={styles.time}>
                {timeFormat(item.last_message.sent_at)}
              </Text>
            </Pressable>
          );
        }}
        refreshing={isRefresh}
        onRefresh={() => {
          if (userMobile) {
            loadChat(userMobile);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: "#ffffff",
    flex: 1,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  searchView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#c2c2c2",
    borderRadius: 50,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#c2c2c2",
  },

  chatView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 10,
  },
  msgText: {
    color: "#666666",
    fontSize: 12,
  },

  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    color: "#666666",
    fontSize: 12,
    textAlign: "right",
    flex: 1,
  },
});
