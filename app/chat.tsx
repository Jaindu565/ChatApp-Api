import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Chat() {
  const router = useRouter();

  const [chatHistory, setChatHistory] = useState();
  const [userName, setUserName] = useState("");

  const params = useLocalSearchParams();
  const chatId = params.chatId;
  const userMobile = params.userMobile;

  useEffect(() => {
    setUserName(params.userName + "");
    loadChatHistory();
  }, []);

  async function loadChatHistory() {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const response = await fetch(
      apiUrl + "/chat-history/get-chat-history?id=" + chatId,
    );

    const data = await response.json();

    if (response.ok) {
      setChatHistory(data);
    } else {
      console.log(response.status + " : " + data.msg);
    }
  }

  function timeFormat(time: string) {
    const formattedTime = new Date(time).toLocaleTimeString("en-Us", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return formattedTime;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <Entypo
            name="chevron-left"
            size={24}
            color="black"
            onPress={() => {
              router.back();
            }}
          />
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/4140/4140073.png",
            }}
            style={styles.profilePic}
          />
          <View style={{ flex: 1, gap: 3 }}>
            <Text style={styles.nameTxt}>{userName}</Text>
            <View style={styles.statusView}>
              <View style={styles.statusBall} />
              <Text style={styles.statusTxt}>Online</Text>
            </View>
          </View>
          <SimpleLineIcons name="options-vertical" size={16} color="black" />
        </View>

        <View style={styles.bodyView}>
          <FlatList
            data={chatHistory}
            renderItem={({ item }) => {
              return (
                <View
                  style={[
                    styles.messageView,
                    {
                      alignItems:
                        userMobile === item.sender ? "flex-start" : "flex-end",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.message,
                      userMobile === item.sender
                        ? styles.receiveMsg
                        : styles.sendMsg,
                    ]}
                  >
                    {item.message}
                  </Text>
                  <Text style={styles.msgTime}>{timeFormat(item.sent_at)}</Text>
                </View>
              );
            }}
          />

          {/* <View style={[styles.messageView, { alignItems: "flex-start" }]}>
            <Text style={[styles.message, styles.receiveMsg]}>Hello</Text>
            <Text style={styles.msgTime}>09:35 PM</Text>
          </View> */}
        </View>

        <View style={styles.inputView}>
          <TextInput style={styles.input} placeholder="Enter Message" />
          <Pressable style={styles.sendBtn}>
            <FontAwesome name="send" size={24} color="white" />
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerView: {
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  nameTxt: {
    color: "black",
    fontWeight: "500",
    fontSize: 18,
  },
  statusView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statusTxt: {
    color: "#a4a4a4",
    fontSize: 12,
  },
  statusBall: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: "#64fd85",
  },

  bodyView: {
    flex: 1,
    backgroundColor: "#eff3ff",
    padding: 20,
  },

  msgTime: {
    color: "#8f8f8f",
    fontSize: 12,
  },

  message: {
    fontWeight: "600",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    maxWidth: "90%",
  },

  messageView: {
    width: "100%",
    gap: 5,
  },

  sendMsg: {
    backgroundColor: "#005eff",
    color: "white",
    borderTopRightRadius: 0,
  },

  receiveMsg: {
    backgroundColor: "#ffffff",
    color: "black",
    borderTopLeftRadius: 0,
  },

  inputView: {
    backgroundColor: "#eff3ff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  input: {
    backgroundColor: "white",
    flex: 1,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sendBtn: {
    backgroundColor: "#005eff",
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
