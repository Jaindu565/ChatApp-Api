import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Text style={{ fontSize: 18 }}>User Name</Text>
        <FontAwesome5 name="bell" size={22} color="#666666" />
      </View>

      <View style={styles.searchView}>
        <Feather name="search" size={24} color="black" />
        <TextInput placeholder="Search" autoFocus={false} />
      </View>

      {/* chat desong */}
      <Pressable style={styles.chatView}>
        <Image
          source={require("../../assets/images/person.png")}
          style={styles.profilePic}
        />
        <View style={{ gap: 3 }}>
          <Text style={styles.nameText}>Kasun Menadi</Text>
          <Text style={styles.msgText}>Helllo</Text>
        </View>

        <Text style={styles.time}>10:20 PM</Text>
      </Pressable>

      {/* chat desing */}
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
