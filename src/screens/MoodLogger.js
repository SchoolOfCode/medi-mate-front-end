import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import app from "../../config/firebase";

const auth = app.auth();

const baseURL = "https://medi-mate-app.herokuapp.com";

import {
  horizontalScale,
  verticalScale,
  moderateScale
} from "../Components/Metrics"

export default function MoodLogger({ navigation }) {
  // use this for media query type shannanigans
  const { height, width } = useWindowDimensions();
  // mood is a number between 1 - 5
  const { user } = useContext(AuthenticatedUserContext);

  console.log(user.uid);

async function postMood(mood) {

  await fetch(`${baseURL}/mood-log`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firebase_user_id: `${user.uid}`,
    mood_rating: `${mood}`,
  }),
  success: 200,
})
}

  async function handleSuperHappy() {
    await postMood(5);
    navigation.navigate("Meditation");
  }

  async function handleHappy() {
    await postMood(4);
    navigation.navigate("Meditation");
  }

  async function handleOK() {
    await postMood(3);
    navigation.navigate("Meditation");
  }

  async function handleSad() {
    await postMood(2);
    navigation.navigate("Meditation");
  }

  async function handleSuperSad() {
    await postMood(1);
    navigation.navigate("Meditation");
  }

  const images = {
    background: require("../../assets/background/forest-background_200_640x640.png"),
  };

  return (
    <ImageBackground
        style={[styles.background,{
          width: width,
          height: height,}]}
        source={images.background}
      >
    <View style={[{
      width: width,
      height: height
    },
    styles.container]}>
    <Text style={styles.moodText}>How are you feeling today?</Text>
        <Pressable
          onPress={handleSuperHappy}
        >
          <Image
            style={styles.moodImage}
            source={require("../../assets/MoodFaces/superhappy.png")}
          />
          <Text style={styles.moodText}>Super Happy</Text>
        </Pressable>
        <Pressable
          onPress={handleHappy}
        >
          <Image
            style={styles.moodImage}
            source={require("../../assets/MoodFaces/happy.png")}
          />
          <Text style={styles.moodText}>Happy</Text>
        </Pressable>
        <Pressable
          onPress={handleOK}
        >
          <Image
            style={styles.moodImage}
            source={require("../../assets/MoodFaces/OK.png")}
          />
          <Text style={styles.moodText}>OK</Text>
        </Pressable>
        <Pressable
          onPress={handleSad}
        >
          <Image
            style={styles.moodImage}
            source={require("../../assets/MoodFaces/sad.png")}
          />
          <Text style={styles.moodText}>Sad</Text>
        </Pressable>
        <Pressable
          onPress={handleSuperSad}
        >
          <Image
            style={styles.moodImage}
            source={require("../../assets/MoodFaces/supersad.png")}
          />
          <Text style={styles.moodText}>Super Sad</Text>
        </Pressable>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
          position: "absolute",
          resizeMode: "center",
          resizeMethod: "center",
    zIndex: -1,
  },
  container: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    justifyContent: "centre",
    border: "solid",
    borderColor: "black",
    borderwidth: horizontalScale(40),
    flex: 1,
    flexDirection: "column",
    height: verticalScale(20),
    width: horizontalScale(220),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(30)
  },
  moodText: {
    color: "black",
    fontWeight: moderateScale(700),
    fontSize: moderateScale(20),
    fontFamily: "VT323_400Regular",
    alignSelf: "center",
  },
  moodImage: {
    height: verticalScale(60),
    width: horizontalScale(50),
    marginTop: verticalScale(15),
    alignSelf: "center",
  },
});
