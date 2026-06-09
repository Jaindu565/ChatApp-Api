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

export default function Signup() {
  const [firstName, setfName] = useState("");
  const [lastName, setlName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function register() {
    if (firstName === "") {
      alert("Please Enter First Name");
    } else if (
      firstName !== "" &&
      lastName !== "" &&
      mobile !== "" &&
      password !== ""
    ) {
      const registerData = {
        fname: firstName,
        lname: lastName,
        mobile: mobile,
        password: password,
      };

      try {
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;

        const response = await fetch(apiUrl + "/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerData),
        });

        const resData = await response.json();
        alert(response.status + " : " + resData.msg);
      } catch (error) {
        console.log(error);
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
            source={require("../assets/images/bg-signup.jpg")}
            style={styles.img}
          />

          <View style={styles.titleView}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Sign Up Here</Text>
          </View>

          <View style={styles.inputView}>
            <Text style={styles.inputLabel}>First Name:</Text>
            <TextInput
              placeholder="Joni"
              style={styles.input}
              onChangeText={setfName}
            />
          </View>

          <View style={styles.inputView}>
            <Text style={styles.inputLabel}>Last Name:</Text>
            <TextInput
              placeholder="Santha"
              style={styles.input}
              onChangeText={setlName}
            />
          </View>

          <View style={styles.inputView}>
            <Text style={styles.inputLabel}>Number:</Text>
            <TextInput
              placeholder="070 054 ****"
              style={styles.input}
              onChangeText={setMobile}
            />
          </View>

          <View style={styles.inputView}>
            <Text style={styles.inputLabel}>Password:</Text>
            <TextInput
              placeholder="*******"
              style={styles.input}
              onChangeText={setPassword}
            />
          </View>

          <Pressable
            style={styles.button}
            onPress={() => {
              register();
            }}
          >
            <Text style={styles.buttonText}>Sign Up →</Text>
          </Pressable>

          <View style={styles.titleView}>
            <Text style={styles.subtitle}>
              Already have an account?{" "}
              <Text
                style={{ fontWeight: "bold", color: "black" }}
                onPress={() => {
                  router.back();
                }}
              >
                Sign In
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

  titleView: {
    alignItems: "center",
    gap: 5,
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 18,
    color: "#666",
  },

  inputView: {
    width: "100%",
    marginBottom: 15,
  },

  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#666",
  },

  input: {
    width: "100%",
    height: "auto",
    backgroundColor: "#e7e7e7",
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  button: {
    backgroundColor: "blue",
    borderRadius: 50,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
