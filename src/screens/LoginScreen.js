import React from "react";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Pressable,
  Linking,
  useWindowDimensions,
} from "react-native";

import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../Components/Metrics";

import app from "../../config/firebase";

const auth = app.auth();

export default function LoginScreen() {
  const { height, width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [firebaseId, setfirebaseId] = useState("");
  const url = "https://medi-mate-app.herokuapp.com/registration";

  const images = {
    background: require("../../assets/background/forest-background_200_640x640.png"),
    textbox: require("../../assets/text-boxes/Text-box-large.png"),
    egg: require("../../assets/Egg/EggHatch.gif"),
  };

  async function postFirebaseId(firebaseId) {
    console.log(firebaseId);
    const data = {
      firebase_user_id: firebaseId,
      username: "test",
    };
    const response = fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      success: 200,
    });
    return response;
  }

  async function HandleSignUp() {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const firebaseId = userCredentials.user.uid;
        console.log(firebaseId);
        postFirebaseId(firebaseId);
      })
      .catch((error) => alert(error.message));
  }

  // async function HandleSignUp() {
  //   const firebaseId = sendFirebaseAuth();
  //   await postFirebaseId(firebaseId);
  // }
  // async function sendFirebaseAuth() {
  //   await auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((userCredentials) => {
  //       const fbId = userCredentials.user.uid;
  //       console.log(fbId);

  //       return fbId;
  //       // setfirebaseId(userCredentials.user.uid);
  //       // console.log(firebaseId);
  //     })
  //     .catch((error) => alert(error.message));
  // }

  // async function setUserCredentials(uid) {
  //   setfirebaseId(uid);
  // }

  ///////////////////////////////////////////////////////////////////

  async function HandleLogin() {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  }

  return (
    <KeyboardAvoidingView style={styles.container} behaviour="padding">
      <ImageBackground style={[styles.background, {height: height, width: width}]} source={images.background}>
        <Text style={styles.appname}>Medi-Mate</Text>

        <Text style={styles.tagline}>Feed your mate, feed your soul!</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={HandleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={HandleSignUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>

        <Image style={styles.egg} source={images.egg} />
      
        <View>
          <Pressable style={styles.contact}
            onPress={() => Linking.openURL("mailto:support@example.com")}
          >
            <Text style={styles.buttonText}>Contact Medi-Mate</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100",
    height: "100",
    position: "absolute",
    resizeMode: "center",
    resizeMethod: "center",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  egg: {
    width: horizontalScale(90),
    height: verticalScale(100),
    position: "absolute",
    resizeMode: "center",
    resizeMethod: "center",
    marginTop: verticalScale(650),
    marginLeft: horizontalScale(25),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    borderWidth: 5,
    borderColor: "purple",
  },
  inputContainer: {
    width: 250,
    marginBottom: verticalScale(20),
    marginTop:verticalScale(20),
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  button: {
    backgroundColor: "#0782F9",
    width: 80,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "VT323_400Regular",
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontFamily: "VT323_400Regular",
    fontSize: 16,
  },
  tagline: {
    color: "white",
    fontWeight: "700",
    fontSize: moderateScale(20),
    fontFamily: "VT323_400Regular",
    justifyContent: "center",
  },
  appname: {
    color: "white",
    fontWeight: moderateScale(700),
    fontSize: moderateScale(100),
    fontFamily: "VT323_400Regular",
    justifyContent: "center",
  },
  contact: {
    paddingBottom: verticalScale(-500),
    fontWeight: "700",
    fontFamily: "VT323_400Regular",
    fontSize: 16,
    backgroundColor: "#0782F9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
