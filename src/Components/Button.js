import { StyleSheet, Button, View } from "react-native";
import React from "react";

const UniButton = ({ onPress, title }) => {
  return (
    <View style={styles.parent}>
      <Button accessibilityLabel="Tap me!" style={styles.Button} onPress={onPress} title={title} ></Button>
    </View>
  );
};

export default UniButton;

const styles = StyleSheet.create({
  parent: {
    width: 250

  },
  Button: {
    backgroundColor: "blue",
    color: "white",
    flexDirection: 'row',
  }
});