import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();

  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  async function signIn() {
    if (number !== "" && password !== "") {
      const loginData = {
        number: number,
        password: password,
      };

      try {
        const response = await fetch("http://192.168.1.103:3000/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.user);

          await AsyncStorage.setItem("user", JSON.stringify(data.user));

          alert("Login Successful");
        } else {
          try {
            const data = await response.json();
            console.log(data.msg);
            alert(data.msg);
          } catch (josnErr) {
            console.error(josnErr);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        >
          <Image
            source={require("../assets/images/bg-signin.jpg")}
            style={styles.img}
          />
          <View style={styles.titleView}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>Welcome Back!</Text>
          </View>
          <View style={styles.inputView}>
            <FontAwesome6 name="user" size={24} color="black" />
            <TextInput placeholder="070 054 ****" onChangeText={setNumber} />
          </View>

          <View style={styles.inputView}>
            <MaterialIcons name="lock-outline" size={25} color="black" />
            <TextInput
              placeholder="••••••••"
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>

          <Pressable
            style={styles.button}
            onPress={() => {
              signIn();
            }}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>

          <View style={{ alignItems: "center", gap: 2 }}>
            <Text>Forget Password</Text>
            <Text>
              Don t have an account?
              <Text
                style={{ fontWeight: "bold" }}
                onPress={() => {
                  router.push("/signup");
                }}
              >
                Sign up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },

  img: {
    width: 300,
    height: 300,
  },

  inputView: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    backgroundColor: "#e7e7e7",
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 2,
    alignItems: "center",
    gap: 7,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "blue",
    borderRadius: 50,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 20,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
  },

  titleView: {
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    color: "#666666",
  },
});
